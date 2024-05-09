"use server"
import { createCategory } from "@/services/lib/category";
import { uploadFile } from "@/services/uploadFile";
import { CategoryType } from "@/types";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";


export async function create(prevState: any, form: FormData) {
    let hasError = false
    try {
        let iconUrl = await uploadFile(form.get('icon') as File);
        let parentId = parseInt(form.get("parentId") as string);
        console.log(iconUrl);
        let data: CategoryType = {
            name: form.get('name') as string,
            slug: form.get('slug') as string,
            icon: iconUrl,
            details: form.get('details') as string,
            type: form.get('type') as string,
            showInHome: form.get('showInHome') === 'on',
            HomePageTitle: form.get('homePageTitle') as string,
        };
        if (parentId >= 0) data["parentId"] = parentId;

        const res = await createCategory(data);
        if (res) {
            // Reload window
            revalidateTag('category');

       
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

       if(!hasError) redirect('/admin/category');
    }


}
