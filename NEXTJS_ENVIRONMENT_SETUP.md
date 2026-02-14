# Next.js 主站环境变量配置指南

## 目标
为 Next.js 主站配置环境变量 `NEXT_PUBLIC_PANTRY_MAP_URL`，使 iframe 指向线上的 PantryMap URL。

## 当前配置

### 代码中的环境变量使用
在 `app/page.tsx` 和 `app/map/page.tsx` 中：

```typescript
const PANTRY_MAP_URL = process.env.NEXT_PUBLIC_PANTRY_MAP_URL || "http://localhost:3000";
```

### 目标 URL
```
NEXT_PUBLIC_PANTRY_MAP_URL = https://polite-field-023e15d1e.6.azurestaticapps.net
```

---

## 配置方法

### 方法 1：在 Azure Portal 中配置（推荐）

#### 步骤：

1. **登录 Azure Portal**
   - 访问 https://portal.azure.com
   - 使用你的 Azure 账号登录

2. **找到 Next.js 主站的 Static Web App**
   - 在搜索栏中搜索 "Static Web Apps"
   - 找到你的 Next.js 主站的资源（注意：不是 PantryMap 的那个）
   - 如果你不确定哪个是主站，可以查看 URL 或者部署配置

3. **配置环境变量**
   - 在左侧菜单中点击 **"Configuration"**
   - 选择 **"Application settings"** 标签
   - 点击 **"+ Add"** 按钮
   - 添加以下配置：
     ```
     Name:  NEXT_PUBLIC_PANTRY_MAP_URL
     Value: https://polite-field-023e15d1e.6.azurestaticapps.net
     ```
   - 点击 **"Save"** 保存

4. **重新部署**
   - 保存后，Azure 会自动重新部署你的应用
   - 等待几分钟让部署完成

5. **验证**
   - 访问你的 Next.js 主站 URL
   - 检查 iframe 是否正确加载 PantryMap
   - 使用浏览器开发者工具检查 iframe 的 src 属性

---

### 方法 2：通过 GitHub Actions 工作流配置

如果你想在 CI/CD 流程中配置环境变量，可以在工作流文件中添加：

#### 创建 Next.js 主站的工作流文件

创建 `.github/workflows/azure-static-web-apps-nextjs-main.yml`：

```yaml
name: Azure Static Web Apps - Next.js Main Site

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Next.js Main Site
    permissions:
       id-token: write
       contents: read
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
          lfs: false
      
      - name: Install OIDC Client from Core Package
        run: npm install @actions/core@1.6.0 @actions/http-client
      
      - name: Get Id Token
        uses: actions/github-script@v6
        id: idtoken
        with:
           script: |
               const coredemo = require('@actions/core')
               return await coredemo.getIDToken()
           result-encoding: string
      
      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_NEXTJS_MAIN }}
          action: "upload"
          app_location: "/" # Next.js 根目录
          api_location: "" # 没有 API
          output_location: ".next" # Next.js 构建输出
          github_id_token: ${{ steps.idtoken.outputs.result }}
        env:
          # 在这里添加环境变量
          NEXT_PUBLIC_PANTRY_MAP_URL: https://polite-field-023e15d1e.6.azurestaticapps.net

  close_pull_request_job:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request Job
    steps:
      - name: Close Pull Request
        id: closepullrequest
        uses: Azure/static-web-apps-deploy@v1
        with:
          action: "close"
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_NEXTJS_MAIN }}
```

**注意：** 你需要在 GitHub Secrets 中添加 `AZURE_STATIC_WEB_APPS_API_TOKEN_NEXTJS_MAIN`

---

### 方法 3：使用 `.env.production` 文件（本地构建）

如果你在本地构建 Next.js 应用，可以创建 `.env.production` 文件：

```bash
# .env.production
NEXT_PUBLIC_PANTRY_MAP_URL=https://polite-field-023e15d1e.6.azurestaticapps.net
```

**注意：** 
- 这个文件应该提交到 Git
- 只在本地构建或非 Azure 部署时使用

---

## 验证配置

### 1. 检查环境变量是否生效

在浏览器中打开 Next.js 主站，然后在控制台中运行：

```javascript
// 检查 iframe 的 src
document.querySelector('iframe').src
```

应该显示：`https://polite-field-023e15d1e.6.azurestaticapps.net`

### 2. 检查构建日志

在 Azure Portal 或 GitHub Actions 的构建日志中，查找环境变量相关的输出。

---

## 故障排除

### 问题 1：环境变量未生效

**原因：** 环境变量名称必须以 `NEXT_PUBLIC_` 开头才能在客户端使用。

**解决：** 确认使用的是 `NEXT_PUBLIC_PANTRY_MAP_URL` 而不是 `PANTRY_MAP_URL`

### 问题 2：iframe 仍然指向 localhost

**原因：** 应用没有重新构建或部署。

**解决：** 
1. 在 Azure Portal 中保存配置后等待自动部署完成
2. 或者手动触发新的部署（推送代码到 main 分支）

### 问题 3：CORS 错误

**原因：** PantryMap 可能需要配置 CORS 以允许在 iframe 中加载。

**解决：** 
1. 检查 PantryMap 的 `staticwebapp.config.json` 
2. 添加适当的 CORS 配置

---

## 下一步

1. ✅ 代码已准备好（`app/page.tsx` 和 `app/map/page.tsx` 已配置环境变量）
2. ✅ 工作流文件已更新（支持 main 分支部署）
3. ⏳ **你需要做：** 在 Azure Portal 中为 Next.js 主站添加环境变量
4. ⏳ **你需要做：** 重新部署并验证

---

## 相关资源

- [Azure Static Web Apps 配置文档](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration)
- [Next.js 环境变量文档](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- PantryMap 线上地址：https://polite-field-023e15d1e.6.azurestaticapps.net
