

 export const getCategory = async ({id,offset,limit}:{id:number,offset:number,limit:number}) => { 
    if(id){
        const res = await fetch(`/api/category?id=${id}`)
        return res.json()
    }
    if(limit && offset){
        const res = await fetch(`/api/category?limit=${limit}&offset=${offset}`)
        return res.json()
    }
 }

 export const createCategory = async (data:any) => {
    const res = await fetch(`/api/category`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    return res.json()
 }

 export const updateCategory = async (data:any) => {
    const res = await fetch(`/api/category`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
    return res.json()
 }

export const deleteCategory = async (id:number) => {
    const res = await fetch(`/api/category`, {
        method: 'DELETE',
        body: JSON.stringify({id})
    })
    return res.json()
 }

