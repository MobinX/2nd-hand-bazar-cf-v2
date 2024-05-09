"use server"

import { revalidatePath, revalidateTag } from "next/cache"

export async function reCatch() {
    console.log('reCatch')
    revalidateTag('category')
    revalidateTag("deletedFiles")
    return true
}