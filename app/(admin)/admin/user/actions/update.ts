"use server"
import { createUser, updateUser } from "@/services/lib/user";
import { addInDeletedFiles } from "@/services/lib/deletedFiles";
import { uploadFile } from "@/services/uploadFile";
import { UserType } from "@/types";
import { DeletedFiles } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";



export async function update(prevSate: any, form: FormData) {
    let hasError = false
    try {
        let imageUrl = await uploadFile(form.get('image') as File);
        console.log("pr", parseInt(form.get("parentId") as string));
        console.log(imageUrl);
        let data: UserType = {
            id: parseInt(form.get("id") as string),
            name: form.get('name') as string,
            email: form.get('email') as string,
            password: form.get('password') as string,
            role: form.get('role') as string,
            provider: form.get('provider') as string,
            image: imageUrl,
            phone: form.get('phone') as string,

        };
        if (imageUrl) {

            console.log(form.get("image"))
            let dle: Partial<DeletedFiles> = {
                name: form.get("previmage") as string
            }
            console.log(JSON.stringify(dle))
            const dlres = await addInDeletedFiles(JSON.stringify(dle))
        } //adding in deleted files list so then we delete them from cloudinary
        const res = await updateUser(data);
        if (res) {
            //reload window
            revalidateTag('user');

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

        if (!hasError) redirect('/admin/user');
    }


}
