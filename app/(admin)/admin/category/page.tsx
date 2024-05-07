import { getCategory } from '@/services/lib/category'
import { CategoryType } from '@/types'
import React from 'react'
import { Table } from './components/table'

export default async function Category() {

  const catagoryLabels = ["Name", "Slug", "Icon", "Details", "Type", "Show In Home", "Home Page Title"]
  const catagoryData: CategoryType[] = await getCategory({ offset: 0, limit: 10 })
  
  console.log(catagoryData)
  return (
    <div className='flex flex-col items-center w-full h-full px-6 md:px-10 py-14 bg-base-300'>
      <Table labels={catagoryLabels} datas={catagoryData}  />
    </div>

  )
}
