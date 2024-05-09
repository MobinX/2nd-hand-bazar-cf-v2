"use server"
import { createProduct, updateProduct } from "@/services/lib/product";
import { addInDeletedFiles } from "@/services/lib/deletedFiles";
import { uploadFile } from "@/services/uploadFile";
import { ProductType } from "@/types";
import { DeletedFiles } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";



export async function update(prevSate: any, form: FormData) {
    let hasError = false
    try {
        let iconUrl = await uploadFile(form.get('image') as File);
        
        console.log("pr", parseInt(form.get("parentId") as string));
        console.log(iconUrl);
        let data: ProductType = {
            name: form.get('name') as string,
            slug: form.get('slug') as string,
            image: iconUrl,
            description: form.get('description') as string,
            price: parseFloat(form.get("price") as string),
        };
        if(iconUrl){

        console.log(form.get("icon"))
        let dle:Partial<DeletedFiles> = {
            name: form.get("prevIcon") as string
        }
        console.log(JSON.stringify(dle))
        const dlres = await addInDeletedFiles(JSON.stringify(dle))
     } //adding in deleted files list so then we delete them from cloudinary
        const res = await updateProduct(data);
        if (res) {
            //reload window
            revalidateTag('product');
            
            return {
                type:"success",
                msg: "done"
            };
        }
    } catch (error) {
        hasError = true
        console.error(error);
        return {
            type:"error",
            msg: "Something went wrong"
        };
    }
    finally{

        if(!hasError) redirect('/admin/product');
     }


}
