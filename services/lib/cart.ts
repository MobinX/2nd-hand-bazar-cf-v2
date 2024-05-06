

 export const getCart = async ({id,offset,limit}:{id:number,offset:number,limit:number}) => { 
    if(id){
        const res = await fetch(`/api/cart?id=${id}`)
        return res.json()
    }
    if(limit && offset){
        const res = await fetch(`/api/cart?limit=${limit}&offset=${offset}`)
        return res.json()
    }
 }

 export const createCart = async (data:any) => {
    const res = await fetch(`/api/cart`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    return res.json()
 }

 export const updateCart = async (data:any) => {
    const res = await fetch(`/api/cart`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
    return res.json()
 }

export const deleteCart = async (id:number) => {
    const res = await fetch(`/api/cart`, {
        method: 'DELETE',
        body: JSON.stringify({id})
    })
    return res.json()
 }

