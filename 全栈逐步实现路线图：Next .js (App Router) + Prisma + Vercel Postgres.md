**功能实现路径规划**

为实现用户的需求，我制定了一个分阶段的路径：

第0阶段：初始化仓库，使用Next.js 15创建应用路由模板。第1阶段：添加TypeScript配置和.env文件。

第2阶段：设置Prisma，安装并初始化，定义用户和资产的模式，创建迁移并推送到Vercel Postgres。

第3阶段：整合Auth.js并使用凭证提供程序，创建/auth路由和登录页面；加密密码；与浏览器扩展共享JWT。

第4阶段：实现文件上传，选择客户端或服务器上传，使用Vercel Blob（公共存储）。

第5阶段：开发页面，如首页和个人页面。

具体方案如下

---

### 可行性路线图：Next .js (App Router) + Prisma + Vercel Postgres

> 目标：把登录、上传、展示、查询、统计五大功能在最短路径内上线，同时为浏览器插件复用登录做好接口。以下按阶段列出 安装 → 代码 → 部署 的顺序，每一步都可单独落地并回滚。
> 

| 阶段 | 任务 | 关键命令 / 文件 | 里程碑 |
| --- | --- | --- | --- |
| **0. 环境初始化（0.5 d）** | 1. `pnpm create next-app@latest my‑site --ts --app`2. `vercel link` 创建项目 | `.env.local`（空） | 项目可本地 `pnpm dev` |
| **1. 链接数据库（0.5 d）** | 1. Vercel Dashboard → **Add Postgres**，得 `POSTGRES_URL`2. `pnpm add -D prisma`；`npx prisma init` | `prisma/schema.prisma` 指定 `provider = "postgresql"` 并引用 `env("POSTGRES_URL")` | 本地 `prisma db push` 成功 |
| **2. 定义最小模型（0.5 d）** | `prisma\nmodel User { id Int @id @default(autoincrement()) username String @unique passwordHash String createdAt DateTime @default(now()) }\nmodel Asset { id Int @id @default(autoincrement()) owner   User  @relation(fields:[ownerId],references:[id]) ownerId Int title String prompt String? mediaType Int fileUri String createdAt DateTime @default(now()) }\n` | `npx prisma migrate dev -n init` | Neon(Vercel Postgres) 生成两张表 |
| **3. 接入 Prisma Client（0.2 d）** | `pnpm add @prisma/client`；创建 `/lib/prisma.ts` 单例 | `import { PrismaClient } from "@prisma/client"` | API 能查询 `User` 表 |
| **4. 用户认证（1 d）** | 1. `pnpm add next-auth`2. `/app/api/auth/[...nextauth]/route.ts` 引入 **Credentials Provider**；验证密码后 `return { id, username }`；`session.strategy = "jwt"` (Auth.js v5) citeturn0search4turn0search7 | `/login` 页面可登录并拿到 JWT |  |
| **5. 浏览器插件共享登录（0.5 d）** | 在登录成功响应中返回 `{accessToken}`；新增 `/api/auth/token/route.ts` 校验 cookie→回传 token；在 Chrome 插件里用 `fetch` 存储 token | 插件可携带 `Authorization: Bearer` 调用受保护 API |  |
| **6. 文件上传（1 d）** | 1. `pnpm add @vercel/blob`2. `/app/api/upload/route.ts` 用 `put()` 上传；返回 `blob.url` citeturn0search53. 把 url+表单数据写 `Asset` | 图片/视频上传成功并在数据库可见 |  |
| **7. 列表与查询（1 d）** | 1. 首页 `/`：`Prisma.asset.findMany({ where:{ mediaType }, orderBy:{ createdAt:"desc" } })`2. 个人页 `/u/[username]`：按 `ownerId` 过滤3. 搜索：`title contains` 或 `prompt contains` | 前端用 `next/image` + `<video>` 渲染 |  |
| **8. 统计视图（0.3 d）** | Prisma `$queryRaw`：`SELECT COUNT(*) AS total_users, ...`；或建 VIEW：`CREATE VIEW site_stats AS SELECT ...` | `/admin/stats` 返回聚合数据 |  |
| **9. 环境变量与部署（0.2 d）** | `vercel env pull .env.local`；`vercel` | 生产站点可正常登录与上传 |  |
| **10. 迁移与 CI（0.5 d）** | GitHub Actions：`pnpm install && prisma migrate deploy`；Vercel 自动触发 | 每次合并即自动部署 |  |
| **11. 基础观测（0.3 d）** | `pnpm add @sentry/nextjs` 或 Vercel Analytics；慢查询 → Neon observability | 错误率、响应时间面板可见 |  |

---

### 关键实现细节

1. **Prisma 与 Serverless**
    - 使用官方 **`@prisma/adapter-neon`** 防止连接数爆表，在 `lib/prisma.ts` 创建 `NeonHttpPrisma` 实例。
2. **Auth.js v5 on App Router**
    - 一律放在 `/app/api/auth/[...nextauth]/route.ts`（Edge by default）。
    - 登录逻辑保持 **纯服务器端**，前端只送表单。
3. **上传路径**
    - Route Handler `POST /api/upload` 收到 `multipart/form-data`，上传到 Blob，得到 `url`。
    - 写入 `Asset` 后 `return {id,url}` 供前端即时渲染。
4. **文件大小与计费**
    - Vercel Blob 免费层 100 GB/月出站流量，够 MVP；日后改用 S3 仅需换 SDK。
5. **索引**
    - `@@index([ownerId, createdAt])`；`@@index([mediaType, createdAt])`；搜索时加简单 `ILIKE`.
6. **迁移演进**
    - 任何新功能 → 改 `schema.prisma` → `prisma migrate dev` 本地验证 → 合并到 main → `prisma migrate deploy` 自动执行。

---

**只要按此顺序落地，任何阶段都可对外演示且对后续扩展零阻力。** 若需求激增，直接在现有模型上 `prisma migrate` 增表加字段即可；浏览器插件只依赖 JWT，不受数据库结构变化影响。