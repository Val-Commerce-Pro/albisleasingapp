/*
  Warnings:

  - Added the required column `produktgruppeLabel` to the `ModulEinstellungen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ModulEinstellungen` ADD COLUMN `produktgruppeLabel` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `AntragDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `antragnr` INTEGER NOT NULL,
    `kaufpreis` DOUBLE NOT NULL,
    `eingegangen` VARCHAR(191) NOT NULL,
    `ln_email` VARCHAR(191) NOT NULL,
    `ln_name` VARCHAR(191) NOT NULL,
    `ln_telefon` VARCHAR(191) NOT NULL,
    `gf_name` VARCHAR(191) NOT NULL,
    `gf_vname` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
