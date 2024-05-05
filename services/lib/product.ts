
 import { Product } from '@prisma/client'
 export const fetchproduct = async ({id,offset,limit}:{id:number,offset:number,limit:number}) => { 
    if(id){
        const res = await fetch(`/api/product?id=${id}`)
        return res.json()
    }
    if(limit && offset){
        const res = await fetch(`/api/product?limit=${limit}&offset=${offset}`)
        return res.json()
    }
 }

 export const createproduct = async (data:Partial<Product>) => {
    const res = await fetch(`/api/product`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    return res.json()
 }

 export const updateproduct = async (data:Partial<Product>) => {
    const res = await fetch(`/api/product`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
    return res.json()
 }

export const deleteproduct = async (id:number) => {
    const res = await fetch(`/api/product`, {
        method: 'DELETE',
        body: JSON.stringify({id})
    })
    return res.json()
 }

