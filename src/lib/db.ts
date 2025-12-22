// src/lib/db.ts
import { PrismaClient } from "../generated/prisma/client"; // Point directly to the generated client.ts
import { PrismaPg } from "@prisma/adapter-pg"; // Required for Postgres in V7
import { Pool } from "pg";

const prismaClientSingleton = () => {
  // Prisma 7 requires explicit connection handling
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  
  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;