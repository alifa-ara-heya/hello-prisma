import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient()

async function main() {
    const result = await prisma.user.create({
        data: {
            name: 'Sheikh',
            email: 'taimiyah@prisma.io',

            posts: {
                create: { title: 'Hello World' },
            },
            profile: {
                create: { bio: 'I like turtles' },
            },
        }
    })

    console.log(result);
}

main()