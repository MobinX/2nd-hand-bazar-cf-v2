import { getUser } from '@/services/lib/user'
import { UserType } from '@/types'
import React from 'react'
import { Table } from './components/table'
export const dynamic = 'force-dynamic'

export default async function User() {

  const userLabels = ["Name","Email","Image","Provider","Role","Phone",]

  const userData: UserType[] = await getUser({ offset: 0, limit: 10 })

  console.log(userData)
  return (
    <div className='flex flex-col items-center w-full h-full p-6 md:px-10  bg-base-300'>
      <div className='flex flex-row justify-between items-center px-2 w-full mb-6'>
        <h3 className='text-2xl font-bold'>User</h3>
      </div>
      <Table labels={userLabels} datas={userData} />
    </div>

  )
}
