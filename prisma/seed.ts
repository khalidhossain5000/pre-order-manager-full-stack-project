import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
console.log(connectionString,'this is stirng')
const adapter = new PrismaBetterSqlite3({ url: connectionString });

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.preOrder.createMany({
    data: [
      {
        name: "iPhone 17 Pro Max",
        products: 150,
        preOrderWhen: "REGARDLESS_OF_STOCK",
        status: "ACTIVE",
        startsAt: new Date("2026-06-01"),
        endsAt: new Date("2026-07-01"),
      },
      {
        name: "Samsung Galaxy S30",
        products: 80,
        preOrderWhen: "OUT_OF_STOCK",
        status: "ACTIVE",
        startsAt: new Date("2026-06-10"),
        endsAt: new Date("2026-07-10"),
      },
      {
        name: "MacBook Pro M7",
        products: 40,
        preOrderWhen: "REGARDLESS_OF_STOCK",
        status: "INACTIVE",
        startsAt: new Date("2026-06-15"),
        endsAt: null,
      },
    ],
  });

  console.log(" Sample data seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });