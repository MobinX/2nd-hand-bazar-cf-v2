import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'
import { getRequestContext } from '@cloudflare/next-on-pages'


export const getPrisma = () => {
    const adapter = new PrismaD1(getRequestContext().env.DB)
    const prisma = new PrismaClient({ adapter })
    return prisma

}