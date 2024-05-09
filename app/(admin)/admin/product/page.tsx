import { getProduct } from '@/services/lib/product'
import { ProductType } from '@/types'
import React from 'react'
import { Table } from './components/table'
// export const dynamic = 'force-dynamic'

export default async function Product() {

  const productLabels = ["Name", "Slug", "image", "Description", "Price" , "Uploader"]
  const productData: ProductType[] = await getProduct({ offset: 0, limit: 10 })

  console.log(productData)
  return (
    <div className='flex flex-col items-center w-full h-full p-6 md:px-10  bg-base-300'>
      <div className='flex flex-row justify-between items-center px-2 w-full mb-6'>
        <h3 className='text-2xl font-bold'>Product</h3>
      </div>
      <Table labels={productLabels} datas={productData} />
    </div>

  )
}
