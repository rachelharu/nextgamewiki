import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GameDetails from "@/components/GameDetails";

export default function GameDetailsPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Navbar showSearch={true} />
      <div className="hero-body">
        <div className="container">
          <GameDetails id={params.id} />
        </div>
      </div>
      <Footer />
    </>
  );
}