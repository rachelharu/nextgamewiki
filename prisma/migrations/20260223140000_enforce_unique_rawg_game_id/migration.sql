-- Deduplicate any existing rows so we can safely enforce uniqueness.
WITH ranked_rows AS (
  SELECT
    "id",
    ROW_NUMBER() OVER (
      PARTITION BY "rawgGameID"
      ORDER BY "count" DESC, "updatedAt" DESC, "createdAt" DESC, "id" DESC
    ) AS rn
  FROM "gameTracker"
)
DELETE FROM "gameTracker"
WHERE "id" IN (
  SELECT "id" FROM ranked_rows WHERE rn > 1
);

-- Replace the non-unique index with a unique index.
DROP INDEX IF EXISTS "idx_gameTracker_rawgGameId";
CREATE UNIQUE INDEX "gameTracker_rawgGameID_key" ON "gameTracker"("rawgGameID");
