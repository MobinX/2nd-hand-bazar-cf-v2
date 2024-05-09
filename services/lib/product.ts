
let baseUrl = ""
const env = process.env.NODE_ENV
if(env == "development"){
    // baseUrl = "https://supreme-guacamole-9jw5xgqgrqg3prx6-3000.app.github.dev"
    baseUrl = "https://3000-mobinx-2ndhandbazarcfv2-j0exmruus1i.ws-eu111.gitpod.io"
  }
  else if (env == "production"){
    baseUrl = "https://2nd-hand-bazar-cf-v2.vercel.app/"
  }
  

 export const getProduct = async ({id,offset,limit}:{id?:number,offset?:number,limit?:number}) => { 
    console.log("product")
    if(id){
        const res = await fetch(`${baseUrl}/api/product?id=${id}`,{next:{tags:["product"]}})
        return res.json()
    }

       
        const res = await fetch(`${baseUrl}/api/product?limit=${limit}&offset=${offset}`,{next:{tags:["product"]}})
        console.log(res.status)
        return res.json()
    
 }

 export const createProduct = async (data:any) => {
    const res = await fetch(`${baseUrl}/api/product`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    return res.json()
 }

 export const updateProduct = async (data:any) => {
    const res = await fetch(`${baseUrl}/api/product`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
    return res.json()
 }

export const deleteProduct = async (ids:number[]) => {
    const res = await fetch(`${baseUrl}/api/product`, {
        method: 'DELETE',
        body: JSON.stringify({ids:ids})
    })
    return res.json()
 }

