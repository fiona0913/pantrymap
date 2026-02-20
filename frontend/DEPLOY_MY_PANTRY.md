# 用 Azure 部署 My Pantry 单页

只部署「My Pantry」时，把 **整个 `frontend` 文件夹** 当静态站部署到 Azure，访问地址为：**`https://你的站点/my-pantry.html`**。

---

## 需要一起部署的内容

| 类型 | 文件/目录 |
|------|-----------|
| 入口 | `my-pantry.html` |
| 样式 | `styles.css`, `my-pantry.css` |
| 脚本 | `api.js`, `my-pantry.js` |
| 数据（fallback） | `pantries.json`, `pantry_data.json` |
| 数据目录 | `data/`（含 `dashboard_data.json`, `device_to_pantry.json` 等） |

部署整个 `frontend` 时这些都会带上，无需单独挑文件。

---

## 方式一：Azure Static Web Apps（推荐）

适合和 GitHub 配合、自动部署；免费层足够用。

### 通过 Azure 门户 + GitHub

1. **Azure 门户** → 创建资源 → 搜 **Static Web App** → 创建。
2. 填写：
   - **订阅、资源组**：按你习惯选。
   - **名称**：例如 `pantrymap-mypantry`。
   - **部署来源**：选 **GitHub**，授权后选仓库和分支（例如 `main`）。
   - **构建配置**：
     - **App location**：`frontend`（或你放前端的子目录）。
     - **Output location**：留空（纯静态，无构建）。
     - **API location**：留空。
3. 创建完成后，每次推送到该分支会自动部署。
4. 在 Static Web App 的 **概述** 里可以看到 **URL**，例如：`https://xxx.azurestaticapps.net`。  
   **My Pantry 地址**：`https://xxx.azurestaticapps.net/my-pantry.html`。

### 通过 Azure CLI（不连 GitHub，本地上传）

```bash
# 安装 SWA CLI（若未安装）
npm install -g @azure/static-web-apps-cli

# 登录 Azure
az login

# 在项目根目录（PantryMap）执行：发布 frontend 目录
swa deploy ./frontend --deployment-token <你的 Static Web App 的部署令牌>
```

部署令牌在 Azure 门户 → 你的 Static Web App → **管理部署令牌** 中创建并复制。

---

## 方式二：Azure Storage 静态网站

用 Blob 存储的「静态网站」功能，把 `frontend` 当静态文件托管，无需 GitHub、无需构建。

### 1. 创建存储账户并开启静态网站

在 **Azure 门户**：

1. 创建 **存储账户**（Storage account），性能选 **标准** 即可。
2. 进入该存储账户 → 左侧 **数据管理** → **静态网站**。
3. 启用静态网站：
   - **启用**：是。
   - **索引文档名**：`index.html`（若你希望根路径打开某页；若只关心 my-pantry，可先填 `index.html` 或留空）。
   - **错误文档路径**：可留空或填 `404.html`。
4. 保存后，在 **静态网站** 页面会显示：
   - **主终结点**，形如：`https://<账户名>.z32.web.core.windows.net`

### 2. 上传 frontend 文件

用 **Azure 门户**：

1. 存储账户 → **容器** → 会有一个名为 **`$web`** 的容器（开启静态网站后自动出现）。
2. 进入 **`$web`** → **上传**，把 **`frontend`** 文件夹里的**所有文件和子目录**（保持目录结构）上传进去。  
   即：`my-pantry.html`、`styles.css`、`my-pantry.css`、`api.js`、`my-pantry.js`、`pantries.json`、`pantry_data.json`、`data/` 下所有文件等，都在 `$web` 根目录或对应子目录下。

或用 **Azure CLI**（在项目根目录，且已 `az login`）：

```bash
# 上传整个 frontend 目录到 $web 容器
az storage blob upload-batch -s frontend -d '$web' --account-name <你的存储账户名>
```

### 3. 访问 My Pantry

- 主终结点：`https://<账户名>.z32.web.core.windows.net`
- **My Pantry 页面**：`https://<账户名>.z32.web.core.windows.net/my-pantry.html`

---

## 生产环境 API 地址（若后端也在 Azure）

若后端是 **Azure Functions**，部署在 `https://你的应用.azurewebsites.net`，请在 **`frontend/my-pantry.html`** 里把 API 改为线上地址：

```html
<script>window.PantryAPI_CONFIG = { apiBaseUrl: 'https://你的应用.azurewebsites.net/api' };</script>
```

这样 My Pantry 会请求你的 Azure Functions，而不是本地 7071。未改则请求会失败，页面会退回到本地 JSON 数据。

---

## 小结

| 方式 | 适用场景 | My Pantry 地址 |
|------|----------|----------------|
| **Static Web Apps** | 想用 GitHub 自动部署、或习惯 SWA | `https://<名称>.azurestaticapps.net/my-pantry.html` |
| **Storage 静态网站** | 不想用 GitHub，只想上传文件、简单托管 | `https://<账户名>.z32.web.core.windows.net/my-pantry.html` |

两种都是纯 Azure 方案，无需 Netlify。上线后记得在 `my-pantry.html` 里把 **`apiBaseUrl`** 改成你的 Azure Functions 地址（若有）。
