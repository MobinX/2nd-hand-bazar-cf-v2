import {Address, Cart,CartItem,Category,Education,Product,User} from "@prisma/client"

export interface CategoryType extends Partial<Category> {
    products?: number[]
    subCategoryIds?: number[]
    subCategories?: CategoryType[]
}

export interface ProductType extends Partial<Product> {
    category?: number[]
    categories?: CategoryType[]
    uploader?: UserType
}


export interface UserType extends Partial<User> {
    cart?: number[]
    address?: Address[]
    education?: Education[]
}

export interface CartType extends Partial<Cart> {
    product?: number[]
    cartItems?: CartItem[]
}