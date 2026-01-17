import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DetailsPage from "@/app/gameDetails/components/DetailsPage";
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
        <Container fluid p="0" >
          <DetailsPage id={id} />
        </Container>
      </div>
      <Footer />
    </>
  );
}
