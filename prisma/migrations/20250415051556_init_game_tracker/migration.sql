-- CreateTable
CREATE TABLE "gameTracker" (
    "id" TEXT NOT NULL,
    "rawgGameID" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gameTracker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_gameTracker_searchCount" ON "gameTracker"("count" DESC);

-- CreateIndex
CREATE INDEX "idx_gameTracker_rawgGameId" ON "gameTracker"("rawgGameID");
