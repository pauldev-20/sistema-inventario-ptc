import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
 const categories = [
    { id: 1, name: 'Articulos de limpieza' },
    { id: 2, name: 'Articulos de oficina' },
    { id: 3, name: 'Electronicos' },
    { id: 4, name: 'Herramientas' },
    { id: 5, name: 'Muebles' },
    { id: 6, name: 'Ropa' },
    { id: 7, name: 'Tecnologia' },
 ]
 const products = [
    { id: 1, name: 'Escoba', description: 'Escoba de plastico', price: 1000, categoryId: 1 },
    { id: 2, name: 'Lapiz', description: 'Lapiz de madera', price: 500, categoryId: 2 },
    { id: 3, name: 'Computadora', description: 'Computadora de escritorio', price: 50000, categoryId: 3 },
    { id: 4, name: 'Taladro', description: 'Taladro electrico', price: 20000, categoryId: 4 },
    { id: 5, name: 'Silla', description: 'Silla de oficina', price: 15000, categoryId: 5 },
    { id: 6, name: 'Camisa', description: 'Camisa de algodon', price: 2000, categoryId: 6 },
    { id: 7, name: 'Celular', description: 'Celular inteligente', price: 30000, categoryId: 7 },
    { id: 8, name: 'Borrador', description: 'Borrador de goma', price: 200, categoryId: 2 },
    { id: 9, name: 'Monitor', description: 'Monitor de 24 pulgadas', price: 15000, categoryId: 3 },
    { id: 10, name: 'Destornillador', description: 'Destornillador de cruz', price: 5000, categoryId: 4 },
    { id: 11, name: 'Mesa', description: 'Mesa de madera', price: 25000, categoryId: 5 },
    { id: 12, name: 'Pantalon', description: 'Pantalon de mezclilla', price: 3000, categoryId: 6 },
    { id: 13, name: 'Tablet', description: 'Tablet de 10 pulgadas', price: 20000, categoryId: 7 },
    { id: 14, name: 'Escoba de paja', description: 'Escoba de paja', price: 1200, categoryId: 1 },
    { id: 15, name: 'Lapiz de color', description: 'Lapiz de color', price: 800, categoryId: 2 },
    { id: 16, name: 'Laptop', description: 'Laptop de 15 pulgadas', price: 80000, categoryId: 3 },
    { id: 17, name: 'Martillo', description: 'Martillo de acero', price: 7000, categoryId: 4 },
    { id: 18, name: 'Silla de plastico', description: 'Silla de plastico', price: 5000, categoryId: 5 },
    { id: 19, name: 'Zapatos', description: 'Zapatos de cuero', price: 4000, categoryId: 6 },
    { id: 20, name: 'Smartwatch', description: 'Reloj inteligente', price: 15000, categoryId: 7 },
 ]

 for (const category of categories) {
    const { name } = category
    const categoryCreate = await prisma.category.create({
      data: {
        name,
      },
    })
    const productsToCreate = products.filter((product) => product.categoryId === categoryCreate.id)
    await prisma.product.createMany({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      data: productsToCreate.map(({id, ...rest}) => ({...rest})),
    })
 }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })