import { db } from "@/db"; // importa sua instância drizzle
import { categoryTable } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2"; // cuid generator

const categories = [
  {
    id: createId(),
    name: "Produtos",
    slug: "produtos",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    name: "Calçados",
    slug: "calcados",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    name: "Acessórios",
    slug: "acessorios",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedCategories() {
  try {
    await db.insert(categoryTable).values(categories);
    console.log("✅ Categorias inseridas com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao inserir categorias:", error);
  }
}

seedCategories();
