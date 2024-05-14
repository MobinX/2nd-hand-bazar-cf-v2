/*
parent category map
{"2":198,"10":203,"11":197,"12":196,"13":195,"14":201,"25":200,"33":202,"37":199}*/

/*
sub category id
{"4":129,"5":135,"6":126,"7":123,"8":134,"9":128,"17":137,"18":138,"19":140,"20":136,"21":139,"22":130,"23":133,"34":124,"35":132,"36":131,"38":125,"39":127}

*/

const fetch = require('node-fetch');

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'sql.json');
const json = fs.readFileSync(filePath, 'utf8');
const tables = JSON.parse(json)


let baseUrl = ""
let accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoibW9ub3NwYWNlLTJuZC1oYW5kLWJhemFyLWNmLXYyLTE3MTU2OTU5MDMzMjYuY2x1c3Rlci1td3Jna2JnZ3B2YnE2dHZ0dmlyYXcya25xZy5jbG91ZHdvcmtzdGF0aW9ucy5kZXYiLCJpYXQiOjE3MTU3MDA5MDQsImV4cCI6MTcxNTcwNDUwNH0.jR5Jcou6QTOZtbj9B996iyVqPSMDiR3uz-mzsJ1rXLEAjx6SAM5GitXrokxDlOuENP1pF0U-0h4ZjjIyVWUUWEe53NIT5ZBFeTK7-LGLYE6qXzMPU0d11KZlBYVuKY4IxxPLCFiDYfbAA4-qh0w2z3YLwmnhTFlY8FefrDZx2q11CcRcGrj71MbLc5UQSCWHu1Og46bqMj_xQ9j29e7nWG7w1gWaOyna1F9BwO160Z_YS8z2VyX8MdbT5NoUJZNPmEvvhVs3BHZRIzVDUlKf0eUjE5orgpUaQx5r7FmjZxitJ1WaU-nu1kO3MteoXkTMfFnpIgklse_eRZ_V-JZSBw"
const env = process.env.NODE_ENV
if (env == "development") {
    // baseUrl = "https://supreme-guacamole-9jw5xgqgrqg3prx6-3000.app.github.dev"
    //baseUrl = "https://3000-mobinx-2ndhandbazarcfv2-j0exmruus1i.ws-eu111.gitpod.io"  
    baseUrl = "https://3000-monospace-2nd-hand-bazar-cf-v2-1715695903326.cluster-mwrgkbggpvbq6tvtviraw2knqg.cloudworkstations.dev"
}
else if (env == "production") {
    baseUrl = "https://2nd-hand-bazar-cf-v2.verced.app/"
}
 const createCategory = async (data) => {
    const res = await fetch(`https://3000-monospace-2nd-hand-bazar-cf-v2-1715695903326.cluster-mwrgkbggpvbq6tvtviraw2knqg.cloudworkstations.dev/api/category`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }, 
        method: 'POST',
        body: JSON.stringify(data)
    })
    return res.json()
}

const category = tables.filter(table => table.name === 'categories')
const iconstable = tables.filter(table => table.name === 'uploads')

// console.log(category[0].data)
let l = category[0].data.filter(data => !(parseInt(data.parent_id) === 0))
let icons = iconstable[0].data
// console.log(icons)
let parentCategoryMap = JSON.parse('{"2":198,"10":203,"11":197,"12":196,"13":195,"14":201,"25":200,"33":202,"37":199}')
// console.log(parentCategoryMap[2])
let ids= {}
l.map(async (d,i)=>{
    // let iconurl = "https://2ndhandbajar.com/public/" + icons.find(icon => icon.id === d.icon).file_name
    // console.log(iconurl)
    let data = {
        prevId:parseInt(d.id),
        name: d.name,
        slug: d.slug,
        details: d.meta_description,
        type: "parent",
        showInHome: true,
        HomePageTitle:d.meta_title,
        parentId: parentCategoryMap[parseInt(d.parent_id)]
    };
    // console.log(data)
    let res = await createCategory(data)
    console.log(res)
    ids[d.id.toString()] = res.id
    
    console.log(JSON.stringify(ids))
})




// console.log(l)
