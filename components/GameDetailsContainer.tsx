import { Container, Divider, Title } from '@mantine/core';
import ImageCarousel from '@/components/ImageCarousel';
import GameDetailsContent from '@/components/GameDetailsContent';
import GameReviewSection from '@/components/GameReviewSection';

interface GameDetailsContainerProps {
  id: string;
  gameName: string;
  description: string;
  descImg: string;
  genres: string[];
  developers: string[];
  publishers: string[];
  released: string;
  esrb_rating: string;
  metacritic: number;
  metacritic_url: string;
  metacritic_platforms: { metascore: number; url: string; platform: { id: number; name: string; slug: string } }[];
  platforms: { name: string }[];
  website: string;
}

export default function GameDetailsContainer({
  id,
  gameName,
  description,
  descImg,
  genres,
  platforms,
  released,
  publishers,
  developers,
  esrb_rating,
  metacritic,
  metacritic_url,
  metacritic_platforms,
  website
  }: GameDetailsContainerProps) {
  return (
    <Container pb="25" pl={150} pr={150} pt={25} fluid bg="#202031">
      <ImageCarousel id={id} gameName={gameName} />
      <GameDetailsContent
        id={id} 
        description={description} 
        descImg={descImg}
        genres={genres.map((genre) => ({ name: genre }))}
        platforms={platforms.map((platform) => ({ name: platform.name }))}
        released={released}
        publishers={publishers.map((publisher) => ({ name: publisher }))}
        developers={developers.map((developer) => ({ name: developer }))}
        esrb_rating={esrb_rating}
        metacritic={metacritic}
        metacritic_url={metacritic_url}
        website={website}
        />
      <Title ta="left" lh="md" fw={600} order={5}>Critics reviews</Title>  
      <Divider my="sm" size="xs" />
      <GameReviewSection
        metacritic_platforms={metacritic_platforms}
        metacritic={metacritic}
        metacritic_url={metacritic_url}
       />
      <Divider my="sm" size="xs" />
    </Container>
  );
}