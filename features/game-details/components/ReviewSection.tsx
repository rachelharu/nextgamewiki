import React from 'react';
import { Anchor, Container, RingProgress, SimpleGrid, Text } from '@mantine/core';
import Image from 'next/image';
import classes from './ReviewSection.module.css';

interface ReviewSectionProps {
  metacritic: number | null;
  metacritic_url: string;
  metacritic_platforms: { metascore: number; url: string; platform: { id: number; name: string; slug: string } }[];
}

function selectRating(metacritic: number | null): string {
  if (metacritic === null) {
    return "No critics score yet";
  }

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

function getColor(metacritic: number | null): string {
  if (metacritic === null) {
    return "Gray";
  }

  if (metacritic >= 75) {
    return "Green";
  } else if (metacritic >= 50 && metacritic <= 74) {
    return "Gold";
  } else {
    return "Red";
  }
}

const ReviewSection = ({ metacritic, metacritic_url, metacritic_platforms }: ReviewSectionProps) => {
  const normalizedScore =
    metacritic === null ? 0 : Math.max(0, Math.min(100, metacritic));
  const topPlatformScores = metacritic_platforms.slice(0, 3);

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
              {/* {metacritic_url && (
                <Anchor
                  href={metacritic_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  c="#dee0e6"
                  ml="lg"
                  size="sm"
                >
                  View on Metacritic
                </Anchor>
              )} */}
              {/* {topPlatformScores.map(({ platform, metascore }) => (
                <Text key={platform.id} pl="lg" size="sm" c="dimmed">
                  {platform.name}: {metascore}
                </Text>
              ))} */}
           </Container>
          </div>
        </div>

        <div className={classes.feature}>
          <div className={classes.content}>
            <RingProgress ml={50} mb="xl"
              label={
              <Text size="xl" ta="center">
                {metacritic ?? 'N/A'}
              </Text>
              }
              size={150}
              thickness={11}
              roundCaps
              sections={[
                { value: normalizedScore, color: getColor(metacritic) },
              ]}
              rootColor="#87878b" 
            />
          </div>
        </div>
      </SimpleGrid>
    </Container>
  );
};

export default ReviewSection;
