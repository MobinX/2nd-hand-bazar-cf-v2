
 import { User } from '@prisma/client'
 export const fetchuser = async ({id,offset,limit}:{id:number,offset:number,limit:number}) => { 
    if(id){
        const res = await fetch(`/api/user?id=${id}`)
        return res.json()
    }
    if(limit && offset){
        const res = await fetch(`/api/user?limit=${limit}&offset=${offset}`)
        return res.json()
    }
 }

 export const createuser = async (data:Partial<User>) => {
    const res = await fetch(`/api/user`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    return res.json()
 }

 export const updateuser = async (data:Partial<User>) => {
    const res = await fetch(`/api/user`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
    return res.json()
 }

export const deleteuser = async (id:number) => {
    const res = await fetch(`/api/user`, {
        method: 'DELETE',
        body: JSON.stringify({id})
    })
    return res.json()
 }

