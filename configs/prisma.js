import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

export const getPrisma = () => {
    
    const connectionString = `${process.env.DATABASE_URL}`
    
    const pool = new Pool({ connectionString })
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({ adapter })
    return prisma

}
