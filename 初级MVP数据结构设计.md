**Designing MVP database model**

用户希望设计一个最简单的 MVP 数据库模型，功能列表如下：

1. 用户登录
2. 用户上传图片、短视频及相应提示
3. 网站前端展示图片、视频和提示
4. 在展示页面和个人资料页，可按字段（如标题、标签、类型、创建日期）查询/筛选
5. 统计用户使用这些功能的情况

这需要一个最简数据模型，应该包含 3-4 个表：用户表、媒体资产表、标签表（用于查询分类），可能还需要统计视图。过滤字段可以包含：类型（图片/视频）、所有者ID、创建日期、标题和提示。

已思考 10 秒

下面给出**真正最小化、一天就能上线**的 MVP 数据库模型——仅用 2 张核心表 + 1 个统计 VIEW，即可支持列表功能与基本统计，同时给后续扩展留足余地。示例语法以 PostgreSQL 为准。

---

## 1. users — 登录与身份

```sql
CREATE TABLE users (
  id              BIGSERIAL PRIMARY KEY,
  username        VARCHAR(40) UNIQUE NOT NULL,
  password_hash   TEXT        NOT NULL,          -- bcrypt/argon2
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 常用查询：按用户名登录 / 列最新用户
CREATE INDEX idx_users_username  ON users(username);
CREATE INDEX idx_users_created   ON users(created_at DESC);

```

### 说明

- **只保留最小字段**：后续需要邮箱、头像、钱包等信息时，再通过迁移添加即可。
- **密码单独哈希**，不把盐写进同一列，方便未来更换算法。

---

## 2. assets — 图片 & 短视频 & 提示词

```sql
CREATE TABLE assets (
  id              BIGSERIAL PRIMARY KEY,
  owner_id        BIGINT      NOT NULL REFERENCES users(id),
  title           TEXT        NOT NULL,          -- 简短描述
  prompt          TEXT,                          -- 生成所用提示词
  media_type      SMALLINT    NOT NULL,          -- 0 = image, 1 = video
  file_uri        TEXT        NOT NULL,          -- S3 / OSS / 本地路径
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 常用检索：个人主页、媒体类型筛选、最新发布
CREATE INDEX idx_assets_owner       ON assets(owner_id);
CREATE INDEX idx_assets_media_type  ON assets(media_type);
CREATE INDEX idx_assets_created     ON assets(created_at DESC);

-- 可选全文索引：按标题或提示词搜
-- CREATE INDEX idx_assets_search ON assets USING GIN (to_tsvector('simple', title || ' ' || prompt));

```

### 说明

- **不引入 tag 表**：在 MVP 中，前端只需用 `media_type`, `owner_id`, `created_at` 就能完成「个人主页」和「全站」筛选与排序。
- 任何进一步的分类（标签、风格、IP 授权）都可在后续迭代里加字段或拆子表。

---

## 3. 统计视图（可选，但 5 分钟即可加）

```sql
CREATE VIEW site_stats AS
SELECT
  (SELECT COUNT(*) FROM users)                        AS total_users,
  (SELECT COUNT(*) FROM assets)                       AS total_assets,
  (SELECT COUNT(*) FROM assets WHERE media_type = 0)  AS total_images,
  (SELECT COUNT(*) FROM assets WHERE media_type = 1)  AS total_videos,
  (SELECT COUNT(DISTINCT owner_id) FROM assets)       AS active_creators;

```

> 你可以在后台页面或定时任务里 SELECT * FROM site_stats; 即得实时指标；当数据量上来后再改成 Materialized View 或单独的统计表。
> 

---

## 4. 为什么这已经够用

| 需求 | 如何满足 |
| --- | --- |
| 1. 用户登录 | `users` 表配合 Session / JWT 即可。 |
| 2. 上传图片/视频+提示词 | 写入 `assets (owner_id, title, prompt, media_type, file_uri)`. |
| 3. 展示页面 | `SELECT * FROM assets ORDER BY created_at DESC LIMIT …`. |
| 4. 条件查询 | - 全站：`WHERE media_type = 0` 或全文搜索索引。 - 个人主页：`WHERE owner_id = :uid`. |
| 5. 统计 | 查询或 `site_stats` 视图即可。 |

---

### 扩展留白

- **更多字段**：给表加列或拆子表，不破坏现有 API。
- **Tag/Like/Comment**：后续直接 `CREATE TABLE tags / likes / comments …` 并加外键。
- **多语言/版权/钱包**：同理通过迁移添加。

在现代迁移工具（Flyway / Liquibase / Django‑ORM / Rails）加持下，线上改表已是日常操作，不会拖慢后续功能演进。先用这两张表把闭环跑通，再根据真实使用场景演进就好。