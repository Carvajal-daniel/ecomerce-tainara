import { db } from "@/db";
import { productTable, productVariationTable } from "@/db/schema";
import { v4 as uuid } from "uuid";

export const seedProductsCalcas = async () => {
  const categoryId = "14eac5e3-e221-4120-b52b-f1daa5d3dc93"; // categoria existente

  const products = [
    {
      name: "Bolsa Crossbody Com Necessaire Preto",
      description: "Bolsa crossbody preta com necessaire, elegante e prática.",
      image: "https://lojamorenarosa.vtexassets.com/arquivos/ids/243616-1200-auto?v=638156981098470000&width=1200&height=auto&aspect=true",
      slug: "bolsa-crossbody-necessaire-preto",
    },
    {
      name: "Bolsa Baguete Cinza",
      description: "Bolsa baguete cinza, estilosa e funcional para o dia a dia.",
      image: "https://lojamorenarosa.vtexassets.com/arquivos/ids/261204-1200-auto?v=638249490426830000&width=1200&height=auto&aspect=true",
      slug: "bolsa-baguete-cinza",
    },
    {
      name: "Óculos Quadrado Detalhe Haste Dourado",
      description: "Óculos quadrado com detalhe dourado, sofisticado e moderno.",
      image: "https://lojamorenarosa.vtexassets.com/arquivos/ids/384659-1200-auto?v=638913239615670000&width=1200&height=auto&aspect=true",
      slug: "oculos-quadrado-detalhe-dourado",
    },
    {
      name: "Argola Pingente Peixe Articulado",
      description: "Argola com pingente de peixe articulado, delicada e charmosa.",
      image: "https://www.mariafilo.com.br/_next/image?url=https%3A%2F%2Fmariafilo.vteximg.com.br%2Farquivos%2Fids%2F515886-800-1200%2F1524798_018_1-V-ARGOLA-PINGENTE-PEIXE-ARTICULADO.jpg%3Fv%3D638893285226030000&w=828&q=90",
      slug: "argola-pingente-peixe-articulado",
    },
    {
      name: "Cinto Couro Rebites",
      description: "Cinto de couro com rebites, resistente e estiloso.",
      image: "https://www.mariafilo.com.br/_next/image?url=https%3A%2F%2Fmariafilo.vteximg.com.br%2Farquivos%2Fids%2F515979-800-1200%2F1524548_1580_2-V-CINTO-COURO-REBITES.jpg%3Fv%3D638893295488200000&w=828&q=90",
      slug: "cinto-couro-rebites",
    },
    {
      name: "Lenço Estampa Prisma",
      description: "Lenço com estampa prisma, elegante e versátil para compor looks.",
      image: "https://www.mariafilo.com.br/_next/image?url=https%3A%2F%2Fmariafilo.vteximg.com.br%2Farquivos%2Fids%2F514069-800-1200%2F1524966_53598_1-LENCO-ESTAMPA-PRISMA.jpg%3Fv%3D638881317340630000&w=828&q=90",
      slug: "lenco-estampa-prisma",
    },
  ];

  try {
    for (const product of products) {
      const productId = uuid();

      // cria produto
      await db.insert(productTable).values({
        ...product,
        id: productId,
        is_active: true,
        category_id: categoryId,
      });

      // cria variação padrão com preço
      await db.insert(productVariationTable).values({
        id: uuid(),
        product_id: productId,
        name: "Padrão",
        price: 11990, // R$119,90
        color: "Padrão",
        image_url: product.image,
        slug: "padrao",
      });
    }

    console.log("Seed de produtos inserida com sucesso!");
  } catch (err) {
    console.error("Erro ao inserir produtos:", err);
  }
};
