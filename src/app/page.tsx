import ProductosDestaque from "@/components/common/destaque/productosDestaque";
import Header from "@/components/common/header/header";
import HeroBanner from "@/components/common/hero-banner/hero-banner";
import Products from "@/components/common/products/productPage";

export default function Home() {
  return (
  <>
  <header>
    <Header/>
  </header>
  <main>


    <section>
      <Products/>
    </section>


  </main>
  </>
  );
}
