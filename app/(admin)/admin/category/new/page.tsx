import React from 'react'
import Form from '../components/form'
import { headers } from 'next/headers'

export default function NewCategory() {
  const url = new URL(headers().get('x-url') ?? "")
  const parentId = parseInt(url.searchParams.get('parentId') ?? "")
  const parentName = url.searchParams.get('parentName')

  return (

    <div className='flex flex-col items-center w-full h-full p-6 md:px-10  bg-base-300'>
      <div className='flex flex-row justify-between items-center px-2 w-full mb-6'>
        <h3 className='text-2xl font-bold'> {parentId ? `New SubCategory For ${parentName}` : "New Category"}</h3>
      </div>
      <Form parentId={parentId}/>
      </div>
  )
}
