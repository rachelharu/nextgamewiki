'use client';
import { getGameDetails, type GameDetails } from '@/app/actions';
import { useEffect, useState } from 'react';
import { Button, Card, Container, Image, Overlay, SimpleGrid, Text, Title } from '@mantine/core';
import classes from './GameDetails.module.css';
import GameDetailsContainer from './GameDetailsContainer';

interface GameDetailsProps {
  id: string;
}

export default function GameDetails({ id }: GameDetailsProps) {
  const [gameData, setGameData] = useState<GameDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGameDetails() {
      try {
        const details = await getGameDetails(id);
        // console.log(details);
        setGameData(details);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch game details:', error);
        setLoading(false);
      }
    }

    loadGameDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!gameData) return <div>Game not found</div>;

  const {
    name,
    background_image,
    background_image_additional,
    description_raw,
    genres,
    publishers,
    developers,
    released,
    esrb_rating,
    metacritic,
    metacritic_url,
    platforms
  } = gameData;

return (
  <>
    <div className={classes.hero}
      style={{
        backgroundImage: `
        linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%),
        url(${background_image})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, .10) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title fw={700} className={classes.title}>{name}</Title>
        <Text className={classes.description} size="xl" mb={100}>
          {description_raw?.split('.', 1).join('.') + '.'}
        </Text>
      </Container>
    </div>

    <GameDetailsContainer 
      id={id} 
      gameName={name} 
      description={description_raw} 
      descImg={background_image_additional}
      genres={genres?.map((g) => g.name)}
      publishers={publishers?.map((p) => p.name)}
      developers={developers?.map((d) => d.name)}
      released={released === null
                ? 'N/A'
                : new Intl.DateTimeFormat('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  }).format(new Date(released))}
      esrb_rating={esrb_rating === null ? 'N/A' : esrb_rating.name}
      metacritic={metacritic === null ? -1 : metacritic}
      metacritic_url={metacritic_url}
      platforms={platforms?.map((p) => ({ name: p.platform.name }))}
      />
  </>
)};