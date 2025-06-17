/*
  Warnings:

  - A unique constraint covering the columns `[codigo_identificacion]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "codigo_identificacion" VARCHAR(25);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_codigo_identificacion_key" ON "usuario"("codigo_identificacion");
