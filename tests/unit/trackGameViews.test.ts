import { afterEach, describe, expect, it, vi } from 'vitest';
import { trackGameView } from '@/app/actions/trackGameViews';
import { db } from '@/lib/db';

vi.mock('@/lib/db', () => ({
  db: {
    trackedGame: {
      upsert: vi.fn(),
    },
  },
}));

describe('trackGameView', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('throws when rawgGameID is missing', async () => {
    await expect(trackGameView('')).rejects.toThrow('Game ID is required');
  });

  it('calls upsert with increment update and create fallback', async () => {
    const upsertMock = vi.mocked(db.trackedGame.upsert);
    upsertMock.mockResolvedValue({
      id: 'row-1',
      rawgGameID: '3498',
      count: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await trackGameView('3498');

    expect(upsertMock).toHaveBeenCalledTimes(1);
    expect(upsertMock).toHaveBeenCalledWith({
      where: { rawgGameID: '3498' },
      update: { count: { increment: 1 } },
      create: { rawgGameID: '3498', count: 1 },
    });
    expect(result.rawgGameID).toBe('3498');
  });

  it('logs and rethrows db errors', async () => {
    const upsertMock = vi.mocked(db.trackedGame.upsert);
    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});
    const dbError = new Error('db unavailable');
    upsertMock.mockRejectedValue(dbError);

    await expect(trackGameView('9999')).rejects.toThrow('db unavailable');
    expect(consoleErrorMock).toHaveBeenCalledWith('Error tracking game view:', dbError);
  });
});
