

 export const getUser = async ({id,offset,limit}:{id:number,offset:number,limit:number}) => { 
    if(id){
        const res = await fetch(`/api/user?id=${id}`)
        return res.json()
    }
    if(limit && offset){
        const res = await fetch(`/api/user?limit=${limit}&offset=${offset}`)
        return res.json()
    }
 }

 export const createUser = async (data:any) => {
    const res = await fetch(`/api/user`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    return res.json()
 }

 export const updateUser = async (data:any) => {
    const res = await fetch(`/api/user`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
    return res.json()
 }

export const deleteUser = async (id:number) => {
    const res = await fetch(`/api/user`, {
        method: 'DELETE',
        body: JSON.stringify({id})
    })
    return res.json()
 }

