import React from 'react'
import Form from '../components/form'
import { getProduct } from '@/services/lib/product'
import { ProductType } from '@/types'
import { Table } from '../components/table'
import { redirect } from 'next/navigation'
import { getUser } from '@/services/lib/user'

export const dynamic = 'force-dynamic'


export default async function EditProduct({ params }: { params: { id: number } }) {
  const productLabels = ["Name", "Slug", "Icon", "Details", "Type", "Show In Home", "Home Page Title"]
    const productData:ProductType = await getProduct({id:params.id})
    if(!productData){
      redirect("/admin/product")
    }
    console.log(productData)
    const users = await getUser({limit:25,offset:0})
  return (
    <div className='flex flex-col items-center w-full h-full p-6 md:px-10  bg-base-300'>
      <div className='flex flex-row justify-between items-center px-2 w-full mb-6'>
        <h3 className='text-2xl font-bold'>Edit Product {productData.name}</h3>
      </div>
      <Form isNew={false} datas={productData} user={users} /> 
      <div className='flex flex-row justify-between items-center px-2 w-full mb-6'>
        <h3 className='text-2xl font-bold'>Sub Categories</h3>
      </div>
      {/* <Table labels={productLabels} datas={productData?.categories ?? []} parentProduct={{id:productData.id ?? 0, name:productData.name ?? ""}} /> */}
      </div>
  )
}
