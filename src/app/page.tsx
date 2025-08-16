import Header from "@/components/common/header/header";
import HeroBanner from "@/components/common/hero-banner/hero-banner";
import Image from "next/image";

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
  </main>
  </>
  );
}
