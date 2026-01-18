-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "lookupSource" TEXT DEFAULT 'coordinates',
    "continent" TEXT DEFAULT 'Asia',
    "continentCode" TEXT DEFAULT 'AS',
    "countryName" TEXT DEFAULT 'Thailand',
    "countryCode" TEXT DEFAULT 'TH',
    "principalSubdivision" TEXT DEFAULT 'Bangkok',
    "principalSubdivisionCode" TEXT DEFAULT 'TH-10',
    "city" TEXT DEFAULT 'Bangkok',
    "locality" TEXT DEFAULT 'Thung Wat Don',
    "postcode" TEXT,
    "plusCode" TEXT DEFAULT '7P52PG6J+PM',
    "localityLanguageRequested" TEXT DEFAULT 'en',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_latitude_longitude_idx" ON "User"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "User_countryCode_idx" ON "User"("countryCode");

-- CreateIndex
CREATE INDEX "User_city_idx" ON "User"("city");
