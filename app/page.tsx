import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchHero from "@/components/SearchHero";

export default function Home() {
  return (
    <>
     <Navbar showSearch={false} />
     <SearchHero />
     <Footer />
    </>
  );
}
