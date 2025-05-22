import Link from 'next/link';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import styles from './trending.module.css';
import Image from 'next/image';
import { db } from "@/lib/db";
import { getGameDetails } from "@/app/actions";

export const dynamic = 'force-dynamic';

async function getTopGames() {
    return await db.trackedGame.findMany({
        take: 5,
        orderBy: {
            count: 'desc'
        }
    });
}

export default async function TrendingPage() {
    const topGames = await getTopGames();

    const gameDetails = await Promise.all(
        topGames.map(async (game) => {
            const details = await getGameDetails(game.rawgGameID);
            return {
                ...details
            };
        })
    );

  return (
    <>
      <Navbar showSearch={true} />
      <div className="section">
        <div className="container">
          <h1 className="title">Trending Games</h1>
          <div className={styles.gameGrid}>
            {gameDetails.map(game => (
              <Link 
                  href={`/gameDetails/${game.id}`}
                  key={game.id}
                  className={styles.gameCard}
                  >
                  <div key={game.id} className="box">
                    <h2 className="title is-4">{game.name}</h2>
                    <Image 
                        src={game.background_image} 
                        alt={game.name}
                        width={400}
                        height={340}
                        style={{ width: '100%', height: 'auto' }}
                        />
                  </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}