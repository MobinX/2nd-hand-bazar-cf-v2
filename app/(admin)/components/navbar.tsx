"use client"
import React, { useState } from 'react'
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Link from 'next/link'
export function Navbar({ children }: { children: React.ReactNode }) {
    const [sideBarOpen, setsideBarOpen] = useState(false)
    return (
        <>

            <div className='flex flex-row w-full min-h-screen'>
                <div className={` ${sideBarOpen ? "w-64 flex" : "w-0 hidden"}  text-base-content flex-col  items-center h-full min-h-screen bg-base-200 shadow-lg`}>
                    <div className='flex justify-end items-end w-full'>
                        <button className="btn btn-ghost btn-circle" onClick={() => setsideBarOpen(prv => !prv)} ><XMarkIcon className='h-6 w-6' /></button>
                    </div>
                    <div className='flex flex-col space-y-5 justify-center items-center h-full w-full'>
                        <Link href={'/admin/category'}> <button className='btn btn-ghost'>Category</button> </Link>
                        <Link href={'/admin/user'}> <button className='btn btn-ghost'>Users</button> </Link>
                        <Link href={'/admin/product'}> <button className='btn btn-ghost'>Products</button> </Link>
                        <Link href={'/admin/pages'}> <button className='btn btn-ghost'>Pages</button> </Link>
                    </div>
                </div>
                <div className='flex-grow flex flex-col min-h-screen w-full'>
                    <div className='flex py-3 flex-row items-center justify-center px-5 shadow-lg w-full'>
                        <button className="btn btn-ghost btn-circle" onClick={() => setsideBarOpen(prv => !prv)} ><Bars3Icon className='h-6 w-6' /></button>
                        <div className="flex-grow flex  justify-center items-center text-base-content w-full">Admin</div>

                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}
