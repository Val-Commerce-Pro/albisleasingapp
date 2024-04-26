-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `shop` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `isOnline` BOOLEAN NOT NULL DEFAULT false,
    `scope` VARCHAR(191) NULL,
    `expires` DATETIME(3) NULL,
    `accessToken` VARCHAR(191) NOT NULL,
    `userId` BIGINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ModulAktiv` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shop` VARCHAR(191) NOT NULL,
    `isModulAktiv` BOOLEAN NOT NULL,

    UNIQUE INDEX `ModulAktiv_shop_key`(`shop`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ModulZugangsdaten` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apiLink` VARCHAR(191) NOT NULL,
    `benutzer` VARCHAR(191) NOT NULL,
    `passwort` VARCHAR(191) NOT NULL,
    `modulAktivId` INTEGER NOT NULL,

    UNIQUE INDEX `ModulZugangsdaten_modulAktivId_key`(`modulAktivId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ModulEinstellungen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vertragsart` VARCHAR(191) NOT NULL,
    `restwertInBeiTAVertrag` BOOLEAN NULL,
    `produktgruppe` VARCHAR(191) NOT NULL,
    `produktgruppeLabel` VARCHAR(191) NOT NULL,
    `zahlungsweisen` VARCHAR(191) NOT NULL,
    `auswahlZahlungsweiseAnzeigen` BOOLEAN NOT NULL,
    `minLeasingsumme` VARCHAR(191) NOT NULL,
    `servicePauschaleNetto` VARCHAR(191) NOT NULL,
    `albisServiceGebuhrNetto` VARCHAR(191) NOT NULL,
    `provisionsangabe` VARCHAR(191) NOT NULL,
    `objektVersicherung` BOOLEAN NOT NULL,
    `auswahlObjektVersicherungAnzeigen` BOOLEAN NOT NULL,
    `mietsonderzahlung` VARCHAR(191) NOT NULL,
    `eingabeSonderzahlungErmoglichen` BOOLEAN NOT NULL,
    `pInfoseiteZeigeAlle` BOOLEAN NOT NULL,
    `antragOhneArtikelMoglich` BOOLEAN NOT NULL,
    `kundeKannFinanzierungsbetragAndern` BOOLEAN NOT NULL,
    `zugangsdatenId` INTEGER NOT NULL,

    UNIQUE INDEX `ModulEinstellungen_zugangsdatenId_key`(`zugangsdatenId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AntragDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `antragnr` INTEGER NOT NULL,
    `complete` BOOLEAN NOT NULL,
    `status` INTEGER NOT NULL,
    `status_txt` VARCHAR(191) NOT NULL,
    `kaufpreis` DOUBLE NOT NULL,
    `eingegangen` VARCHAR(191) NOT NULL,
    `ln_name` VARCHAR(191) NOT NULL,
    `ln_telefon` VARCHAR(191) NULL,
    `ln_mobil` VARCHAR(191) NULL,
    `ln_email` VARCHAR(191) NOT NULL,
    `gf_name` VARCHAR(191) NOT NULL,
    `gf_vname` VARCHAR(191) NOT NULL,
    `lastCheckAt` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AntragDetails_antragnr_key`(`antragnr`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShopifyOrders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `draftOrderId` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `antragnr` INTEGER NOT NULL,

    UNIQUE INDEX `ShopifyOrders_draftOrderId_key`(`draftOrderId`),
    UNIQUE INDEX `ShopifyOrders_orderId_key`(`orderId`),
    UNIQUE INDEX `ShopifyOrders_antragnr_key`(`antragnr`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ModulZugangsdaten` ADD CONSTRAINT `ModulZugangsdaten_modulAktivId_fkey` FOREIGN KEY (`modulAktivId`) REFERENCES `ModulAktiv`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ModulEinstellungen` ADD CONSTRAINT `ModulEinstellungen_zugangsdatenId_fkey` FOREIGN KEY (`zugangsdatenId`) REFERENCES `ModulZugangsdaten`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShopifyOrders` ADD CONSTRAINT `ShopifyOrders_antragnr_fkey` FOREIGN KEY (`antragnr`) REFERENCES `AntragDetails`(`antragnr`) ON DELETE RESTRICT ON UPDATE CASCADE;
