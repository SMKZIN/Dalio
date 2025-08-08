-- CreateTable
CREATE TABLE "public"."Hero" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "power" DOUBLE PRECISION NOT NULL,
    "country" TEXT NOT NULL,
    "ability" TEXT NOT NULL,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);
