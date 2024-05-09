"use server"
import { deleteProduct } from "@/services/lib/product";
import { revalidatePath, revalidateTag } from "next/cache";

export async function del(ids: number[],parentId:number|null) {
    const res = await deleteProduct(ids)
    if (res) {
        //reload window
        revalidateTag('product')
        return true
    }
    
    return false
  }