// src/db/seed.ts
import { seedProducts } from "./seed-products";

const runSeed = async () => {
  await seedProducts();
  process.exit(0);
};

runSeed();
