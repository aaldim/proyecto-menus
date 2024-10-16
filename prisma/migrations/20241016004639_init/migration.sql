-- CreateEnum
CREATE TYPE "ClassifierType" AS ENUM ('PRESENTATION', 'CATEGORY', 'SUBCATEGORY');

-- CreateEnum
CREATE TYPE "WeekDay" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientMenu" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "menuId" INTEGER NOT NULL,
    "dayOfWeek" "WeekDay" NOT NULL,
    "totalCost" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "ClientMenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classifier" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ClassifierType" NOT NULL,

    CONSTRAINT "Classifier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "totalCost" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceMenuItem" (
    "id" SERIAL NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "menuItemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalCost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "InvoiceMenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "extraCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceHistory" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "oldPrice" DOUBLE PRECISION NOT NULL,
    "newPrice" DOUBLE PRECISION NOT NULL,
    "changedBy" TEXT NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PriceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "costPrice" DOUBLE PRECISION NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClassifierToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassifierToProduct_AB_unique" ON "_ClassifierToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassifierToProduct_B_index" ON "_ClassifierToProduct"("B");

-- AddForeignKey
ALTER TABLE "ClientMenu" ADD CONSTRAINT "ClientMenu_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientMenu" ADD CONSTRAINT "ClientMenu_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceMenuItem" ADD CONSTRAINT "InvoiceMenuItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceMenuItem" ADD CONSTRAINT "InvoiceMenuItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassifierToProduct" ADD CONSTRAINT "_ClassifierToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Classifier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassifierToProduct" ADD CONSTRAINT "_ClassifierToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
