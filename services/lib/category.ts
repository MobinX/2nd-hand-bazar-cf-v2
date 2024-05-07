
let baseUrl = ""
const env = process.env.NODE_ENV
if(env == "development"){
    baseUrl = "https://supreme-guacamole-9jw5xgqgrqg3prx6-3000.app.github.dev"
  }
  else if (env == "production"){
    baseUrl = "https://2nd-hand-bazar-cf-v2.vercel.app/"
  }
  

 export const getCategory = async ({id,offset,limit}:{id?:number,offset?:number,limit?:number}) => { 
    if(id){
        const res = await fetch(`${baseUrl}/api/category?id=${id}`)

        return res.json()
    }
    
        const res = await fetch(`${baseUrl}/api/category?limit=${limit}&offset=${offset}`)
        console.log("res")

        return res.json()
    
 }

 export const createCategory = async (data:any) => {
    const res = await fetch(`${baseUrl}/api/category`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    return res.json()
 }

 export const updateCategory = async (data:any) => {
    const res = await fetch(`${baseUrl}/api/category`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
    return res.json()
 }

export const deleteCategory = async (id:number) => {
    const res = await fetch(`${baseUrl}/api/category`, {
        method: 'DELETE',
        body: JSON.stringify({id})
    })
    return res.json()
 }

