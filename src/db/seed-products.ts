// src/db/seed-products.ts
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { v4 as uuid } from "uuid";

export const seedProducts = async () => {
  const categoryId = "b07756b3-9ef7-46c1-93ce-a82d9cef402b"; // categoria existente

  const products = [
    {
      id: uuid(),
      name: "Calça Alfaiataria Detalhe Dourado",
      description: "Calça em tecido alfaiataria",
      image: "https://mamo.vtexassets.com/arquivos/ids/492939-1600-auto?v=638911293411730000&width=1600&height=auto&aspect=true",
      slug: "calca-alfaiataria-detalhe-dourado",
      is_active: true,
      category_id: categoryId,
    },
    {
      id: uuid(),
      name: "Calça Jogger Alfaiataria Chino BRANCO",
      description: "Calça jogger em alfaiataria",
      image: "https://mamo.vtexassets.com/arquivos/ids/492595-1600-auto?v=638911266552830000&width=1600&height=auto&aspect=true",
      slug: "calca-jogger-alfaiataria-chino-branco",
      is_active: true,
      category_id: categoryId,
    },
    {
      id: uuid(),
      name: "Calça Alfaiataria Detalhe Dourado 2",
      description: "Descrição do Produto 3",
      image: "https://mamo.vtexassets.com/arquivos/ids/493223-1600-auto?v=638911337783300000&width=1600&height=auto&aspect=true",
      slug: "calca-alfaiataria-detalhe-dourado-2",
      is_active: true,
      category_id: categoryId,
    },
    {
      id: uuid(),
      name: "Calça Acetinada Pantalona",
      description: "Descrição do Produto 4",
      image: "https://mamo.vtexassets.com/arquivos/ids/491816-1600-auto?v=638909621413300000&width=1600&height=auto&aspect=true",
      slug: "calca-acetinada-pantalona",
      is_active: true,
      category_id: categoryId,
    },
    {
      id: uuid(),
      name: "Calça Jogger Alfaiataria Chino CAQUI",
      description: "Descrição do Produto 5",
      image: "https://mamo.vtexassets.com/arquivos/ids/492619-1600-auto?v=638911267088230000&width=1600&height=auto&aspect=true",
      slug: "calca-jogger-alfaiataria-chino-caqui",
      is_active: true,
      category_id: categoryId,
    },
    {
      id: uuid(),
      name: "Calça Jogger Alfaiataria Chino CINZA",
      description: "Descrição do Produto 6",
      image: "https://mamo.vtexassets.com/arquivos/ids/490349-1600-auto?v=638899111004270000&width=1600&height=auto&aspect=true",
      slug: "calca-jogger-alfaiataria-chino-cinza",
      is_active: true,
      category_id: categoryId,
    },
    {
      id: uuid(),
      name: "Calça Pantalona Estampa Aquarela do Brasil LARANJA",
      description: "Descrição do Produto 7",
      image: "https://mamo.vtexassets.com/arquivos/ids/491576-1600-auto?v=638899203713570000&width=1600&height=auto&aspect=true",
      slug: "calca-pantalona-estampa-aquarela-laranja",
      is_active: true,
      category_id: categoryId,
    },
    {
      id: uuid(),
      name: "Calça Jogging Linho",
      description: "Descrição do Produto 8",
      image: "https://mamo.vtexassets.com/arquivos/ids/488962-1600-auto?v=638886953959230000&width=1600&height=auto&aspect=true",
      slug: "calca-jogging-linho",
      is_active: true,
      category_id: categoryId,
    },
  ];

  try {
    await db.insert(productTable).values(products); // ✅ insert direto
    console.log("Seed de produtos inserida com sucesso!");
  } catch (err) {
    console.error("Erro ao inserir produtos:", err);
  }
};
