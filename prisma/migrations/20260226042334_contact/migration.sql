-- CreateEnum
CREATE TYPE "LEADSTATUS" AS ENUM ('New', 'Progress', 'Connected', 'Unqualified', 'Open');

-- CreateEnum
CREATE TYPE "FAVOURITECONTENT" AS ENUM ('Strategy', 'Operational', 'Financial', 'IT', 'HR');

-- CreateEnum
CREATE TYPE "CHANNELS" AS ENUM ('Linkedin', 'Instagram', 'SMS', 'Email', 'Blog');

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "leadStatus" "LEADSTATUS" NOT NULL,
    "favoriteContent" "FAVOURITECONTENT" NOT NULL,
    "preferredChanel" "CHANNELS" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
