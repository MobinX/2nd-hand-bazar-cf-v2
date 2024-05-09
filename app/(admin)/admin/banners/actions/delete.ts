"use server"
import { deleteCategory } from "@/services/lib/category";
import { revalidatePath, revalidateTag } from "next/cache";

export async function del(ids: number[],parentId:number|null) {
    const res = await deleteCategory(ids,parentId)
    if (res) {
        //reload window
        revalidateTag('category')
        return true
    }
    
    return false
  }