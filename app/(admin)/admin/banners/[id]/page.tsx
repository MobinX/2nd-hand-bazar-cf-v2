import React from 'react'
import Form from '../components/form'
import { getCategory } from '@/services/lib/category'
import { CategoryType } from '@/types'
import { Table } from '../components/table'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'


export default async function EditCategory({ params }: { params: { id: number } }) {
  const catagoryLabels = ["Name", "Slug", "Icon", "Details", "Type", "Show In Home", "Home Page Title"]
    const categoryData:CategoryType = await getCategory({id:params.id,includeSubcategories:true})
    if(!categoryData){
      redirect("/admin/category")
    }
    console.log(categoryData)
  return (
    <div className='flex flex-col items-center w-full h-full p-6 md:px-10  bg-base-300'>
      <div className='flex flex-row justify-between items-center px-2 w-full mb-6'>
        <h3 className='text-2xl font-bold'>Edit Category {categoryData.name}</h3>
      </div>
      <Form isNew={false} datas={categoryData} /> 
      <div className='flex flex-row justify-between items-center px-2 w-full mb-6'>
        <h3 className='text-2xl font-bold'>Sub Categories</h3>
      </div>
      <Table labels={catagoryLabels} datas={categoryData?.subCategories ?? []} parentCategory={{id:categoryData.id ?? 0, name:categoryData.name ?? ""}} />
      </div>
  )
}
