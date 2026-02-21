-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ManagedImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "section" TEXT NOT NULL,
    "imageUrl" TEXT,
    "mobileImageUrl" TEXT,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ManagedImage" ("createdAt", "description", "id", "imageUrl", "isActive", "mobileImageUrl", "section", "sortOrder", "subtitle", "title", "updatedAt") SELECT "createdAt", "description", "id", "imageUrl", "isActive", "mobileImageUrl", "section", "sortOrder", "subtitle", "title", "updatedAt" FROM "ManagedImage";
DROP TABLE "ManagedImage";
ALTER TABLE "new_ManagedImage" RENAME TO "ManagedImage";
CREATE INDEX "ManagedImage_section_isActive_sortOrder_idx" ON "ManagedImage"("section", "isActive", "sortOrder");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
