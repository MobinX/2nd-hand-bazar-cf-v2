
 import { Category } from '@prisma/client'
 export const fetchcategory = async ({id,offset,limit}:{id:number,offset:number,limit:number}) => { 
    if(id){
        const res = await fetch(`/api/category?id=${id}`)
        return res.json()
    }
    if(limit && offset){
        const res = await fetch(`/api/category?limit=${limit}&offset=${offset}`)
        return res.json()
    }
 }

 export const createcategory = async (data:Partial<Category>) => {
    const res = await fetch(`/api/category`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    return res.json()
 }

 export const updatecategory = async (data:Partial<Category>) => {
    const res = await fetch(`/api/category`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
    return res.json()
 }

export const deletecategory = async (id:number) => {
    const res = await fetch(`/api/category`, {
        method: 'DELETE',
        body: JSON.stringify({id})
    })
    return res.json()
 }

