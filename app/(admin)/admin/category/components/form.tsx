"use client"
import React, { useState } from 'react'
import Link from "next/link";
import { create } from '../actions/create';
import { useFormState, useFormStatus } from 'react-dom';
import { CategoryType } from '@/types';
import { update } from '../actions/update';


export default function Form({ isNew = true, datas={} , parentId=null }: { isNew?: boolean, datas?:CategoryType, parentId?:number|null }) {

    const [data, setData] = useState(datas);
    const catagoryLabels = ["Name", "Slug", "Icon", "Details", "Type", "Show In Home", "Home Page Title"]
    const {pending,} = useFormStatus()
    const createWithParent = create.bind(null, parentId)
    const updateWithId = update.bind(null, data?.id ?? 0)
    
    return (
        <form action={isNew ? createWithParent : updateWithId} className='w-full'>
            <div className='flex flex-col items-center w-full px-6 md:px-10'>
                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-x-7 gap-y-5  w-full'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='name' className='text-base-content'>Name</label>
                        <input type='text' id='name' name='name' value={data?.name} className='input input-bordered' required onChange={e => setData({...data, name: e.target.value})} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='slug' className='text-base-content'>Slug</label>
                        <input type='text' id='slug' name='slug' value={data?.slug} className='input input-bordered' required onChange={e => setData({...data, slug: e.target.value})} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='type' className='text-base-content'>Type</label>
                        <select id='type' name='type' value={data?.type} className='select select-bordered' required onChange={e => setData({...data, type: e.target.value})}>
                            <option value='parent'>Category Container</option>
                            <option value='leaf'>Product Container</option>
                        </select>
                    </div>     
                    <div className='flex flex-col gap-2'>
                        <div className='flex w-full justify-between'>
                        <label htmlFor='homePageTitle' className='text-base-content'>Home Page Title</label>
                        <div className='flex flex-row gap-2'>
                        <label htmlFor='showInHome' className='text-base-content text-sm md:text-base'>Show In Home</label>
                        <input type='checkbox' id='showInHome' name='showInHome' checked={data?.showInHome ?? false} className='toggle toggle-primary' onChange={e => setData({...data, showInHome: e.target.checked})} />
                    </div>
                    </div>
                        <input type='text' id='homePageTitle' name='homePageTitle' value={data?.HomePageTitle  ?? ""} className='input input-bordered' required onChange={e => setData({...data, HomePageTitle: e.target.value})} />
                    </div>
                    {/*  */}
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='icon' className='text-base-content'>Icon</label>
                        <input type='text' id='icon' name='icon' value={data?.icon ?? ""} className='input input-bordered' required onChange={e => setData({...data, icon: e.target.value})} />
                    </div>
               
                    <div className='flex flex-col gap-2 row-span-2'>
                        <label htmlFor='details' className='text-base-content'>Description</label>
                        <textarea id='details' name='details' value={data?.details  ?? ""} className='textarea textarea-bordered h-36' required onChange={e => setData({...data, details: e.target.value})}></textarea>
                    </div>
                    
                </div>
                <div className='flex flex-row gap-2 justify-end my-5 w-full'>
                    <button type='submit' className='btn btn-primary'>{pending && <span className="loading loading-spinner"></span>}{isNew ? 'Create' : 'Update'}</button>
                    <Link href="/admin/category">
                        <button className='btn btn-secondary'>Cancel</button>
                    </Link>
                </div>
            </div>
        </form>
    )
}
