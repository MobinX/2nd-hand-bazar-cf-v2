

 export const getProduct = async ({id,offset,limit}:{id:number,offset:number,limit:number}) => { 
    if(id){
        const res = await fetch(`/api/product?id=${id}`)
        return res.json()
    }
    if(limit && offset){
        const res = await fetch(`/api/product?limit=${limit}&offset=${offset}`)
        return res.json()
    }
 }

 export const createProduct = async (data:any) => {
    const res = await fetch(`/api/product`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    return res.json()
 }

 export const updateProduct = async (data:any) => {
    const res = await fetch(`/api/product`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
    return res.json()
 }

export const deleteProduct = async (id:number) => {
    const res = await fetch(`/api/product`, {
        method: 'DELETE',
        body: JSON.stringify({id})
    })
    return res.json()
 }

