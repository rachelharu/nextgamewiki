import type { Screenshot } from '@/types/rawg';
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';

interface ImageCarouselProps {
  gameName: string;
  screenshots: Screenshot[];
}

export default function ImageCarousel({ gameName, screenshots }: ImageCarouselProps) {
  if (!screenshots.length) return null;

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
}
