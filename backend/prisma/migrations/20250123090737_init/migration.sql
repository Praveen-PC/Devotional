-- DropForeignKey
ALTER TABLE `devotees` DROP FOREIGN KEY `devotees_userId_fkey`;

-- DropIndex
DROP INDEX `devotees_userId_fkey` ON `devotees`;

-- AlterTable
ALTER TABLE `devotees` MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `devotees` ADD CONSTRAINT `devotees_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
