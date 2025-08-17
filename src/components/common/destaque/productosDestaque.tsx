import { db } from "@/db";
import ProductItemDestaque from "./product-item";

// Componente que só renderiza os produtos
const ProductsDestaque = async () => {

  const products = await db.query.featuredTable.findMany({
      with:{
        product: true
      }
  });

  if (!products) {
    return null;
  }

  const productItems = products.map((product) => ({
    id: product.product.id,
    name: product.product.name,
    image: product.product.image,
    slug: product.product.slug,
  }));

  return (
    <section className="relative py-10 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative container mx-auto px-4">
        {/* Header da seção */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-red-500"></div>
            <span className="text-red-600 font-medium text-sm uppercase tracking-wider">
              Produtos em Destaque
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-red-500"></div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent mb-2">
            Destaques da Semana
          </h1>
          
          <p className="text-gray-600 max-w-2xl mx-auto md:text-lg leading-relaxed">
            Descubra nossa seleção especial de produtos com ofertas imperdíveis e qualidade garantida
          </p>
          
          {/* Linha decorativa */}
          <div className="flex justify-center mt-5">
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
          </div>
        </div>

        {/* Grid de produtos */}
        <ProductItemDestaque products={productItems} />
        
      
      </div>
    </section>
  );
};

export default ProductsDestaque;