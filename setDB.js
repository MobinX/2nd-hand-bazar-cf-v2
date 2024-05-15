
/*
sub category id
{"4":412,"5":405,"6":413,"7":402,"8":404,"9":417,"17":403,"18":414,"19":408,"20":419,"21":406,"22":409,"23":407,"34":416,"35":411,"36":410,"38":418,"39":415}
*/
const fetch = require('node-fetch');

//import axios
const axios = require('axios');

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
const upCategory = () => {
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
    let l = category[0].data.filter(data => (parseInt(data.parent_id) === 0))
    let l1 = category[0].data.filter(data => !(parseInt(data.parent_id) === 0))

    let icons = iconstable[0].data
    // console.log(icons)
    let parentCategoryMap = JSON.parse('{"2":198,"10":203,"11":197,"12":196,"13":195,"14":201,"25":200,"33":202,"37":199}')
    // console.log(parentCategoryMap[2])
    let ids1 = {}
    let ids2 = {}

    l.map(async (d, i) => {
        // let iconurl = "https://2ndhandbajar.com/public/" + icons.find(icon => icon.id === d.icon).file_name
        // console.log(iconurl)
        let data = {
            prevId: parseInt(d.id),
            name: d.name,
            slug: d.slug,
            details: d.meta_description,
            type: "parent",
            showInHome: true,
            HomePageTitle: d.meta_title,
            // parentId: parentCategoryMap[parseInt(d.parent_id)]
        };
        // console.log(data)
        let res = await createCategory(data)
        // console.log(res)
        ids1[d.id.toString()] = res.id

        console.log(JSON.stringify(ids1))
    })
    console.log("l done")

    setTimeout(() => {
        l1.map(async (d, i) => {
            // let iconurl = "https://2ndhandbajar.com/public/" + icons.find(icon => icon.id === d.icon).file_name
            // console.log(iconurl)
            let data = {
                prevId: parseInt(d.id),
                name: d.name,
                slug: d.slug,
                details: d.meta_description,
                type: "parent",
                showInHome: true,
                HomePageTitle: d.meta_title,
                parentId: ids1[parseInt(d.parent_id)]
            };
            // console.log(data)
            let res = await createCategory(data)
            // console.log(res)
            ids2[d.id.toString()] = res.id

            console.log(JSON.stringify(ids2))
        })
    }, 6000);

}

const upProducts = () =>{


}
const uploadFile =async (file) => {
    const cloudName = "virsys";
    const unsignedUploadPreset = '2ndhandbazar';

    const url = `https://api.cloudinary.com/v1_1/${cloudName}//upload`;
    const fd = new FormData();
    fd.append('upload_preset', unsignedUploadPreset);
    // fd.append('tags', 'browser_upload'); // Optional - add tags for image admin in Cloudinary
    fd.append('file', file);

    try {
        // const response = await fetch(url, {
        //     method: 'POST',
        //     body: fd,
        // });
        const response = await axios.post(url, fd, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        const data = await response.data;
        console.log(response)
        // File uploaded successfully
        // const url = data.secure_url;
        // Create a thumbnail of the uploaded image, with 150px width
        // const tokens = url.split('/');
        // tokens.splice(-3, 0, 'w_150,c_scale');
        // const img = new Image();
        // img.src = tokens.join('/');
        // img.alt = data.public_id;
        return data.secure_url;
    } catch (error) {
        console.log(error)
        console.error('Error uploading the file:', error);
    }
}

uploadFile("https://2ndhandbajar.com/public/uploads/all/rxHBRkA5FimeN9ze4HqEP3wAp9Xtx7axw1PUBJmI.png").then((url) => {
    console.log(url)
})
