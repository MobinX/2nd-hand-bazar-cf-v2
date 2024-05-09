import React from 'react'
import Form from '../components/form'
import { headers } from 'next/headers'
import { getUser } from '@/services/lib/user'

export default async function NewProduct() {
  let hUrl = headers().get('x-url')
  console.log(hUrl)
  const url = new URL(hUrl ?? "")
  const parentId = parseInt(url.searchParams.get('parentId') ?? "")
  const parentName = url.searchParams.get('parentName')
  const users = await getUser({limit:25,offset:0})

  return (

    <div className='flex flex-col items-center w-full h-full p-6 md:px-10  bg-base-300'>
      <div className='flex flex-row justify-between items-center px-2 w-full mb-6'>
        <h3 className='text-2xl font-bold'> {parentName ? `New SubProduct For ${parentName}` : "New Product"}</h3>
      </div>
      <Form user={users} />
      </div>
  )
}
