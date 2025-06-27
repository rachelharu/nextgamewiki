import React from 'react';
import { useEffect, useState } from 'react';
import { getGameScreenshots, Screenshot, } from '@/app/actions'
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';

interface ImageCarouselProps {
  id: string;
  gameName: string;
}

export default function ImageCarousel({ id, gameName }: ImageCarouselProps) {
const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
const [loadingScreenshots, setLoadingScreenshots] = useState(false);
const [errorScreenshots, setErrorScreenshots] = useState<string | null>(null);

 async function loadGameScreenshots() {
      setLoadingScreenshots(true);
      setErrorScreenshots(null);
      try {
        const fetchedScreenshots = await getGameScreenshots(id);
        setScreenshots(fetchedScreenshots);
      } catch (error: any) {
        console.error('Failed to fetch game screenshots:', error);
        setErrorScreenshots(error.message || 'Failed to load screenshots.');
      } finally {
        setLoadingScreenshots(false);
      }
    }

useEffect(() => {
    async function loadGameScreenshots() {
     setLoadingScreenshots(true);
     setErrorScreenshots(null);
     try {
        const fetchedScreenshots = await getGameScreenshots(id);
        setScreenshots(fetchedScreenshots);
     } catch (error: any) {
        console.error('Failed to fetch game screenshots:', error);
        setErrorScreenshots(error.message || 'Failed to load screenshots.');
     } finally {
        setLoadingScreenshots(false);
     }
    }
    loadGameScreenshots();
}, [id]);

if (loadingScreenshots) return <div>Loading screenshots...</div>;
if (errorScreenshots) return <div>{errorScreenshots}</div>;

return (
  <Carousel
      withIndicators
      withControls
      controlSize={24}
      slideSize={{base: '100%', sm: '50%', md: '33.333333%'}}
      slideGap="md"
      emblaOptions={{ loop: true, align: 'start', slidesToScroll: 3 }}
    >
    {screenshots.map((screenshot) =>  (
    <Carousel.Slide key={screenshot.image}>
        <Image
            src={screenshot.image}
            alt={`Screenshot for {gameName}` }
            height={100}
          />
    </Carousel.Slide>
    ))}
    </Carousel>
  );
};
