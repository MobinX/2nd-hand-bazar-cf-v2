import React from 'react'
import Form from '../components/form'
import { getUser } from '@/services/lib/user'
import { UserType } from '@/types'
import { Table } from '../components/table'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'


export default async function EditUser({ params }: { params: { id: number } }) {
 
  const userLabels = ["name","email","role","phone","password","provider",]

    const userData:UserType = await getUser({id:params.id})
    if(!userData){
      redirect("/admin/user")
    }
    console.log(userData)
  return (
    <div className='flex flex-col items-center w-full h-full p-6 md:px-10  bg-base-300'>
      <div className='flex flex-row justify-between items-center px-2 w-full mb-6'>
        <h3 className='text-2xl font-bold'>Edit User {userData.name}</h3>
      </div>
      <Form isNew={false} datas={userData} /> 
      <div className='flex flex-row justify-between items-center px-2 w-full mb-6'>
        <h3 className='text-2xl font-bold'>Products</h3>
      </div>
      {/* <Table labels={userLabels} datas={userData} parentUser={{id:userData.id ?? 0, name:userData.name ?? ""}} /> */}
      </div>
  )
}
