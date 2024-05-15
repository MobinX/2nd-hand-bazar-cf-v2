
let baseUrl = ""
let accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoibW9ub3NwYWNlLTJuZC1oYW5kLWJhemFyLWNmLXYyLTE3MTU2OTU5MDMzMjYuY2x1c3Rlci1td3Jna2JnZ3B2YnE2dHZ0dmlyYXcya25xZy5jbG91ZHdvcmtzdGF0aW9ucy5kZXYiLCJpYXQiOjE3MTU3NzkzNDcsImV4cCI6MTcxNTc4Mjk0N30.S7fLt-FAYJI7eVoa6NEtgo_jgTM-bSTqxjUClOIrMR-T2650mVVr3DxK6A874eqUkG8il4Vdnim7Ep-7dEN7FhNjyFWdkkvNogsek3JdMrmDXY_OPHPOjj-Db6Z_Y91ezeTflr-gfC73-trOyt2TZAsad1RA4hMnoOu2cbo-sm4Jw5benyytHcvoUXTFs1LLZHiOlaSIsI5nyrN4WE1LgWYxSu9hnPVAGihmboBtsTWa_SPyrHug9BawTlrd1tGFiVJ8Yt5CExnPCSgpiLzFSwxVMytwXH2Z1VpeWYpQIx2FlVXGgjFmZYnq39VQ9OzjZBB1Ad5JHWnK-GPalapK2w"
const env = process.env.NODE_ENV
if(env == "development"){
    // baseUrl = "https://supreme-guacamole-9jw5xgqgrqg3prx6-3000.app.github.dev"
    //baseUrl = "https://3000-mobinx-2ndhandbazarcfv2-j0exmruus1i.ws-eu111.gitpod.io"  baseUrl = "https://3000-monospace-2nd-hand-bazar-cf-v2-1715695903326.cluster-mwrgkbggpvbq6tvtviraw2knqg.cloudworkstations.dev"
  }
  else if (env == "production"){
    baseUrl = "https://2nd-hand-bazar-cf-v2.vercel.app/"
  }
  

 export const getCart = async ({id,offset,limit}:{id:number,offset:number,limit:number}) => { 
    if(id){
        const res = await fetch(`${baseUrl}/api/cart?id=${id}`)
        return res.json()
    }
    if(limit && offset){
        const res = await fetch(`${baseUrl}/api/cart?limit=${limit}&offset=${offset}`)
        return res.json()
    }
 }

 export const createCart = async (data:any) => {
    const res = await fetch(`${baseUrl}/api/cart`, {
         headers: {
            Authorization: `Bearer ${accessToken}`,
        }, 
        method: 'POST',
        body: JSON.stringify(data)
    })
    return res.json()
 }

 export const updateCart = async (data:any) => {
    const res = await fetch(`${baseUrl}/api/cart`, {
         headers: {
            Authorization: `Bearer ${accessToken}`,
        }, 
        method: 'PUT',
        body: JSON.stringify(data)
    })
    return res.json()
 }

export const deleteCart = async (id:number) => {
    const res = await fetch(`${baseUrl}/api/cart`, {
         headers: {
            Authorization: `Bearer ${accessToken}`,
        }, 
        method: 'DELETE',
        body: JSON.stringify({id})
    })
    return res.json()
 }

