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
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, .15) 40%)"
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

    <GameDetailsContainer id={id} gameName={name} />
    

    {/* <Container size="sm" bd="5px solid black" display="block">
      <Title order={3} mb="sm">Genres: </Title>
        {genres?.map((g) => 
          <Button variant="light" color="indigo" radius="lg">{g.name}</Button>
        )}
    </Container> */}
</>
    // The commented-out code below is the original HTML structure that will be replaced with Mantine components.
          // <div id="summary">
    //  <div className="card">
    //   <div className="card-content">
    //   <div className="content">
    //   <section className="dev-hero">
    //     <div className="hero-body">
    //       <p className="herotitle" id="hero-title">Publisher:</p>
    //       <p className="dev-subtitle">{publishers?.[0]?.name}</p>
    //       <p className="herotitle" id="hero-title">Developers:</p>
    //       <p className="dev-subtitle">{developers?.map((d) => d.name).join(', ')}</p>
    //     </div>
    //   </section>
  
    //   <nav className="level">
    //     <div className="level-item has-text-centered">
    //       <div>
    //         <p className="heading">ESRB:</p>
    //         <p className="title">{esrb_rating === null ? 'N/A' : esrb_rating.name}</p>
    //       </div>
    //     </div>
    //     <div className="level-item has-text-centered">
    //       <div>
    //         <p className="heading">Released:</p>
    //         <p className="title"> {released === null
    //             ? 'N/A'
    //             : new Intl.DateTimeFormat('en-US', {
    //                 month: '2-digit',
    //                 day: '2-digit',
    //                 year: 'numeric',
    //               }).format(new Date(released))}</p>
    //       </div>
    //     </div>
    //     <div className="level-item has-text-centered">
    //       <div>
    //         <p className="heading">
    //           <a href={metacritic_url}>Metacritic Score:</a>
    //         </p>
    //         <p className="title">{metacritic === null ? 'N/A' : metacritic}</p>
    //       </div>
    //     </div>
    //   </nav>
    //   </div>
    //   </div>
    //  </div>

    //   <article className="message">
    //     <div className="message-header">
    //       <p>About</p>
    //     </div>
    //     <div className="message-body">{description_raw}</div>
    //   </article>

    //   <article className="notification">
    //     <h5>Platforms: </h5>
    //     <h4>{platforms?.map((p) => p.platform.name).join(', ')}</h4>
    //   </article>
    // </div>
 
  )};