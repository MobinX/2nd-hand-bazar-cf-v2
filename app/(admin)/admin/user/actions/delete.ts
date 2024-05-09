"use server"
import { addInDeletedFiles } from "@/services/lib/deletedFiles";
import { deleteUser } from "@/services/lib/user";
import { DeletedFiles } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";

export async function del(ids: number[],imageUrl:null|string=null) {
    const res = await deleteUser(ids)
    if (imageUrl) {

       
        let dle: Partial<DeletedFiles> = {
            name: imageUrl as string
        }
        const dlres = await addInDeletedFiles(JSON.stringify(dle))
    }
    if (res) {
        //reload window
        revalidateTag('user')
        return true
    }
    
    return false
  }