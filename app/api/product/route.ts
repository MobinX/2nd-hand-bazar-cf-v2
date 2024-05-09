import type { NextRequest } from 'next/server'
import { getPrisma } from "@/configs/prisma"
import { Product } from '@prisma/client'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
    try {
        const prisma = getPrisma()
        const searchParams = request.nextUrl.searchParams
        const id = searchParams.get('id')
        const limit = searchParams.get('limit')
        const offset = searchParams.get('offset')
        if (id) {
            const data = await prisma.product.findUnique({
                where: {
                    id: parseInt(id)
                },
                include:{
                    uploader:{
                        select:{
                            id:true,
                            image:true,
                            name:true
                        }
                    }
                }
                
            })
            return new Response(JSON.stringify(data), {
                headers: {
                    'content-type': 'application/json'
                }
            })
        }
  
            const data = await prisma.product.findMany({
                take: parseInt(limit ?? ""),
                skip: parseInt(offset ?? ''),
                include:{
                    uploader:{
                        select:{
                            id:true,
                            image:true,
                            name:true
                        }
                    }
                }
            })
            return new Response(JSON.stringify(data), {
                headers: {
                    'content-type': 'application/json'
                }
            })
        
        if (!limit && !offset && !id) {
            throw new Error('Error: limit and offset are required if you dont need specific id or provide id for specific one')
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Something went wrong' }), {
            status: 500,
            headers: {
                'content-type': 'application/json'
            }
        })
    }
}

export async function POST(request: NextRequest) {
    console.log('POST from product route')
    try {
        const prisma = getPrisma()
        const body: any = await request.json()
        const uploaderId = body.uploaderId
        const data = await prisma.product.create({
            data:{
                name: body.name,
                slug: body.slug,
                price: body.price,
                description: body.description,
                image: body.image,
                uploader:{
                    connect:{
                        id:uploaderId
                    }
                }
            }
        })
        console.log(data)
        if (data) {
            return new Response(JSON.stringify(data), {
                headers: {
                    'content-type': 'application/json'
                }
            })
        } else {
            throw new Error('Error: Unable to create data')
        }
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: 'Something went wrong' }), {
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
        const data = await prisma.product.update({
            where: {
                id: id
            },
            data: body
        })
        if (data) {
            return new Response(JSON.stringify(data), {
                headers: {
                    'content-type': 'application/json'
                }
            })
        } else {
            throw new Error('Error: Unable to update data')
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Something went wrong' }), {
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
        const ids = body.ids
        
        const data = await prisma.product.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })
        if (data) {
            return new Response(JSON.stringify(data), {
                headers: {
                    'content-type': 'application/json'
                }
            })
        } else {
            throw new Error('Error: Unable to delete data')
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Something went wrong' }), {
            status: 500,
            headers: {
                'content-type': 'application/json'
            }
        })
    }
}
