/*
  Warnings:

  - Added the required column `priceKwh` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtykwh` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "priceKwh" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "qtykwh" DOUBLE PRECISION NOT NULL;
