import ProductosDestaque from "@/components/common/destaque/productosDestaque";
import Footer from "@/components/common/footer/footer";
import HeaderWrapper from "@/components/common/header/HeaderWrapper";
import HeroBanner from "@/components/common/hero-banner/hero-banner";
import ProductsPromocoes from "@/components/common/Promocoes";
import PageWrapper from "@/components/PageWrapper";

export const revalidate = 10;

export default async function Home() {
  return (
    <PageWrapper>
        <header className="sticky top-0 z-50 w-full">
          <HeaderWrapper />
        </header>
      <main>

        <section>
          <HeroBanner />
        </section>
        <section>
          <ProductosDestaque />
        </section>
        <section>
          <ProductsPromocoes />
        </section>
        <Footer />
      </main>
    </PageWrapper>
  );
}
