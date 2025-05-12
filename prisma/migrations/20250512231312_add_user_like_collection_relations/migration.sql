-- CreateTable
CREATE TABLE "UserLikeAsset" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,

    CONSTRAINT "UserLikeAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCollectionAsset" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,

    CONSTRAINT "UserCollectionAsset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserLikeAsset_userId_assetId_key" ON "UserLikeAsset"("userId", "assetId");

-- CreateIndex
CREATE UNIQUE INDEX "UserCollectionAsset_userId_assetId_key" ON "UserCollectionAsset"("userId", "assetId");

-- AddForeignKey
ALTER TABLE "UserLikeAsset" ADD CONSTRAINT "UserLikeAsset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLikeAsset" ADD CONSTRAINT "UserLikeAsset_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCollectionAsset" ADD CONSTRAINT "UserCollectionAsset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCollectionAsset" ADD CONSTRAINT "UserCollectionAsset_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
