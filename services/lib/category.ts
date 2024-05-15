
let baseUrl = ""
let accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoibW9ub3NwYWNlLTJuZC1oYW5kLWJhemFyLWNmLXYyLTE3MTU2OTU5MDMzMjYuY2x1c3Rlci1td3Jna2JnZ3B2YnE2dHZ0dmlyYXcya25xZy5jbG91ZHdvcmtzdGF0aW9ucy5kZXYiLCJpYXQiOjE3MTU3NzkzNDcsImV4cCI6MTcxNTc4Mjk0N30.S7fLt-FAYJI7eVoa6NEtgo_jgTM-bSTqxjUClOIrMR-T2650mVVr3DxK6A874eqUkG8il4Vdnim7Ep-7dEN7FhNjyFWdkkvNogsek3JdMrmDXY_OPHPOjj-Db6Z_Y91ezeTflr-gfC73-trOyt2TZAsad1RA4hMnoOu2cbo-sm4Jw5benyytHcvoUXTFs1LLZHiOlaSIsI5nyrN4WE1LgWYxSu9hnPVAGihmboBtsTWa_SPyrHug9BawTlrd1tGFiVJ8Yt5CExnPCSgpiLzFSwxVMytwXH2Z1VpeWYpQIx2FlVXGgjFmZYnq39VQ9OzjZBB1Ad5JHWnK-GPalapK2w"
const env = process.env.NODE_ENV
if (env == "development") {
    // baseUrl = "https://supreme-guacamole-9jw5xgqgrqg3prx6-3000.app.github.dev"
    //baseUrl = "https://3000-mobinx-2ndhandbazarcfv2-j0exmruus1i.ws-eu111.gitpod.io"  
    baseUrl = "https://3000-monospace-2nd-hand-bazar-cf-v2-1715695903326.cluster-mwrgkbggpvbq6tvtviraw2knqg.cloudworkstations.dev"
}
else if (env == "production") {
    baseUrl = "https://2nd-hand-bazar-cf-v2.vercel.app/"
}


export const getCategory = async ({ id, offset, limit, includeSubcategories = false, byParentId = null }: { id?: number, offset?: number, limit?: number, includeSubcategories?: boolean, byParentId?: number | null }) => {
    if (id) {
        const res = await fetch(`${baseUrl}/api/category?id=${id}&includeSubcategories=${includeSubcategories}&byParentId=${byParentId}`, { headers: {
            Authorization: `Bearer ${accessToken}`,
        },  
        // credentials: 'include', 
        next: { tags: ['category'] } })
        return res.json()
    }

    const res = await fetch(`${baseUrl}/api/category?limit=${limit}&offset=${offset}&includeSubcategories=${includeSubcategories}&byParentId=${byParentId}`, {
       headers: {
            Authorization: `Bearer ${accessToken}`,
        },  
        // credentials: 'include', 
        next: { tags: ['category'],
      
     }
    })
    console.log("res")
    // console.log("res",await res.text())
    
    return res.json()

}

export const createCategory = async (data: any) => {
    const res = await fetch(`${baseUrl}/api/category`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }, 
        method: 'POST',
        body: JSON.stringify(data)
    })
    return res.json()
}

export const updateCategory = async (data: any) => {
    const res = await fetch(`${baseUrl}/api/category`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }, 
        method: 'PUT',
        body: JSON.stringify(data)
    })
    return res.json()
}

export const deleteCategory = async (ids: number[], parentId: number | null = null) => {
    const res = await fetch(`${baseUrl}/api/category`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }, 
        method: 'DELETE',
        body: JSON.stringify({ ids: ids, parentId: parentId })
    })
    return res.json()
}

