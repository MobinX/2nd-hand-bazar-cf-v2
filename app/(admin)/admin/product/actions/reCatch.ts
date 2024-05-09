"use server"

import { revalidatePath, revalidateTag } from "next/cache"

export async function reCatch() {
    console.log('reCatch')
    revalidateTag('product')
    revalidateTag("deletedFiles")
    return true
}