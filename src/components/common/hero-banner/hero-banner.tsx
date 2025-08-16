// HeroBanner.tsx
import { db } from "@/db";
import ItemBanner from "./item-banner";
import { CreditCardIcon, PackageCheck, Truck } from "lucide-react";

const HeroBanner = async () => {
  const bannersFromDb = await db.query.bannerTable.findMany();

  const banners = bannersFromDb.map((b) => ({
    id: b.id,
    name: b.name,
    imageUrlDesktop: b.desktop_image,
    imageUrlMobile: b.mobile_image,
    slug: b.slug,
  }));

  if (!banners.length) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50">
        <p className="text-gray-600 text-center">Nenhum banner disponível</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full lg:max-w-3/4 mx-auto ">
        <ItemBanner banners={banners} />
      </div>
      {/* Seção de Vantagens */}
<div className="shadow-sm lg:w-8xl lg:mx-auto py-1">
  <div className="grid grid-cols-3 xl:grid-cols-3 sm:ml-12 gap-3 md:gap-1 lg:w-1/2 lg:mx-auto">

    {/* Cartão de Crédito */}
    <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 p-2 rounded-xl bg-white">
      <div className="flex-shrink-0 p-2 bg-pink-500 text-white rounded-full">
        <CreditCardIcon className="w-4 h-4 md:w-6 md:h-6" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 text-xs md:text-sm mb-0.5">
          Pagamento Flexível
        </h3>
        <p className="font-light text-gray-600 text-xs leading-tight">
          Cartão de crédito ou PIX
        </p>
      </div>
    </div>

    {/* Entrega Motoboy */}
    <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 p-2 rounded-xl bg-white">
      <div className="flex-shrink-0 p-2 bg-purple-500 text-white rounded-full">
        <PackageCheck className="w-4 h-4 md:w-6 md:h-6" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 text-xs md:text-sm mb-0.5">
          Entrega Rápida
        </h3>
        <p className="font-light text-gray-600 text-xs leading-tight">
          Motoboy em Fortaleza
        </p>
      </div>
    </div>

    {/* Entrega Brasil */}
    <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 p-2 rounded-xl bg-white">
      <div className="flex-shrink-0 p-2 bg-blue-500 text-white rounded-full">
        <Truck className="w-4 h-4 md:w-6 md:h-6" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 text-xs md:text-sm mb-0.5">
          Nacional
        </h3>
        <p className="font-light text-gray-600 text-xs leading-tight">
          Todo o Brasil
        </p>
      </div>
    </div>

  </div>
</div>

    </div>
  );
};

export default HeroBanner;
