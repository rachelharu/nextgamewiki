'use client';
import { getGameDetails, type GameDetails } from '@/app/actions';
import { useEffect, useState } from 'react';
import { Container, Divider, Overlay, Text, Title } from '@mantine/core';
import classes from './Details.module.css';
import ImageCarousel from '@/components/ImageCarousel';
import ReviewSection from '@/components/ReviewSection';
import DetailsBody from '@/components/DetailsBody';

interface DetailsPageProps {
  id: string;
}

const regex = new RegExp("[^!.?]+[!.?]+", "g");

export default function DetailsPage({ id }: DetailsPageProps) {
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
    metacritic_platforms,
    platforms,
    website
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
          {((description_raw.match(regex) || []).slice(0, 1).join(' ').trim())}
        </Text>
      </Container>
    </div>

    <Container pb="25" pl={150} pr={150} pt={25} fluid >
      <ImageCarousel id={id} gameName={name} />
      <DetailsBody
        id={id}
        description={description_raw}
        descImg={background_image_additional}
        genres={genres?.map((g) => ({ name: g.name })) ?? []}
        platforms={platforms?.map((p) => ({ name: p.platform.name })) ?? []}
        released={released === null
          ? 'N/A'
          : new Intl.DateTimeFormat('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            }).format(new Date(released))}
        publishers={publishers?.map((p) => ({ name: p.name }))}
        developers={developers?.map((d) => ({ name: d.name }))}
        esrb_rating={esrb_rating === null ? 'N/A' : esrb_rating.name}
        metacritic={metacritic === null ? -1 : metacritic}
        metacritic_url={metacritic_url}
        website={website ? website : 'N/A'}
      />

      <Title ta="left" lh="md" fw={600} order={5}>Critics reviews</Title>
      <Divider my="sm" size="xs" />
      <ReviewSection
        metacritic_platforms={metacritic_platforms}
        metacritic={metacritic === null ? -1 : metacritic}
        metacritic_url={metacritic_url}
      />
      <Divider my="sm" size="xs" />
    </Container>
  </>
)};
