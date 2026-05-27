import { prisma } from './lib/prisma';

async function checkConnection() {
  try {
    console.log("Checking DB connection...");
    // Try to query something simple, like counting a table or raw query
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    console.log("Connection successful!", result);
  } catch (error) {
    console.error("Connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkConnection();
