# Vercel Blob 设置指南

本项目使用 Vercel Blob 存储用户上传的图片和视频文件。在开发环境中，我们使用了一个临时的解决方案，但在生产环境中，您需要设置 Vercel Blob 令牌。

## 开发环境

在开发环境中，我们会将上传的图片转换为 data URL 并存储在数据库中。这种方法仅适用于开发环境，不建议在生产环境中使用，因为：

1. 数据库存储大型二进制数据效率低下
2. 可能会导致数据库性能问题
3. 数据库存储空间有限

## 生产环境设置

要在生产环境中使用 Vercel Blob，请按照以下步骤操作：

1. 登录您的 Vercel 账户
2. 导航到您的项目设置
3. 在左侧菜单中选择 "Storage"
4. 点击 "Create Blob Store"
5. 生成一个 Blob 读写令牌
6. 将令牌添加到您的环境变量中

### 添加环境变量

在项目根目录的 `.env.local` 文件中添加以下行：

```
BLOB_READ_WRITE_TOKEN=your_token_here
```

对于 Vercel 部署，请在 Vercel 仪表板中添加此环境变量：

1. 导航到您的项目
2. 点击 "Settings" 选项卡
3. 选择 "Environment Variables"
4. 添加键 `BLOB_READ_WRITE_TOKEN` 和您的令牌值

## 验证设置

设置完成后，您可以通过上传图片来验证 Vercel Blob 是否正常工作。上传成功后，您应该能够看到图片被存储在 Vercel Blob 中，并且 URL 格式应该类似于：

```
https://<your-blob-store>.public.blob.vercel-storage.com/<file-path>
```

## 故障排除

如果您在上传文件时遇到问题，请检查：

1. 环境变量是否正确设置
2. Blob 令牌是否有效
3. 网络连接是否正常

如果问题仍然存在，请查看 Vercel Blob 的官方文档：https://vercel.com/docs/storage/vercel-blob
