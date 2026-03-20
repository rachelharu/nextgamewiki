import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Details from "@/features/game-details/components/Details";
import { trackGameView } from "@/lib/services/tracking";
import { getGameDetails, getGameScreenshots } from "@/lib/rawg/api";
import { Container } from "@mantine/core";

interface GameDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function GameDetailsPage({ params }: GameDetailsPageProps) {
  const { id } = await params;

  const [gameData, screenshots] = await Promise.all([
    getGameDetails(id),
    getGameScreenshots(id),
  ]);

  // tracking should not block rendering if the counter write fails.
  trackGameView(id).catch((error) => {
    console.error('Failed to track game view:', error);
  });

  return (
    <>
      <Navbar showSearch={true} />
      <div className="hero-body">
        <Container fluid p="0" >
          <Details gameData={gameData} screenshots={screenshots} />
        </Container>
      </div>
      <Footer />
    </>
  );
}
