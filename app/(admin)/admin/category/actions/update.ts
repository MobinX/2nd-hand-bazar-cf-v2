"use server"
import { createCategory, updateCategory } from "@/services/lib/category";
import { addInDeletedFiles } from "@/services/lib/deletedFiles";
import { uploadFile } from "@/services/uploadFile";
import { CategoryType } from "@/types";
import { DeletedFiles } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";



export async function update(prevSate: any, form: FormData) {
    let hasError = false
    try {
        let iconUrl = await uploadFile(form.get('icon') as File);
        console.log("pr", parseInt(form.get("parentId") as string));
        console.log(iconUrl);
        let data: CategoryType = {
            id: parseInt(form.get("id") as string),
            name: form.get('name') as string,
            slug: form.get('slug') as string,
            icon: iconUrl,
            details: form.get('details') as string,
            type: form.get('type') as string,
            showInHome: form.get('showInHome') === 'on',
            HomePageTitle: form.get('homePageTitle') as string,
        };
        if (iconUrl) {

            console.log(form.get("icon"))
            let dle: Partial<DeletedFiles> = {
                name: form.get("prevIcon") as string
            }
            console.log(JSON.stringify(dle))
            // const dlres = await addInDeletedFiles(JSON.stringify(dle))
        }
        //adding in deleted files list so then we delete them from cloudinary
        const res = await updateCategory(data);
        if (res) {
            //reload window
            revalidateTag('category');

            return {
                type: "success",
                msg: "done"
            };
        }
    } catch (error) {
        hasError = true
        console.error(error);
        return {
            type: "error",
            msg: "Something went wrong"
        };
    }
    finally {

        if (!hasError) redirect('/admin/category');
    }


}
