
let baseUrl = ""
const env = process.env.NODE_ENV
if(env == "development"){
    baseUrl = "https://supreme-guacamole-9jw5xgqgrqg3prx6-3000.app.github.dev"
  }
  else if (env == "production"){
    baseUrl = "https://2nd-hand-bazar-cf-v2.vercel.app/"
  }
  

 export const getUser = async ({id,offset,limit}:{id:number,offset:number,limit:number}) => { 
    if(id){
        const res = await fetch(`${baseUrl}/api/user?id=${id}`)
        return res.json()
    }
    if(limit && offset){
        const res = await fetch(`${baseUrl}/api/user?limit=${limit}&offset=${offset}`)
        return res.json()
    }
 }

 export const createUser = async (data:any) => {
    const res = await fetch(`${baseUrl}/api/user`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    return res.json()
 }

 export const updateUser = async (data:any) => {
    const res = await fetch(`${baseUrl}/api/user`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
    return res.json()
 }

export const deleteUser = async (id:number) => {
    const res = await fetch(`${baseUrl}/api/user`, {
        method: 'DELETE',
        body: JSON.stringify({id})
    })
    return res.json()
 }

