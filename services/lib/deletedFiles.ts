import { json } from "stream/consumers"

let baseUrl = ""
const env = process.env.NODE_ENV
if(env == "development"){
    // baseUrl = "https://supreme-guacamole-9jw5xgqgrqg3prx6-3000.app.github.dev"
    baseUrl = "https://3000-mobinx-2ndhandbazarcfv2-j0exmruus1i.ws-eu111.gitpod.io"

  }
  else if (env == "production"){
    baseUrl = "https://2nd-hand-bazar-cf-v2.vercel.app/"
  }
export const addInDeletedFiles = async (data:any) => {
    const res = await fetch(`${baseUrl}/api/deletedFiles`, {
        method: 'POST',
        body: data,
        next :{
            tags:["deletedFiles"]
        }
        
    })
   return res.json()
 }
