-- CreateTable
CREATE TABLE `ShopifyOrders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `draftOrderId` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `AntragDetailsId` INTEGER NOT NULL,

    UNIQUE INDEX `ShopifyOrders_draftOrderId_key`(`draftOrderId`),
    UNIQUE INDEX `ShopifyOrders_orderId_key`(`orderId`),
    UNIQUE INDEX `ShopifyOrders_AntragDetailsId_key`(`AntragDetailsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShopifyOrders` ADD CONSTRAINT `ShopifyOrders_AntragDetailsId_fkey` FOREIGN KEY (`AntragDetailsId`) REFERENCES `AntragDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
