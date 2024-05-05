
import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { getPrisma } from "@/configs/prisma"
import { Category } from '@prisma/client'
export const runtime = 'edge'

export async function GET(request: NextRequest) {
    const prisma = getPrisma()
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')
    if(id){
        const data = await prisma.category.findUnique({
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
    if(limit && offset){
        const data = await prisma.category.findMany({
            take: parseInt(limit),
            skip: parseInt(offset)
        })
        return new Response(JSON.stringify(data), {
            headers: {
                'content-type': 'application/json'
            }
        })
    }
    if(!limit && !offset && !id){
        //error
        return new Response('Error: limit and offset are required if you dont need specific id or provide id for specific one', {
            status: 400
        })
    }
    

    
}

export async function POST(request: NextRequest) {
    const prisma = getPrisma()
    const body: any = await request.json()
    const data = await prisma.category.create({
        data: body
    })
    if(data){
        return new Response(JSON.stringify(data), {
            headers: {
                'content-type': 'application/json'
            }
        })
    }
    else{
        return new Response('Error: Unable to create data', {
            status: 400
        })
    
    }


    
}

export async function PUT(request: NextRequest) {
    const prisma = getPrisma()
    const body: Partial<Category> = await request.json()
    const id = body.id
    const data = await prisma.category.update({
        where: {
            id: id
        },
        data: body
    })
    if(data){
        return new Response(JSON.stringify(data), {
            headers: {
                'content-type': 'application/json'
            }
        })
    }
    else{
        return new Response('Error: Unable to update data', {
            status: 400
        })
    
    }
    
}

export async function DELETE(request: NextRequest) {
    const prisma = getPrisma()
    const body: Partial<Category> = await request.json()
    const id = body.id
    const data = await prisma.category.delete({
        where: {
            id: id
        }
    })
    if(data){
        return new Response(JSON.stringify(data), {
            headers: {
                'content-type': 'application/json'
            }
        })
    }
    else{
        return new Response('Error: Unable to delete data', {
            status: 400
        })
    
    }
}

