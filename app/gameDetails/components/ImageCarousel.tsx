import { useCallback, useEffect, useState } from 'react';
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

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Failed to load screenshots.';

const loadGameScreenshots = useCallback(async () => {
  setLoadingScreenshots(true);
  setErrorScreenshots(null);
  try {
    const fetchedScreenshots = await getGameScreenshots(id);
    setScreenshots(fetchedScreenshots);
  } catch (error: unknown) {
    console.error('Failed to fetch game screenshots:', error);
    setErrorScreenshots(getErrorMessage(error));
  } finally {
    setLoadingScreenshots(false);
  }
}, [id]);

useEffect(() => {
    loadGameScreenshots();
}, [loadGameScreenshots]);

if (loadingScreenshots) return <div>Loading screenshots...</div>;
if (errorScreenshots) return <div>{errorScreenshots}</div>;

return (
  <Carousel
    className="image-carousel"
      withIndicators={false}
      withControls
      controlSize={32}
      slideSize={{base: '100%', sm: '50%', md: '33.333333%'}}
      slideGap="md"
      emblaOptions={{ loop: true, align: 'start', slidesToScroll: 3 }}
    >
    {screenshots.map((screenshot) =>  (
    <Carousel.Slide key={screenshot.image}>
        <Image
          src={screenshot.image}
          alt={`Screenshot for ${gameName}`}
          height={100}
        />
    </Carousel.Slide>
    ))}
    </Carousel>
  );
};
