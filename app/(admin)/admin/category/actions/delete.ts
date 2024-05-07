"use server"
import { deleteCategory } from "@/services/lib/category";
import { revalidatePath } from "next/cache";

export async function del(ids: number[]) {
    const res = await deleteCategory(ids)
    if (res) {
        //reload window
        revalidatePath('/admin/category')
        return true
    }
    
    return false
  }