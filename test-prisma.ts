const { prisma } = require("./lib/prisma");

async function main() {
  try {
    const result = await prisma.userCollectionAsset.findMany();
    console.log("userCollectionAsset.findMany() result:", result);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
