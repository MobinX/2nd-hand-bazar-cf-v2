"use server"

import { revalidatePath } from "next/cache"

export async function reCatch() {
    console.log('reCatch')
    revalidatePath('/admin/category')
    return true
}