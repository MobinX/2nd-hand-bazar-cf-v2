"use server"
import { createProduct } from "@/services/lib/product";
import { uploadFile } from "@/services/uploadFile";
import { ProductType } from "@/types";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";


export async function create(prevState: any, form: FormData) {
    let hasError = false
    try {
        let iconUrl = await uploadFile(form.get('image') as File);
    
        console.log(iconUrl);
        let data: ProductType = {
            name: form.get('name') as string,
            slug: form.get('slug') as string,
            image: iconUrl,
            description: form.get('description') as string,
            price: parseFloat(form.get("price") as string),
            uploaderId: parseInt(form.get("uploaderId") as string),
           
        };
        

        const res = await createProduct(data);
        if (res) {
            // Reload window
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
