import type { NextRequest } from 'next/server'
import { getPrisma } from "@/configs/prisma"

export const runtime = 'edge'

export async function GET(request: NextRequest) {
    try {
        const prisma = getPrisma()
        const searchParams = request.nextUrl.searchParams
        const id = searchParams.get('id')
        const limit = searchParams.get('limit')
        const offset = searchParams.get('offset')
        if (id) {
            const data = await prisma.user.findUnique({
                where: {
                    id: parseInt(id)
                }
            })
            return new Response(JSON.stringify(data), {
                headers: {
                    'content-type': 'application/json'
                }
            })
        }
        if (limit && offset) {
            const data = await prisma.user.findMany({
                take: parseInt(limit),
                skip: parseInt(offset)
            })
            return new Response(JSON.stringify(data), {
                headers: {
                    'content-type': 'application/json'
                }
            })
        }
        if (!limit && !offset && !id) {
            throw new Error('Error: limit and offset are required if you dont need specific id or provide id for specific one')
        }
    } catch (error:any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'content-type': 'application/json'
            }
        })
    }
}

export async function POST(request: NextRequest) {
    try {
        const prisma = getPrisma()
        const body: any = await request.json()
        const data = await prisma.user.create({
            data: body
        })
        return new Response(JSON.stringify(data), {
            headers: {
                'content-type': 'application/json'
            }
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Unable to create data' }), {
            status: 500,
            headers: {
                'content-type': 'application/json'
            }
        })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const prisma = getPrisma()
        const body: any = await request.json()
        const id = body.id
        const data = await prisma.user.update({
            where: {
                id: id
            },
            data: body
        })
        return new Response(JSON.stringify(data), {
            headers: {
                'content-type': 'application/json'
            }
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Unable to update data' }), {
            status: 500,
            headers: {
                'content-type': 'application/json'
            }
        })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const prisma = getPrisma()
        const body: any = await request.json()
        const id = body.id
        const data = await prisma.user.delete({
            where: {
                id: id
            }
        })
        return new Response(JSON.stringify(data), {
            headers: {
                'content-type': 'application/json'
            }
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Unable to delete data' }), {
            status: 500,
            headers: {
                'content-type': 'application/json'
            }
        })
    }
}
