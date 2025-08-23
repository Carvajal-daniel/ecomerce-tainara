// src/db/seed.ts
import { seedProductsCalcas } from "./seed-products";

const runSeed = async () => {
  await seedProductsCalcas();
};

runSeed();
