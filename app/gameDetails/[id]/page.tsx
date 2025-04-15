import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GameDetails from "@/components/GameDetails";
import { trackGameView } from "../../actions/trackGameViews";

export default async function GameDetailsPage({ params }: { params: { id: string } }) {
  await trackGameView(params.id);

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