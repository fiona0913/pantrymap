"""
Legacy script: fetches telemetry from Azure SQL and writes pantry_data.json + frontend copy.
Run from project root: python legacy/fetch_data.py
Paths are resolved relative to project root (parent of legacy/).
"""
import os
import sys
import time
import pyodbc
import json
import datetime
from decimal import Decimal

# Project root (parent of legacy/)
_SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(_SCRIPT_DIR)

# 每多少秒自动拉取一次
FETCH_INTERVAL_SEC = 30

# --- 1. 新的账号配置 ---
server = 'micropantry-sql-server.database.windows.net'
database = 'pantry-sql'
username = 'devTeam'        # ✅ 新账号
password = '@gix2026'       # ✅ 新密码
driver = '{ODBC Driver 18 for SQL Server}'

# --- 2. 连接字符串 (已简化) ---
# 注意：对于这种普通 SQL 账号，不需要写 'Authentication=...'
connection_string = (
    f'DRIVER={driver};'
    f'SERVER={server};'
    f'DATABASE={database};'
    f'UID={username};'
    f'PWD={password};'
    'Encrypt=yes;'
    'TrustServerCertificate=yes;'  # Driver 18 必须加这个
)

# --- 3. JSON 序列化辅助函数 ---
def json_serializer(obj):
    if isinstance(obj, (datetime.datetime, datetime.date)):
        return obj.isoformat()
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError(f"Type {type(obj)} not serializable")

# --- 主程序 ---
def main():
    try:
        print(f"正在尝试使用用户 [{username}] 连接数据库...")
        conn = pyodbc.connect(connection_string)
        cursor = conn.cursor()
        print("✅ 连接成功！(无需 MFA)")
        
        # 4. 自动查找表名
        print("正在获取表信息...")
        cursor.execute("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'")
        tables = cursor.fetchall()
        
        if not tables:
            print("❌ 数据库里没有找到表。")
            return

        # 默认取第一个表
        target_table = tables[0][0]
        print(f"发现表: {target_table}")
        
        # 5. 获取数据
        print(f"正在读取数据...")
        cursor.execute(f"SELECT * FROM {target_table}")
        
        columns = [column[0] for column in cursor.description]
        results = []
        for row in cursor.fetchall():
            results.append(dict(zip(columns, row)))

        # 5.1 只保留最近 2 天的数据，减小 JSON 体积
        now_utc = datetime.datetime.utcnow()
        cutoff = now_utc - datetime.timedelta(days=2)

        def _is_recent(r: dict) -> bool:
            """
            根据 timestamp/ts/time 字段判断一条记录是否在最近两天内。
            支持 datetime / date / ISO 字符串三种格式。
            """
            raw = r.get('timestamp') or r.get('ts') or r.get('time')
            if raw is None:
                return False
            dt = None
            if isinstance(raw, datetime.datetime):
                dt = raw
            elif isinstance(raw, datetime.date):
                dt = datetime.datetime.combine(raw, datetime.time.min)
            elif isinstance(raw, str):
                try:
                    # 兼容 "2026-02-10T19:06:58.163000Z" / 无 Z 结尾两种写法
                    s = raw.replace('Z', '+00:00')
                    dt = datetime.datetime.fromisoformat(s)
                except Exception:
                    dt = None
            if dt is None:
                return False
            # 如果没有 tz 信息，就按 UTC 处理
            if dt.tzinfo is not None:
                dt = dt.astimezone(datetime.timezone.utc).replace(tzinfo=None)
            return dt >= cutoff

        recent_results = [r for r in results if _is_recent(r)]
        print(f"本轮总共拉取 {len(results)} 条记录，其中最近 2 天内的数据有 {len(recent_results)} 条。")

        # 6. 保存最近 2 天的数据（项目根 + frontend，供前端每 30 秒拉取）
        output_file = os.path.join(ROOT, 'pantry_data.json')
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(recent_results, f, default=json_serializer, indent=2)
        print(f"🎉 成功！已保存 {len(recent_results)} 条数据到 {output_file}")
        frontend_path = os.path.join(ROOT, 'frontend', 'pantry_data.json')
        with open(frontend_path, 'w', encoding='utf-8') as f:
            json.dump(recent_results, f, default=json_serializer, indent=2)
        print(f"已同步到 {frontend_path}")

        # 7. 按 device 对应到 pantry，生成 telemetry_by_pantry.json 供前端按 pantry 显示
        device_col = None
        for c in columns:
            if str(c).strip().lower() in ('device_name', 'devicename', 'device'):
                device_col = c
                break
        if device_col and results:
            mapping_paths = [
                os.path.join(ROOT, 'frontend', 'data', 'device_to_pantry.json'),
                os.path.join(ROOT, 'device_to_pantry.json'),
            ]
            device_to_pantry = {}
            for p in mapping_paths:
                if os.path.isfile(p):
                    try:
                        with open(p, 'r', encoding='utf-8') as f:
                            device_to_pantry = json.load(f)
                        print(f"已加载映射: {p}")
                        break
                    except Exception as e:
                        print(f"映射文件读取失败 {p}: {e}")
            by_pantry = {}
            for row in recent_results:
                raw = {k: (json_serializer(v) if isinstance(v, (datetime.datetime, datetime.date, Decimal)) else v) for k, v in row.items()}
                dev = (row.get(device_col) or '').strip() or None
                if dev is None:
                    dev = 'unknown'
                pantry_id = device_to_pantry.get(dev) or device_to_pantry.get(str(dev)) or dev
                by_pantry.setdefault(pantry_id, []).append(raw)
            out_dir = os.path.join(ROOT, 'frontend', 'data')
            os.makedirs(out_dir, exist_ok=True)
            telemetry_path = os.path.join(out_dir, 'telemetry_by_pantry.json')
            with open(telemetry_path, 'w', encoding='utf-8') as f:
                json.dump(by_pantry, f, indent=2, ensure_ascii=False)
            print(f"已按 pantry 分组并保存到 {telemetry_path}（共 {len(by_pantry)} 个 pantry）")

        conn.close()

    except Exception as e:
        print(f"\n❌ 连接失败:\n{e}")
        # 如果报错 Login failed，通常是 IP 防火墙问题
        if "Login failed" in str(e) or "Client with IP" in str(e):
             print("\n⚠️如果报错提到 IP Address，请提醒 Vicente 把你的 IP 加入防火墙白名单。")

if __name__ == '__main__':
    print(f"开始定时拉取：每 {FETCH_INTERVAL_SEC} 秒执行一次（Ctrl+C 停止）\n")
    while True:
        try:
            ts = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            print(f"--- [{ts}] 开始拉取 ---")
            main()
        except KeyboardInterrupt:
            print("\n已停止。")
            sys.exit(0)
        except Exception as e:
            print(f"本轮拉取出错: {e}")
        print(f"等待 {FETCH_INTERVAL_SEC} 秒后下次拉取...\n")
        time.sleep(FETCH_INTERVAL_SEC)
