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
import { getPrisma } from "@/configs/prisma"

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
    const body: any = await request.json()
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
    const body: any = await request.json()
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
let baseUrl = ""
let accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoibW9ub3NwYWNlLTJuZC1oYW5kLWJhemFyLWNmLXYyLTE3MTU2OTU5MDMzMjYuY2x1c3Rlci1td3Jna2JnZ3B2YnE2dHZ0dmlyYXcya25xZy5jbG91ZHdvcmtzdGF0aW9ucy5kZXYiLCJpYXQiOjE3MTU3MDA5MDQsImV4cCI6MTcxNTcwNDUwNH0.jR5Jcou6QTOZtbj9B996iyVqPSMDiR3uz-mzsJ1rXLEAjx6SAM5GitXrokxDlOuENP1pF0U-0h4ZjjIyVWUUWEe53NIT5ZBFeTK7-LGLYE6qXzMPU0d11KZlBYVuKY4IxxPLCFiDYfbAA4-qh0w2z3YLwmnhTFlY8FefrDZx2q11CcRcGrj71MbLc5UQSCWHu1Og46bqMj_xQ9j29e7nWG7w1gWaOyna1F9BwO160Z_YS8z2VyX8MdbT5NoUJZNPmEvvhVs3BHZRIzVDUlKf0eUjE5orgpUaQx5r7FmjZxitJ1WaU-nu1kO3MteoXkTMfFnpIgklse_eRZ_V-JZSBw"
const env = process.env.NODE_ENV
if(env == "development"){
    baseUrl = "https://supreme-guacamole-9jw5xgqgrqg3prx6-3000.app.github.dev"
  }
  else if (env == "production"){
    baseUrl = "https://2nd-hand-bazar-cf-v2.vercel.app/"
  }
  

 export const get${capitalize(arg)} = async ({id,offset,limit}:{id:number,offset:number,limit:number}) => { 
    if(id){
        const res = await fetch(\`\${baseUrl}/api/${arg}?id=\${id}\`)
        return res.json()
    }
    if(limit && offset){
        const res = await fetch(\`\${baseUrl}/api/${arg}?limit=\${limit}&offset=\${offset}\`)
        return res.json()
    }
 }

 export const create${capitalize(arg)} = async (data:any) => {
    const res = await fetch(\`\${baseUrl}/api/${arg}\`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    return res.json()
 }

 export const update${capitalize(arg)} = async (data:any) => {
    const res = await fetch(\`\${baseUrl}/api/${arg}\`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
    return res.json()
 }

export const delete${capitalize(arg)} = async (id:number) => {
    const res = await fetch(\`\${baseUrl}/api/${arg}\`, {
        method: 'DELETE',
        body: JSON.stringify({id})
    })
    return res.json()
 }

`



args.forEach(async (arg) => {
    const fetchPath = path.join(process.cwd(), "services", "lib", `${arg}.ts`)
    fs.writeFileSync(fetchPath, fetchApi(arg), "utf-8")
    if (!fs.existsSync(apiPath)) {
        fs.mkdirSync(apiPath)
    }
    fs.writeFileSync(path.join(apiPath, `${arg}`, "route.ts"), nextApi(arg), "utf-8")
    console.log(`API ${arg} created`)
})