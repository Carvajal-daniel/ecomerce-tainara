import { db } from "@/db";
import ProductItem from "./productItem";

export const revalidate = 10; // Revalida a cada 10 segundos no deploy

interface DatabaseCategory {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  created_at?: Date;
  updated_at?: Date;
}

const Products = async () => {
  try {
    const categories = await db.query.categoryTable.findMany({
      columns: {
        id: true,
        name: true,
        slug: true,
        imageUrl: true,
      },
    });

    if (!categories.length) {
      return (
        <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg mx-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhuma categoria disponível
            </h3>
            <p className="text-gray-600 max-w-md">
              Não há categorias cadastradas no momento. Volte em breve para
              conferir nossas novidades!
            </p>
          </div>
        </div>
      );
    }

    const categoriesItems = categories.map((c: DatabaseCategory) => ({
      id: c.id,
      name: c.name || "Categoria sem nome",
      slug: c.slug,
      image: c.imageUrl || "/placeholder.jpg",
    }));

    return (
      <div className="container mx-auto p-4 mt-4 md:mt-7">
        <div className="w-full flex flex-col items-center">
          <h1 className="text-xl font-medium text-gray-900 mb-1">
            Nossas Categorias
          </h1>
          <div className="h-[2px] w-40 bg-rose-300"></div>
        </div>

        <ProductItem categories={categoriesItems} />
      </div>
    );
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-red-50 rounded-lg mx-2">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-200 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            Erro ao carregar categorias
          </h3>
          <p className="text-red-700 max-w-md">
            Ocorreu um erro ao buscar as categorias. Tente recarregar a página.
          </p>
        </div>
      </div>
    );
  }
};

export default Products;
