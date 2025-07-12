
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const cliente = await prisma.cliente.create({
    data: {
      nombre: "micliente",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
