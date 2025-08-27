"use client";

import { CreditCardIcon, PackageCheck, Truck } from "lucide-react";

const AdvantagesCarousel = () => {
  const advantages = [
    { icon: <CreditCardIcon className="w-4 h-4 md:w-6 md:h-6" />, title: "Pagamento Flexível", description: "Cartão ou Pix" },
    { icon: <PackageCheck className="w-4 h-4 md:w-6 md:h-6" />, title: "Entrega Rápida", description: "Motoboy em Fortaleza" },
    { icon: <Truck className="w-4 h-4 md:w-6 md:h-6" />, title: "Nacional", description: "Todo o Brasil" },
  ];

  const loopedAdvantages = [...advantages, ...advantages]; // duplicar para scroll infinito

  return (
    <div className="border-b  border-gray-100 lg:w-8xl lg:mx-auto md:py-3">
      {/* Desktop */}
      <div className="hidden md:grid grid-cols-3 xl:grid-cols-3 sm:ml-12 gap-3 md:gap-1 lg:w-1/2 lg:mx-auto">
        {advantages.map((adv, i) => (
          <div key={i} className="flex sm:flex-row items-center text-center sm:text-left gap-2 p-2 rounded-xl bg-white">
            <div className="flex-shrink-0 p-2 border rounded-full">{adv.icon}</div>
            <div>
              <h3 className="font-medium text-gray-800 text-xs md:text-sm mb-0.5">{adv.title}</h3>
              <p className="font-light text-gray-600 text-xs leading-tight">{adv.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: carrossel contínuo */}
      <div className="md:hidden overflow-hidden relative">
        <div className="flex animate-marquee">
          {loopedAdvantages.map((adv, i) => (
            <div key={i} className="flex-shrink-0 min-w-[33%] p-1">
              <div className="flex justify-center items-center gap-2 md:p-4 p-3 bg-white">
                <div className="flex-shrink-0 p-2 border rounded-full">{adv.icon}</div>
                <div>
                  <h3 className="font-medium text-gray-800 text-sm mb-0.5">{adv.title}</h3>
                  <p className="font-light text-gray-600 text-xs leading-tight">{adv.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AdvantagesCarousel;
