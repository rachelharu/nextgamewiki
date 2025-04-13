'use client';
import { getGameDetails, type GameDetails } from '@/app/actions';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
        console.log('Game details:', details);
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
    <div id="summary">
      <article className="media">
        <figure className="media-left">
            <p className="image">
            <Image
              id="art"
              src={background_image}
              alt={name}
              width={500}
              height={300}
              style={{ width: '100%', height: 'auto' }}
            />
            </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <h1>{name}</h1>
            <h5>Genres: </h5>
            <h4>{genres?.map((g) => g.name).join(', ')}</h4>
          </div>
        </div>
      </article>

      <div className="card">
        <div className="card-content">
          <div className="content">
            <h3 id="description">{description_raw?.split('.', 2).join('.')}</h3>
          </div>
        </div>
      </div>

     <div className="card">
      <div className="card-content">
      <div className="content">
      <section className="dev-hero">
        <div className="hero-body">
          <p className="herotitle" id="hero-title">Publisher:</p>
          <p className="dev-subtitle">{publishers?.[0]?.name}</p>
          <p className="herotitle" id="hero-title">Developers:</p>
          <p className="dev-subtitle">{developers?.map((d) => d.name).join(', ')}</p>
        </div>
      </section>
  
      <nav className="level">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">ESRB:</p>
            <p className="title">{esrb_rating === null ? 'N/A' : esrb_rating.name}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Released:</p>
            <p className="title"> {released === null
                ? 'N/A'
                : new Intl.DateTimeFormat('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                  }).format(new Date(released))}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">
              <a href={metacritic_url}>Metacritic Score:</a>
            </p>
            <p className="title">{metacritic === null ? 'N/A' : metacritic}</p>
          </div>
        </div>
      </nav>
      </div>
      </div>
     </div>

      <article className="message">
        <div className="message-header">
          <p>About</p>
        </div>
        <div className="message-body">{description_raw}</div>
      </article>

      <article className="notification">
        <h5>Platforms: </h5>
        <h4>{platforms?.map((p) => p.platform.name).join(', ')}</h4>
      </article>
    </div>
  )};