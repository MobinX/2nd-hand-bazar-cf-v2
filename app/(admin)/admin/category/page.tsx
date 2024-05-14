import { getCategory } from '@/services/lib/category'
import { CategoryType } from '@/types'
import React from 'react'
import { Table } from './components/table'
export const dynamic = 'force-dynamic'

export default async function Category() {

  const catagoryLabels = ["Name", "Slug", "Icon", "Details", "Type", "Show In Home", "Home Page Title"]
  const catagoryData: CategoryType[] = await getCategory({ offset: 0, limit: 100 })

  // console.log(catagoryData)
  return (
    <div className='flex flex-col items-center w-full h-full p-6 md:px-10  bg-base-300'>
      <div className='flex flex-row justify-between items-center px-2 w-full mb-6'>
        <h3 className='text-2xl font-bold'>Category</h3>
      </div>
      <Table labels={catagoryLabels} datas={catagoryData} />
    </div>

  )
}
