'use server';

import { db } from '@/lib/db';

export async function trackGameView(rawgGameID: string) {
    try {
        const existingTracker = await db.trackedGame.findFirst({
            where: { rawgGameID }
        });

        if (existingTracker) {
            return await db.trackedGame.update({
                where: { id: existingTracker.id },
                data: {
                    count: existingTracker.count + 1,
                    updatedAt: new Date()
                }
            });
        }

        return await db.trackedGame.create({
            data: {
                rawgGameID,
                count: 1
            }
        }); 
    } catch (error) {
        console.error('Error tracking game view:', error);
        throw error;
    }
}