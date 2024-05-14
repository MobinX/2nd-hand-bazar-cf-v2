
let baseUrl = ""
let accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoibW9ub3NwYWNlLTJuZC1oYW5kLWJhemFyLWNmLXYyLTE3MTU2OTU5MDMzMjYuY2x1c3Rlci1td3Jna2JnZ3B2YnE2dHZ0dmlyYXcya25xZy5jbG91ZHdvcmtzdGF0aW9ucy5kZXYiLCJpYXQiOjE3MTU3MDA5MDQsImV4cCI6MTcxNTcwNDUwNH0.jR5Jcou6QTOZtbj9B996iyVqPSMDiR3uz-mzsJ1rXLEAjx6SAM5GitXrokxDlOuENP1pF0U-0h4ZjjIyVWUUWEe53NIT5ZBFeTK7-LGLYE6qXzMPU0d11KZlBYVuKY4IxxPLCFiDYfbAA4-qh0w2z3YLwmnhTFlY8FefrDZx2q11CcRcGrj71MbLc5UQSCWHu1Og46bqMj_xQ9j29e7nWG7w1gWaOyna1F9BwO160Z_YS8z2VyX8MdbT5NoUJZNPmEvvhVs3BHZRIzVDUlKf0eUjE5orgpUaQx5r7FmjZxitJ1WaU-nu1kO3MteoXkTMfFnpIgklse_eRZ_V-JZSBw"
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
        const res = await fetch(`${baseUrl}/api/category?id=${id}&includeSubcategories=${includeSubcategories}&byParentId=${byParentId}`, { next: { tags: ['category'] } })
        console.log("res", await res.text())
        return res.text()
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
    let l = await res.text()
    return l

}

export const createCategory = async (data: any) => {
    const res = await fetch(`${baseUrl}/api/category`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    return res.json()
}

export const updateCategory = async (data: any) => {
    const res = await fetch(`${baseUrl}/api/category`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
    return res.json()
}

export const deleteCategory = async (ids: number[], parentId: number | null = null) => {
    const res = await fetch(`${baseUrl}/api/category`, {
        method: 'DELETE',
        body: JSON.stringify({ ids: ids, parentId: parentId })
    })
    return res.json()
}

