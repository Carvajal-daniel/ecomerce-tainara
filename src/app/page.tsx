import Products from "@/components/common/categories";
import ProductosDestaque from "@/components/common/destaque/productosDestaque";
import Header from "@/components/common/header/header";
import HeroBanner from "@/components/common/hero-banner/hero-banner";

// app/page.tsx
export const revalidate = 10; // ou 0 se quiser sempre SSR

export default function Home() {


  return (
  <>
  <header>
    <Header/>
  </header>
  <main>
    <section>
      <HeroBanner/>
    </section>

    <section>
      <Products/>
    </section>

    <section>
      <ProductosDestaque/>
    </section>
  </main>
  </>
  );
}
