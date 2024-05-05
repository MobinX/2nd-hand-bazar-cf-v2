const fs = require("fs")
const path = require("path")
//get cmd args
const args = process.argv.slice(2)
//mix cwd with app/api in path
const apiPath = path.join(process.cwd(), "app", "api")


//func t make first letter capital
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

//next js api file 
const nextApi = arg => `
import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { getPrisma } from "@/configs/prisma"
import { ${capitalize(arg)} } from '@prisma/client'
export const runtime = 'edge'

export async function GET(request: NextRequest) {
    const prisma = getPrisma()
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')
    if(id){
        const data = await prisma.${arg}.findUnique({
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
        const data = await prisma.${arg}.findMany({
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
    const data = await prisma.${arg}.create({
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
    const body: Partial<${capitalize(arg)}> = await request.json()
    const id = body.id
    const data = await prisma.${arg}.update({
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
    const body: Partial<${capitalize(arg)}> = await request.json()
    const id = body.id
    const data = await prisma.${arg}.delete({
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

`

const fetchApi = arg => `
 import { ${capitalize(arg)} } from '@prisma/client'
 export const fetch${arg} = async ({id,offset,limit}:{id:number,offset:number,limit:number}) => { 
    if(id){
        const res = await fetch(\`/api/${arg}?id=\${id}\`)
        return res.json()
    }
    if(limit && offset){
        const res = await fetch(\`/api/${arg}?limit=\${limit}&offset=\${offset}\`)
        return res.json()
    }
 }

 export const create${arg} = async (data:Partial<${capitalize(arg)}>) => {
    const res = await fetch(\`/api/${arg}\`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    return res.json()
 }

 export const update${arg} = async (data:Partial<${capitalize(arg)}>) => {
    const res = await fetch(\`/api/${arg}\`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
    return res.json()
 }

export const delete${arg} = async (id:number) => {
    const res = await fetch(\`/api/${arg}\`, {
        method: 'DELETE',
        body: JSON.stringify({id})
    })
    return res.json()
 }

`



args.forEach(async (arg) => {
    const fetchPath = path.join(process.cwd(), "services", "lib" , `${arg}.ts`)
    fs.writeFileSync(fetchPath, fetchApi(arg), "utf-8")
    if(!fs.existsSync(apiPath)){
        fs.mkdirSync(apiPath)
    }
    fs.writeFileSync(path.join(apiPath, `${arg}` , "route.ts"), nextApi(arg), "utf-8")
    console.log(`API ${arg} created`)
})