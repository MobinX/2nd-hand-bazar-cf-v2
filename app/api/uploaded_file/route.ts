import type { NextRequest } from 'next/server'
import { getPrisma } from "@/configs/prisma"
import { Product } from '@prisma/client'

export const runtime = 'edge'

export const creatUpload = async (url:string) => {
    try{
        const prisma = getPrisma()
        const data = await prisma.uploadedFiles.create({
            data:{
                url: url,                
            }
        })
        console.log(data)
        return data
    }catch(error){
        console.log(error)
        return null
    }
}

export const deleteUpload = async (url:string) => {
    try{
        const prisma = getPrisma()
        const data = await prisma.uploadedFiles.update({
            where:{
                url: url
            },
            data:{
                deleted: true
            }
        })
        console.log(data)
        return data
    }catch(error){
        console.log(error)
        return null
    }
}

export async function POST(request: NextRequest) {
    
    try {
        const prisma = getPrisma()
        const body: any = await request.json()
        const data = await prisma.uploadedFiles.create({
            data:{
                url: body.url,                
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