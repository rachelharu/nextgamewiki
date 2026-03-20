'use server';

import { db } from '@/lib/db';

export async function trackGameView(rawgGameID: string) {
  if (!rawgGameID) throw new Error('Game ID is required');

  try {
    return await db.trackedGame.upsert({
      where: { rawgGameID },
      update: {
        count: {
          increment: 1,
        },
      },
      create: {
        rawgGameID,
        count: 1,
      },
    });
  } catch (error) {
    console.error('Error tracking game view:', error);
    throw error;
  }
}
