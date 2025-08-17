"use client";

interface ProductItemProps {
  products: {
    id: string;
    name: string;
    image: string;
    slug: string;
  }[];
}

const ProductItemDestaque = ({ products }: ProductItemProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:w-7xl lg:mx-auto gap-4">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="group bg-white rounded-xl p-2 flex flex-col items-center shadow-lg hover:shadow-xl transition-all duration-300 transform  border border-gray-100"
        >
          {/* Container da Imagem */}
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 w-full">
            <img
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-48 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Badge de destaque */}
            <div className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-green-600 opacity-90 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
              OFERTA
            </div>
          </div>
          
          {/* Conteúdo do Card */}
          <div className="flex flex-col items-center w-full mt-3 space-y-3">
            {/* Nome do Produto */}
            <h3 className="text-sm md:text-base font-light text-gray-800 text-center line-clamp-2  transition-colors duration-300">
              {product.name}
            </h3>
            
            {/* Preço */}
            <div className="text-center">
              <span className="text-xs text-gray-500 line-through block">R$ 399,90</span>
              <span className="text-lg md:text-xl font-bold text-gray-700">R$ 299,90</span>
            </div>
            
            {/* Botão */}
            <button className="w-2/3 bg-[#e8968c] hover:bg-rose-400 hover:to-rose-400 text-[#fcf3f1] font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md text-sm">
              Ver Produto
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductItemDestaque;