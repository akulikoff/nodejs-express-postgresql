/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Dish` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dish_title_key" ON "Dish"("title");
