import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()
async function main() {
    const seedOne = await prisma.products.upsert({
        where: { id: 0},
        update: {},
        create: {
            name: 'Recarga 20',
            price: '20.00',
            description: 'Recarregue 20 no celular.',
            stock: 30
        }        
    })
    const seedTwo = await prisma.products.upsert({
        where: { id: 0},
        update: {},
        create: {
            name: 'Recarga 50',
            price: '50.00',
            description: 'Recarregue 50 no celular.',
            stock: 30
        }
    })
    const seedThree = await prisma.products.upsert({
        where: { id: 0},
        update: {},
        create: {
            name: 'Celular',
            price: '1199.99',
            description: 'Está precisando de um celular novo?',
            stock: 18
        }
    })
    const seedFor = await prisma.products.upsert({
        where: { id: 0},
        update: {},
        create: {
            name: 'TV 40 Polegadas',
            price: '1599.90',
            description: 'TV LG 40 Polegadas, últimas unidades.',
            stock: 5
        }
    })
    const seedFive = await prisma.products.upsert({
        where: { id: 0},
        update: {},
        create: {
            name: 'Geladeira 2 Portas',
            price: '1859.00',
            description: 'Eletrolux Inverce',
            stock: 5
        }
    })
    const seedSix = await prisma.products.upsert({
        where: { id: 0},
        update: {},
        create: {
            name: 'Microondas Inox',
            price: '267.99',
            description: 'Panasonic Cinza anti-aderente',
            stock: 0
        }
    })
    const seedSeven = await prisma.user.upsert({
        where: { id: 0},
        update: {},
        create: {
            name: 'Jefferson',
            email: 'jefferson@teste.com',
            cpf: '88008555041',
            password: bcrypt.hashSync('554433', 10)
        }
    })
    const seedSeven_wallet = await prisma.wallet.upsert({
        where: { id: 0},
        update: {},
        create: {
            userId: seedSeven.id,
            balance: 0
        }
    })
    console.log({ seedOne, seedTwo, seedThree, seedFor, seedFive, seedSix, seedSeven, seedSeven_wallet})
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