# Chinawords 项目实施计划 (TodoList)

基于"全栈逐步实现路线图"和"初级MVP数据结构设计"文档，以下是项目实施的具体任务清单，按照优先级和依赖关系排序。

## 阶段 0：环境初始化 (0.5天)

- [ ] 确认 Next.js 15 App Router 项目结构已完成
- [ ] 配置 TypeScript
- [ ] 创建并配置 .env.local 文件
- [ ] 使用 `vercel link` 创建 Vercel 项目

## 阶段 1：数据库设置 (1天)

- [ ] 在 Vercel Dashboard 创建 Postgres 数据库
- [ ] 获取并配置 `POSTGRES_URL` 环境变量
- [ ] 安装 Prisma: `pnpm add -D prisma`
- [ ] 初始化 Prisma: `npx prisma init`
- [ ] 配置 schema.prisma 文件指定 PostgreSQL 提供者

## 阶段 2：定义数据模型 (0.5天)

- [ ] 在 schema.prisma 中创建 User 模型:
  ```
  model User {
    id            Int      @id @default(autoincrement())
    username      String   @unique
    passwordHash  String
    createdAt     DateTime @default(now())
    assets        Asset[]
  }
  ```
- [ ] 在 schema.prisma 中创建 Asset 模型:
  ```
  model Asset {
    id         Int      @id @default(autoincrement())
    owner      User     @relation(fields:[ownerId], references:[id])
    ownerId    Int
    title      String
    prompt     String?
    mediaType  Int      // 0 = image, 1 = video
    fileUri    String
    createdAt  DateTime @default(now())
  }
  ```
- [ ] 创建必要的索引:
  ```
  // User 索引
  @@index([username])
  @@index([createdAt(sort: Desc)])
  
  // Asset 索引
  @@index([ownerId])
  @@index([mediaType])
  @@index([createdAt(sort: Desc)])
  ```
- [ ] 执行初始迁移: `npx prisma migrate dev -n init`

## 阶段 3：接入 Prisma Client (0.2天)

- [ ] 安装 Prisma Client: `pnpm add @prisma/client`
- [ ] 创建 `/lib/prisma.ts` 单例
- [ ] 配置 Prisma 与 Serverless 环境的适配 (使用 `@prisma/adapter-neon`)

## 阶段 4：用户认证 (1天)

- [ ] 安装 Auth.js: `pnpm add next-auth`
- [ ] 创建 `/app/api/auth/[...nextauth]/route.ts` 文件
- [ ] 配置 Credentials Provider
- [ ] 实现密码验证逻辑
- [ ] 配置 JWT 会话策略
- [ ] 创建登录页面 `/app/login/page.tsx`

## 阶段 5：浏览器插件共享登录 (0.5天)

- [ ] 在登录成功响应中返回 accessToken
- [ ] 创建 `/app/api/auth/token/route.ts` 用于验证 cookie 并返回 token
- [ ] 为 Chrome 插件提供 fetch API 示例代码

## 阶段 6：文件上传 (1天)

- [ ] 安装 Vercel Blob: `pnpm add @vercel/blob`
- [ ] 创建 `/app/api/upload/route.ts` 处理文件上传
- [ ] 实现文件上传到 Vercel Blob 的逻辑
- [ ] 将上传文件的 URL 和表单数据写入 Asset 表
- [ ] 创建上传界面组件

## 阶段 7：列表与查询 (1天)

- [ ] 实现首页 `/` 的资产列表功能
  - 按 mediaType 过滤
  - 按创建时间倒序排列
- [ ] 实现个人页 `/u/[username]` 的资产列表功能
  - 按 ownerId 过滤
- [ ] 实现搜索功能
  - 按 title 或 prompt 内容搜索
- [ ] 创建前端渲染组件
  - 使用 `next/image` 渲染图片
  - 使用 `<video>` 标签渲染视频

## 阶段 8：统计视图 (0.3天)

- [ ] 使用 Prisma `$queryRaw` 创建统计查询
- [ ] 或创建数据库视图:
  ```sql
  CREATE VIEW site_stats AS
  SELECT
    (SELECT COUNT(*) FROM users) AS total_users,
    (SELECT COUNT(*) FROM assets) AS total_assets,
    (SELECT COUNT(*) FROM assets WHERE media_type = 0) AS total_images,
    (SELECT COUNT(*) FROM assets WHERE media_type = 1) AS total_videos,
    (SELECT COUNT(DISTINCT owner_id) FROM assets) AS active_creators;
  ```
- [ ] 创建 `/app/admin/stats/page.tsx` 页面显示统计数据

## 阶段 9：环境变量与部署 (0.2天)

- [ ] 执行 `vercel env pull .env.local` 获取环境变量
- [ ] 使用 `vercel` 命令部署项目
- [ ] 验证生产环境的登录和上传功能

## 阶段 10：迁移与 CI (0.5天)

- [ ] 设置 GitHub Actions 工作流
- [ ] 配置自动化部署流程
- [ ] 确保每次合并到主分支时自动执行 `prisma migrate deploy`

## 阶段 11：基础观测 (0.3天)

- [ ] 安装 Sentry 或配置 Vercel Analytics
- [ ] 设置错误监控
- [ ] 配置性能监控
- [ ] 设置数据库查询监控

## 后续扩展计划

- [ ] 添加标签功能 (Tag 表)
- [ ] 实现点赞功能 (Like 表)
- [ ] 添加评论功能 (Comment 表)
- [ ] 优化搜索功能 (全文索引)
- [ ] 实现分页功能
- [ ] 添加用户个人资料扩展字段
- [ ] 实现多语言支持
- [ ] 添加版权管理功能
- [ ] 集成钱包功能

## 开发日历

### 第一周
- 完成阶段 0-4
- 实现核心身份认证闭环
- 确保浏览器插件能获取 token

### 第二周
- 完成阶段 5-7
- 实现基本 UI 界面
- 完成内容管理闭环

### 第三周
- 完成阶段 8-10
- 实现灰度发布
- 设置观测与自动化流程

### 第四周
- 收集反馈并迭代
- 实现标签、分页功能
- 优化索引和性能
- 稳定 MVP 版本
