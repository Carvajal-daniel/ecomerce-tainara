import CategoryProducts from "@/components/common/categories";
import ProductosDestaque from "@/components/common/destaque/productosDestaque";
import Footer from "@/components/common/footer/footer";
import Header from "@/components/common/header/header";
import HeroBanner from "@/components/common/hero-banner/hero-banner";
import ProductsPromocoes from "@/components/common/Promocoes";


export const revalidate = 10;

export default function Home() {
  return (
    <>
      <Header /> {/* Já é fixed dentro do componente */}

      <main > {/* Espaço para o Header não sobrepor conteúdo */}
      
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
    </>
  );
}
