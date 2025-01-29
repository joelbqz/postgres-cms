import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  try {
    console.log('Testing database connection...');
    await prisma.$connect();
    console.log('Database connection successful!');

    console.log('\nFetching all users...');
    const users = await prisma.user.findMany({
      include: {
        sessions: true,
        accounts: true,
        posts: true,
      }
    });
    console.log('Users found:', users.length);
    console.log('Users:', JSON.stringify(users, null, 2));

    const email = 'jorg.pot.07@gmail.com';
    console.log(`\nFetching specific user with email: ${email}`);
    const specificUser = await prisma.user.findUnique({
      where: { email },
      include: {
        sessions: true,
        accounts: true,
        posts: true,
      }
    });
    console.log('Specific user:', JSON.stringify(specificUser, null, 2));

  } catch (error) {
    console.error('Error during database testing:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
