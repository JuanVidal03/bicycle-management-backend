-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('DISPONIBLE', 'EN_MANTENIMIENTO', 'OCUPADA');

-- CreateTable
CREATE TABLE "bicycles" (
    "id" SERIAL NOT NULL,
    "marca" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'DISPONIBLE',
    "precio" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bicycles_pkey" PRIMARY KEY ("id")
);
