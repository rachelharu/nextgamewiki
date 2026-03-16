'use client';
import React from 'react'
import { Grid, Image, Text, Title, Button, Paper } from '@mantine/core';
import DetailsCard from './DetailsCard';

interface DetailsBodyProps {
  description: string;
  descImg: string;
  genres: { name: string }[];
  platforms: { name: string }[];
  released?: string;
  publishers?: { name: string }[];
  developers?: { name: string }[];
  esrb_rating?: string;
  metacritic?: number;
  metacritic_url?: string;
  website?: string;
}

const DetailsBody = ({
   description,
   descImg,
   genres,
   platforms,
   released,
   publishers,
   developers,
   esrb_rating,
   website
  }: DetailsBodyProps) => {
  const [expanded, setExpanded] = React.useState(false);

  const PREVIEW_CHARS = 350;
  const isTruncated = !!(description && description.length > PREVIEW_CHARS);
  const previewText = description ? description.slice(0, PREVIEW_CHARS) : '';

  return (
    // Description
    <Grid mb={100} mt="xl" ta="left" gutter="xs">
      <Grid.Col span={{ base: 12, md: 7 }} pr="25" >
        <Title className="text-shadow" lh="md" fw={600} order={5}>Description</Title>
        <div
          style={{
            height: 3,
            borderRadius: 3,
            margin: '6px 0 12px',
            background: 'linear-gradient(90deg, #ff7a18 0%, #ff2d00 12%, var(--main-color, #2b2b3a) 12%, var(--main-color, #2b2b3a) 100%)',
          }}
        />
          <Image mt="lg" src={descImg || ''} alt="Game artwork" />
           <Text mt={35} size="md" fw={400} lts={1} className="text-shadow">
             {expanded || !isTruncated ? description : `${previewText.trim()}…`}
           </Text>
          {isTruncated && (
            <Button variant="subtle" size="xs" mt="md" onClick={() => setExpanded((s) => !s)}>
              {expanded ? 'Show less' : 'Read more'}
            </Button>
          )}
      </Grid.Col>
      {/* Game Details */}
      <Grid.Col span={{ base: 12, md: 5 }} pl="5">
        <Paper p="md" radius="md" shadow="sm" withBorder style={{ background: '#202031', color: '#ffffff', borderColor: 'rgba(255,255,255,0.06)' }}>
          <Title lh="md" fw={600} order={5}>Game details</Title>
          <div
            style={{
              height: 3,
              borderRadius: 3,
              margin: '6px 0 12px',
              background: 'linear-gradient(90deg, #ff7a18 0%, #ff2d00 12%, var(--main-color, #2b2b3a) 12%, var(--main-color, #2b2b3a) 100%)',
            }}
          />

          <DetailsCard
            genres={genres}
            platforms={platforms}
            releaseDate={released}
            publishers={publishers?.map((publisher) => publisher.name)}
            developers={developers?.map((developer) => developer.name)}
            esrb_rating={esrb_rating}
            website={website}
          />
        </Paper>
      </Grid.Col>
    </Grid>
  )
}

export default DetailsBody
