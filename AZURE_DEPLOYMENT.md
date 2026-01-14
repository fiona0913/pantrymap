# Azure 部署指南

本指南将帮助你将 Pantry Map 后端部署到 Azure。

## 📋 前置要求

- Azure 账户
- Azure CLI 已安装（可选，用于命令行操作）
- Docker（如果使用容器部署）

## 🚀 部署选项

### 选项 1: Azure App Service (推荐)

这是最简单的方式，适合快速部署。

#### 步骤 1: 创建 Azure App Service

1. 登录 [Azure Portal](https://portal.azure.com)
2. 点击 "创建资源" → "Web 应用"
3. 配置：
   - **名称**: `pantrymap-backend` (或你的自定义名称)
   - **运行时堆栈**: Node.js 18 LTS
   - **操作系统**: Linux
   - **区域**: 选择离你最近的区域
   - **应用服务计划**: 选择或创建新的（免费层 F1 可用于测试）

#### 步骤 2: 创建 PostgreSQL 数据库

1. 在 Azure Portal 中，点击 "创建资源" → "Azure Database for PostgreSQL"
2. 选择 "单一服务器"（更经济）
3. 配置：
   - **服务器名称**: `pantrymap-db` (全局唯一)
   - **管理员用户名**: `pantryadmin`
   - **密码**: 创建强密码
   - **定价层**: 基本层 B_Gen5_1 (最低配置，适合测试)
   - **版本**: PostgreSQL 13 或更高

#### 步骤 3: 配置数据库连接

1. 在 PostgreSQL 服务器中，转到 "连接安全性"
2. 启用 "允许访问 Azure 服务"
3. 添加防火墙规则允许你的 IP 地址（或暂时允许所有 IP 用于测试）
4. 复制连接字符串，格式如下：
   ```
   postgresql://pantryadmin:yourpassword@pantrymap-db.postgres.database.azure.com:5432/postgres
   ```

#### 步骤 4: 配置环境变量

在 App Service 中，转到 "配置" → "应用程序设置"，添加：

```
DATABASE_URL=postgresql://pantryadmin:yourpassword@pantrymap-db.postgres.database.azure.com:5432/postgres
DB_TYPE=postgres
NODE_ENV=production
PORT=8080
```

#### 步骤 5: 部署代码

**方法 A: 使用 GitHub Actions (推荐)**

1. 将代码推送到 GitHub
2. 在 App Service 中，转到 "部署中心"
3. 选择 "GitHub" 作为源
4. 授权并选择你的仓库和分支
5. Azure 会自动构建和部署

**方法 B: 使用 Azure CLI**

```bash
# 登录 Azure
az login

# 安装依赖
cd backend
npm install

# 创建部署包
zip -r deploy.zip . -x "*.git*" "node_modules/.cache/*"

# 部署到 App Service
az webapp deployment source config-zip \
  --resource-group your-resource-group \
  --name pantrymap-backend \
  --src deploy.zip
```

**方法 C: 使用本地 Git**

```bash
# 在 App Service 中启用本地 Git 部署
# 然后添加远程仓库
git remote add azure https://your-app.scm.azurewebsites.net:443/your-app.git
git push azure main
```

#### 步骤 6: 运行数据库迁移

```bash
# 连接到 App Service
az webapp ssh --resource-group your-resource-group --name pantrymap-backend

# 在 SSH 会话中运行迁移
cd backend
DB_TYPE=postgres DATABASE_URL="your-connection-string" node scripts/migrate-pg.js
```

或者使用 Azure Cloud Shell：

```bash
# 设置环境变量
export DATABASE_URL="your-connection-string"
export DB_TYPE=postgres

# 下载代码并运行迁移
git clone https://github.com/your-repo/pantrymap.git
cd pantrymap/backend
npm install
node scripts/migrate-pg.js
```

#### 步骤 7: 更新前端 API URL

在 `api.js` 中更新：

```javascript
const API_BASE_URL = 'https://your-app.azurewebsites.net/api';
```

### 选项 2: Azure Container Instances (ACI)

适合容器化部署。

#### 步骤 1: 构建 Docker 镜像

```bash
cd backend
docker build -t pantrymap-backend .
```

#### 步骤 2: 推送到 Azure Container Registry (ACR)

```bash
# 创建 ACR
az acr create --resource-group your-resource-group --name yourregistry --sku Basic

# 登录
az acr login --name yourregistry

# 标记镜像
docker tag pantrymap-backend yourregistry.azurecr.io/pantrymap-backend:latest

# 推送
docker push yourregistry.azurecr.io/pantrymap-backend:latest
```

#### 步骤 3: 创建容器实例

```bash
az container create \
  --resource-group your-resource-group \
  --name pantrymap-backend \
  --image yourregistry.azurecr.io/pantrymap-backend:latest \
  --cpu 1 \
  --memory 1.5 \
  --ports 5000 \
  --environment-variables \
    DATABASE_URL="your-connection-string" \
    DB_TYPE=postgres \
    NODE_ENV=production \
    PORT=5000 \
  --ip-address Public
```

### 选项 3: Azure Kubernetes Service (AKS)

适合大规模生产环境（高级选项，需要 Kubernetes 知识）。

## 🔧 配置说明

### 环境变量

| 变量 | 说明 | 必需 |
|------|------|------|
| `DATABASE_URL` | PostgreSQL 连接字符串 | ✅ |
| `DB_TYPE` | 数据库类型 (`postgres` 或 `sqlite`) | ✅ |
| `PORT` | 服务器端口 (Azure App Service 自动设置为 8080) | ⚠️ |
| `NODE_ENV` | 环境 (`production` 或 `development`) | ✅ |

### 数据库连接字符串格式

PostgreSQL:
```
postgresql://username:password@host:port/database?ssl=true
```

Azure Database for PostgreSQL:
```
postgresql://pantryadmin:password@pantrymap-db.postgres.database.azure.com:5432/postgres?sslmode=require
```

## 📊 监控和日志

### 查看应用日志

```bash
# Azure CLI
az webapp log tail --resource-group your-resource-group --name pantrymap-backend

# 或从 Portal
# App Service → 日志流
```

### 应用洞察

1. 在 App Service 中启用 "Application Insights"
2. 自动收集性能指标和错误日志

## 🔒 安全建议

1. **使用 Azure Key Vault** 存储敏感信息（如数据库密码）
2. **启用 HTTPS**: App Service 默认提供 HTTPS
3. **数据库防火墙**: 限制数据库访问仅来自 App Service
4. **CORS 配置**: 在生产环境中限制允许的前端域名

在 `server.js` 中更新 CORS：

```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.com'],
  credentials: true
}));
```

## 🧪 测试部署

```bash
# 健康检查
curl https://your-app.azurewebsites.net/api/health

# 获取 pantries
curl https://your-app.azurewebsites.net/api/pantries
```

## 💰 成本估算

- **App Service (F1 免费层)**: 免费（有限制）
- **App Service (B1 基本层)**: ~$13/月
- **PostgreSQL (B_Gen5_1)**: ~$25/月
- **总计（最小配置）**: ~$25-38/月

## 🐛 故障排除

### 数据库连接失败

1. 检查防火墙规则
2. 验证连接字符串格式
3. 确认 SSL 设置正确

### 应用无法启动

1. 查看日志：`az webapp log tail`
2. 检查环境变量是否正确设置
3. 验证端口配置（Azure App Service 使用 8080）

### 迁移失败

1. 确保数据库表已创建（应用启动时会自动创建）
2. 检查 `DATABASE_URL` 格式
3. 验证数据库权限

## 📚 相关资源

- [Azure App Service 文档](https://docs.microsoft.com/azure/app-service/)
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/)
- [Node.js on Azure](https://docs.microsoft.com/azure/app-service/quickstart-nodejs)

## ✅ 部署检查清单

- [ ] Azure App Service 已创建
- [ ] PostgreSQL 数据库已创建
- [ ] 数据库防火墙已配置
- [ ] 环境变量已设置
- [ ] 代码已部署
- [ ] 数据库迁移已运行
- [ ] 健康检查通过
- [ ] 前端 API URL 已更新
- [ ] HTTPS 已启用
- [ ] 日志和监控已配置

部署完成后，你的后端 API 就可以通过 `https://your-app.azurewebsites.net/api` 访问了！




