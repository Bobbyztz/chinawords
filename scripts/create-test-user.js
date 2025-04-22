// 创建测试用户脚本
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    // 检查用户是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { username: 'testuser' },
    });

    if (existingUser) {
      console.log('测试用户已存在，无需创建');
      return;
    }

    // 创建测试用户
    const passwordHash = await bcrypt.hash('password123', 10);
    const user = await prisma.user.create({
      data: {
        username: 'testuser',
        passwordHash,
      },
    });

    console.log('测试用户创建成功:', user);
  } catch (error) {
    console.error('创建测试用户失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
