"use server"
import { createCategory } from "@/services/lib/category";
import { CategoryType } from "@/types";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function create(parentId:number|null,form: FormData) {
    let data:CategoryType ={
        name: form.get('name') as string,
        slug: form.get('slug') as string,
        icon: form.get('icon') as string,
        details: form.get('details') as string,
        type: form.get('type') as string,
        showInHome: form.get('showInHome') === 'on',
        HomePageTitle: form.get('homePageTitle') as string,
    
    }
    if(parentId) data["parentId"] = parentId;

    console.log(data)
    console.log(form)
    const res = await createCategory(data)
    if (res) {
        //reload window
        revalidateTag('category')

        redirect('/admin/category')
        return true
    }
    
    return false
  }
