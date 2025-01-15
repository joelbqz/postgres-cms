import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Intenta realizar una consulta simple
  const posts = await prisma.post.findMany();
  console.log(posts);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
