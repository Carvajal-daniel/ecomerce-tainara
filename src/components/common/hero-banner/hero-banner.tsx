import { db } from "@/db";
import ItemBanner from "./item-banner";
import AdvantagesCarousel from "./advantages-carousel";

export const revalidate = 10;

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
      <AdvantagesCarousel />
    </div>
  );
};

export default HeroBanner;