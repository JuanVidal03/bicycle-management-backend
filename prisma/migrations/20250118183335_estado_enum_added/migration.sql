/*
  Warnings:

  - Added the required column `estado` to the `Bicycles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('DISPONIBLE', 'EN_MANTENIMIENTO', 'OCUPADA');

-- AlterTable
ALTER TABLE "Bicycles" ADD COLUMN     "estado" "Estado" NOT NULL;
