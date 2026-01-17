import Link from 'next/link';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge, Box, Card, Group, Image, SimpleGrid, Text } from '@mantine/core';
import classes from './trending.module.css';
import { db } from "@/lib/db";
import { getGameDetails } from "@/app/actions";

export const dynamic = 'force-dynamic';

async function getTopGames() {
    return await db.trackedGame.findMany({
        take: 5,
        orderBy: {
            count: 'desc'
        },
        select : {
          rawgGameID: true,
          count: true
        }
    });
}

export default async function TrendingPage() {
    const topGames = await getTopGames();

    const gameDetails = await Promise.all(
        topGames.map(async (game: any) => {
            const details = await getGameDetails(game.rawgGameID);
            return {
                ...details,
                count: game.count,
            };
        })
    );

  return (
    <>
     <Navbar showSearch={true} />
      <div className="section">
        <div className="container">
          <h1 className="title">Trending Games</h1>
          <SimpleGrid 
            cols={{ base:1, sm:2, lg:5 }}
            spacing={{ base: 10, sm: 'md'}}
          >
          {gameDetails.map((game) => (
          <Card
            key={game.id}
            padding={0}
            radius="md"
            className={classes.card}
            data-testid="trending-card">
              <Box mb="sm" style={{ height: 180, overflow: 'hidden' }}>
                <Image
                  src={game.background_image}
                  alt={game.name}
                  height={180}
                  fit='cover'
                  style={{ objectFit: 'cover', width: '100%', minHeight: 180, display: 'block' }}
                />
              </Box>

            <Group ml="xs" mr="xs" gap="xs" mb="xs" wrap="wrap">
              {game.genres.slice(0,2).map((genre: { name: string }) => (
                  <Badge key={genre.name} variant="light">{genre.name}</Badge>
              ))}
            </Group>
            <Text
              fw={700}
              className={classes.title} 
              component={Link}
              href={`/gameDetails/${game.id} `}>{game.name}
            </Text>
            <Group mt="lg" justify="center">
              <div>
                <Text c="#878791" px="xs" size="sm" id="description">{game.description_raw.slice(0, 90)}...</Text>
              </div>
            </Group>

            <Box className={classes.cardFooter}>
              <Group justify="center">
                <Text fz="xs" c="dimmed">
                  {game.count} people liked this
                </Text>
              </Group>
            </Box> 
          </Card>
          ))}
          </SimpleGrid>
        </div>
      </div>
     <Footer />
    </>
  );
}
