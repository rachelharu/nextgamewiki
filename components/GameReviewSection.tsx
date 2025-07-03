import React from 'react';
import { Container, RingProgress, SimpleGrid, Text } from '@mantine/core';
import Image from 'next/image';
import classes from './GameReviewSection.module.css';

interface GameReviewSectionProps {
  metacritic: number;
  metacritic_url: string;
  metacritic_platforms: { metascore: number; url: string; platform: { id: number; name: string; slug: string } }[];
}

//display different "rating" based on the metacritic score
function selectRating(metacritic:number): string {
  if (metacritic >= 90) {
    return "Universal Acclaim"
  } else if (metacritic >= 75) {
    return "Generally Favorable";
  } else if (metacritic >= 50) {
    return "Mixed or Average";
  } else if (metacritic >= 20) {
    return "Generally Unfavorable";
  } else {
    return "Overwhelming Dislike";
  }
}

const GameReviewSection = ({ metacritic }: GameReviewSectionProps) => {
function getColor(metacritic:number): string {
  if (metacritic >= 75) {
    return "Green";
  } else if (metacritic >= 50 && metacritic <= 74) {
    return "Gold";
  } else {
    return "Red";
  }
}
  return (
    <Container  mt={20} mb={20} size="lg">
      <SimpleGrid ml="md" mr="md" cols={{ base: 1, sm: 2 }} spacing={50}>
        <div className={classes.feature}>
          <div className={classes.content}>
            <Container mt="lg">
              <Image
                width={250}
                height={100}
                src="/metacritic_logo.png"
                alt="metacritic logo"
              />
              <Text pl="lg" fw={500} fz={25}>
                {selectRating(metacritic)}
              </Text>
           </Container>
          </div>
        </div>

        <div className={classes.feature}>
          <div className={classes.content}>
            <RingProgress ml={50} mb="xl"
              label={
              <Text size="xl" ta="center">
                {metacritic}
              </Text>
              }
              size={150}
              thickness={11}
              roundCaps
              sections={[
                { value: Number(metacritic), color: getColor(metacritic) },
              ]}
              rootColor="#87878b" 
            />
          </div>
        </div>
      </SimpleGrid>
    </Container>
  );
};

export default GameReviewSection;