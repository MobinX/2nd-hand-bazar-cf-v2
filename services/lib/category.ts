
let baseUrl = ""
const env = process.env.NODE_ENV
if(env == "development"){
    // baseUrl = "https://supreme-guacamole-9jw5xgqgrqg3prx6-3000.app.github.dev"
    baseUrl = "https://3000-mobinx-2ndhandbazarcfv2-j0exmruus1i.ws-us110.gitpod.io"
  }
  else if (env == "production"){
    baseUrl = "https://2nd-hand-bazar-cf-v2.vercel.app/"
  }
  

 export const getCategory = async ({id,offset,limit}:{id?:number,offset?:number,limit?:number}) => { 
    if(id){
        const res = await fetch(`${baseUrl}/api/category?id=${id}`,{
        })

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

export const deleteCategory = async (ids:number[]) => {
    const res = await fetch(`${baseUrl}/api/category`, {
        method: 'DELETE',
        body: JSON.stringify({ids:ids})
    })
    return res.json()
 }

