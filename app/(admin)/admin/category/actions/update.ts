"use server"
import { createCategory, updateCategory } from "@/services/lib/category";
import { CategoryType } from "@/types";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function update(id:number,form: FormData) {
    const data:CategoryType ={
        id: id,
        name: form.get('name') as string,
        slug: form.get('slug') as string,
        icon: form.get('icon') as string,
        details: form.get('details') as string,
        type: form.get('type') as string,
        showInHome: form.get('showInHome') === 'on',
        HomePageTitle: form.get('homePageTitle') as string,
    
    }
    console.log(data)
    console.log(form)
    const res = await updateCategory(data)
    if (res) {
        //reload window
        revalidateTag('category')
        redirect('/admin/category')
        return true
    }
    
    return false
  }
