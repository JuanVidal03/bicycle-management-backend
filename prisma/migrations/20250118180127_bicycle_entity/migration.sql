-- CreateTable
CREATE TABLE "Bicycles" (
    "id" SERIAL NOT NULL,
    "marca" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bicycles_pkey" PRIMARY KEY ("id")
);
