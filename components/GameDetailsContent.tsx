import React from 'react'
import { Divider, Grid, Image, Text, Title } from '@mantine/core';
import DetailsTable from './DetailsTable';

interface GameDetailsContentProps {
  id: string;
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
}

const GameDetailsContent = ({
   id,
   description,
   descImg,
   genres,
   platforms,
   released,
   publishers,
   developers,
   esrb_rating,
   metacritic,
   metacritic_url
   }: GameDetailsContentProps) => {
  return (
    <Grid mt="xl" ta="left" gutter="xs">
      <Grid.Col span={{ base: 12, md: 7 }} pr="25" >
        <Title className="text-shadow" lh="md" fw={600} order={5}>Description</Title>
         <Divider my="sm" size="xs" />
          <Image mt="lg" src={descImg}/>
           <Text mt={35} size="md" fw={400} className="text-shadow" >
              {description.split('.').slice(0, 6).join('. ') + '.'}
           </Text>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 5 }} pl="5">
        <Title lh="md" fw={600} order={5}>Game details</Title>
          <Divider my="sm" size="xs" />
            <DetailsTable
              genres={genres}
              platforms={platforms}
              releaseDate={released}
              publishers={publishers?.map((publisher) => publisher.name)}
              developers={developers?.map((developer) => developer.name)}
              esrb_rating={esrb_rating}
              metacritic={metacritic}
              metacritic_url={metacritic_url}
            />
      </Grid.Col>
    </Grid>
  )
}

export default GameDetailsContent