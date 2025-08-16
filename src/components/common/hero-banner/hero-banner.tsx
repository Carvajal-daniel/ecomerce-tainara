import { db } from "@/db";
import ItemBanner from "./item-banner";
import { CreditCardIcon, PackageCheck, Truck } from "lucide-react";

const HeroBanner = async () => {
  const banners = await db.query.bannerTable.findMany();

  if (banners.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50">
        <p className="text-gray-600 text-center">Nenhum banner disponível</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Banner Principal */}
      <div className=" md:mb-8">
        <ItemBanner banners={banners} />
      </div>

      {/* Seção de Vantagens */}
      <div className="bg-white shadow-sm border-b border-gray-50 p-2 md:p-6">
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          
          {/* Cartão de Crédito */}
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-1 p-1 ">
            <div className="flex-shrink-0 p-2 border  rounded-full">
              <CreditCardIcon className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div >
              <p className="font-light text-gray-800 text-xs md:text-base leading-tight">
                Pague com cartão de crédito ou Pix
              </p>
            </div>
          </div>

          {/* Entrega Motoboy */}
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-1 p-1 ">
            <div className="flex-shrink-0 p-2 border rounded-full">
              <PackageCheck className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div >
              <p className="font-light text-gray-800 text-xs md:text-base leading-tight">
                Entrega por Motoboy para Fortaleza
              </p>
            </div>
          </div>

          {/* Entrega Brasil */}
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-1 p-2 ">
            <div className="flex-shrink-0 p-2 border rounded-full">
              <Truck className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div >
              <p className="font-light text-gray-800 text-xs md:text-base leading-tight">
                Entrega para todo o Brasil
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroBanner;