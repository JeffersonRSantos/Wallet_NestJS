-- CreateTable
CREATE TABLE `tb_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NULL,
    `cpf` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tb_user_email_key`(`email`),
    UNIQUE INDEX `tb_user_cnpj_key`(`cnpj`),
    UNIQUE INDEX `tb_user_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_wallet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `balance` DECIMAL(10, 2) NOT NULL,
    `active_credit_card` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tb_wallet_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` VARCHAR(191) NOT NULL,
    `value` DECIMAL(10, 2) NOT NULL,
    `userId` INTEGER NOT NULL,
    `typeTransaction` INTEGER NOT NULL,
    `statusTransaction` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_wallet` ADD CONSTRAINT `tb_wallet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tb_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_transaction` ADD CONSTRAINT `tb_transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tb_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
