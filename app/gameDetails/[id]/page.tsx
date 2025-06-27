import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GameDetails from "@/components/GameDetails";
import { trackGameView } from "../../actions/trackGameViews";
import { Container } from "@mantine/core";

interface GameDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function GameDetailsPage({ params }: GameDetailsPageProps) {
  
  const { id } = await params;
  
  await trackGameView(id);

  return (
    <>
      <Navbar showSearch={true} />
      <div className="hero-body">
        <Container fluid >
          <GameDetails id={id} />
        </Container>
      </div>
      <Footer />
    </>
  );
}