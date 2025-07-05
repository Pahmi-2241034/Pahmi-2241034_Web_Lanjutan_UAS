/*
  Warnings:

  - Added the required column `suplierId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `suplierId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Suplier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `Phone` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_suplierId_fkey` FOREIGN KEY (`suplierId`) REFERENCES `Suplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
