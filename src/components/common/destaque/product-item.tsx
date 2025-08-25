"use client";

import Image from "next/image";
import Link from "next/link";

interface ProductItemProps {
  products: {
    id: string;
    name: string;
    image: string;
    slug: string;
    is_offer: boolean;
    is_new: boolean;
  }[];
}

const ProductItemDestaque = ({ products }: ProductItemProps) => (
  <div className="grid sm:grid-cols-1 lg:grid-cols-1 md:grid-cols-10 md:gap-4 p-1">
    {products.map(product => (
      <div key={product.id} className="group relative lg:w-[22rem] bg-white rounded-2xl md:p-1 p-1 flex flex-col items-center hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 border border-gray-200/ overflow-hidden">
        <Link href={`/produto/${product.slug}`} className="relative overflow-hidden rounded-lg w-full group/image">
          <Image
            width={400}
            height={400}
            src={product.image || "/placeholder.jpg"}
            alt={product.name}
            loading="lazy"
            className="w-full max-h-[32rem] h-full sm:h-[24rem] md:h-[30rem] lg:w-[40rem] lg:h-[30rem] object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </Link>
        <div className="flex flex-col items-center w-full mt-4 space-y-3 relative z-10">
          <p className="w-full text-sm md:text-base font-medium text-gray-800 text-center truncate">{product.name}</p>
          <Link href={`/produto/${product.slug}`}>
            <button className="py-3 px-20 mb-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-105">
              Ver Produto
            </button>
          </Link>
        </div>
      </div>
    ))}
  </div>
);

export default ProductItemDestaque;
