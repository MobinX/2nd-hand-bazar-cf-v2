"use server"
import { createUser } from "@/services/lib/user";
import { uploadFile } from "@/services/uploadFile";
import { UserType } from "@/types";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";


export async function create(prevState: any, form: FormData) {
    let hasError = false
    try {
        let imageUrl = await uploadFile(form.get('image') as File);
        let parentId = parseInt(form.get("parentId") as string);
        console.log(imageUrl);
        let data: UserType = {
            name: form.get('name') as string,
            email: form.get('email') as string,
            password: form.get('password') as string,
            role: form.get('role') as string,
            provider: form.get('provider') as string,
            image: imageUrl,
            phone:form.get('phone') as string,
            
        };
        


        const res = await createUser(data);
        if (res) {
            // Reload window
            revalidateTag('user');

       
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

       if(!hasError) redirect('/admin/user');
    }


}
