import type { NextRequest } from 'next/server'
import { getPrisma } from "@/configs/prisma"
import { PrismaClient, Category } from '@prisma/client'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
    try {
        
        const prisma = getPrisma()
        const searchParams = request.nextUrl.searchParams
        const id = searchParams.get('id')
        const limit = searchParams.get('limit')
        const offset = searchParams.get('offset')
        const byParentId = searchParams.get('byParentId')
        const includeSubcategories: boolean = searchParams.get('includeSubcategories') ? true : false
        if (id) {
            //get specific category filter by id and parentid
            if (parseInt(byParentId ?? "") >= 0) {
                const data = await prisma.category.findUnique({
                    where: {
                        id: parseInt(id),
                        parentId: parseInt(byParentId ?? "")
                    },
                    include: {
                        subCategories: includeSubcategories
                    }
                })
                return new Response(JSON.stringify(data), {
                    headers: {
                        'content-type': 'application/json'
                    }
                })

            }

            const data = await prisma.category.findUnique({
                where: {
                    id: parseInt(id),
                    
                },
                include: {
                    subCategories: includeSubcategories
                }
            })
            console.log("data", data)
            return new Response(JSON.stringify(data), {
                headers: {
                    'content-type': 'application/json'
                }
            })
        }
        if (limit && offset) {
            if (parseInt(byParentId ?? "") >= 0) {
                //get by parent id
                const data = await prisma.category.findMany({
                    where: {
                        parentId: parseInt(byParentId ?? "")
                    },
                    take: parseInt(limit),
                    skip: parseInt(offset)
                })
                return new Response(JSON.stringify(data), {
                    headers: {
                        'content-type': 'application/json'
                    }
                })
            }
            const data = await prisma.category.findMany({
                where: {
                    parentId: null
                },

                take: parseInt(limit),
                skip: parseInt(offset)
            })
            console.log("ddd", data)
            return new Response(JSON.stringify(data), {
                headers: {
                    'content-type': 'application/json'
                }
            })
        }
        if (!limit && !offset && !id) {
            //error
            return new Response(JSON.stringify({ error: 'Error: limit and offset are required if you dont need specific id or provide id for specific one' }), {
                status: 400,
                headers: {
                    'content-type': 'application/json'
                }
            })
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
    try {
        const prisma = getPrisma()
        const body = await request.json()
        let data: Category | null = null
        if (body.parentId) {
            console.log("subcategory creating ..........")
            data = await prisma.category.create({
                data: body as Category
            })
            let parentData = await prisma.category.update({
                where: {
                    id: body.parentId
                },
                data: {
                    subCategories: {
                        connect: {
                            id: data.id
                        }
                    },
                },
                include: {
                    subCategories: true
                }
            })
            if (data && parentData) {
                return new Response(JSON.stringify(data), {
                    headers: {
                        'content-type': 'application/json'
                    }
                })
            }
            else {

                return new Response(JSON.stringify({ error: 'Error: Unable to create data' }), {
                    status: 400,
                    headers: {
                        'content-type': 'application/json'
                    }
                })

            }
        }
        else {
            data = await prisma.category.create({ data: body as Category })
            if (data) {
                return new Response(JSON.stringify(data), {
                    headers: {
                        'content-type': 'application/json'
                    }
                })
            }
            else {
                return new Response(JSON.stringify({ error: 'Error: Unable to create data' }), {
                    status: 400,
                    headers: {
                        'content-type': 'application/json'
                    }
                })

            }
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
        const body: Partial<Category> = await request.json()
        const id = body.id
        const data = await prisma.category.update({
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
        }
        else {
            return new Response(JSON.stringify({ error: 'Error: Unable to update data' }), {
                status: 400,
                headers: {
                    'content-type': 'application/json'
                }
            })

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

export async function DELETE(request: NextRequest) {
    try {
        const prisma = getPrisma()
        const body = await request.json()
        const ids:number[] = body.ids
        //delete multiple
        if (ids) {
            let data2 = await prisma.category.deleteMany({
                where: {
                    parentId: {
                        in: ids
                    }
                }
            })
            const data = await prisma.category.deleteMany({
                where: {
                    id: {
                        in: ids
                    }
                }
            })
            //also delete those which has parentid in ids
            
            if (data && data2) {
                if (body.parentId != null) {
                    let parentData = await prisma.category.update({
                        where: {
                            id: body.parentId
                        },
                        data: {
                            subCategories: {
                                disconnect: {
                                    id: ids[0]
                                }
                            },
                        }
                    })
                    return new Response(JSON.stringify(data), {
                        headers: {
                            'content-type': 'application/json'
                        }
                    })

                }
                console.log("deleted", data)
                return new Response(JSON.stringify(data), {
                    headers: {
                        'content-type': 'application/json'
                    }
                })
            }
            else {
                return new Response(JSON.stringify({ error: 'Error: Unable to delete data' }), {
                    status: 400
                })

            }
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
