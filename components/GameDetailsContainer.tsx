import { Container } from '@mantine/core';
import ImageCarousel from '@/components/ImageCarousel';
import GameDetailsContent from '@/components/GameDetailsContent';

interface GameDetailsContainerProps {
  id: string;
  gameName: string;
}

export default function GameDetailsContainer({id, gameName}: GameDetailsContainerProps) {
  return (
    <Container p={25} fluid bg="#202031">
        <ImageCarousel id={id} gameName={gameName}/>
        {/* <GameDetailsContent id={id} /> */}
    </Container>
  );
}