import type { NextRequest } from 'next/server'
import { getPrisma } from "@/configs/prisma"

export const runtime = 'edge'
export async function POST(request: NextRequest) {
    console.log("running")
    try {
        const prisma = getPrisma()
        const body = await request.json()
        let data = await prisma.deletedFiles.create({
            data: body
        })
        console.log(data)
        console.log("============")
        return new Response(JSON.stringify(data), {
            headers: {
                'content-type': 'application/json'
            }
        })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: 'Unable to create data' }), {
            status: 500,
            headers: {
                'content-type': 'application/json'
            }
        })
    }
}