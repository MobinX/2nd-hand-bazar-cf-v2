"use client"
import React, { useState, useEffect } from 'react'
import Link from "next/link";
import { create } from '../actions/create';
import { useFormState, useFormStatus } from 'react-dom';
import { ProductType, UserType } from '@/types';
import { update } from '../actions/update';
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';

export const dynamic = 'force-dynamic'

export default function Form({ isNew = true, datas = {}, user=[]}: { isNew?: boolean, datas?: ProductType,user?:UserType[]}) {

    const [data, setData] = useState(datas);
    const [isUploading, setIsUploading] = useState(false) //for icon
    const [filename, setFilename] = useState("") // for icon
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [formState, formAction] = useFormState((isNew ? create : update), { msg: "", type: "" })
    useEffect(() => {
        console.log(formState)


    }, [formState])

    const uploadElmRef = React.useRef<HTMLInputElement>(null)
    const onUploadChange = () => {
        setIsUploading(false)
        const file = uploadElmRef.current?.files?.[0]
        setFilename(uploadElmRef.current?.value ?? "")
        if (file) {
            setIsUploading(true)
        }
        else {

        }
    }

    return (
        <form action={formAction} onSubmit={() => setIsSubmiting(true)} className='w-full' id='frm'>
            {formState?.type === "error" &&
                <div className="toast">
                    <div className="alert alert-error">
                        <span>{formState?.msg}</span>
                    </div>
                </div>
            }
            <div className='flex flex-col items-center w-full px-6 md:px-10'>
                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-x-7 gap-y-5  w-full'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='name' className='text-base-content'>Name</label>
                        <input type='text' id='name' name='name' value={data?.name} className='input input-bordered' required onChange={e => setData({ ...data, name: e.target.value })} />
                        <input name="id" value={data?.id} className='hidden' readOnly />
                        {data?.image && <input name="prevIcon" value={data.image} className='hidden' readOnly />}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='slug' className='text-base-content'>Slug</label>
                        <input type='text' id='slug' name='slug' value={data?.slug} className='input input-bordered' required onChange={e => setData({ ...data, slug: e.target.value })} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='price' className='text-base-content'>Price</label>
                        <input type='number' id='price' name='price' value={data?.price} className='input input-bordered' required onChange={e => setData({ ...data, price: parseInt(e.target.value) })} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='type' className='text-base-content'>Uploader</label>
                        <select id='type' disabled={isNew == false} name='uploaderId' value={data?.uploaderId?.toString()} className='select select-bordered' required onChange={e => setData({ ...data, uploaderId: parseInt(e.target.value) })}>
                            {user.map((user,ind)=> 
                                <option key={ind} value={user.id?.toString()}>{user.name}</option>
                            )}
                        </select>
                    </div>
                   
                    {/*  */}
                    <div className='flex flex-col gap-2 row-span-2'>
                        <label htmlFor='icon' className='text-base-content'>Image</label>
                        <input type='file' ref={uploadElmRef} id='icon' name='image' className='hidden' required={isNew} onChange={e => onUploadChange()} />
                        <div className='flex justify-center items-center w-full h-36'>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {isUploading ? <button type='button' className='btn w-full h-full p-6 border border-base-content/20' onClick={() => uploadElmRef.current?.click()}><img src={uploadElmRef.current?.files?.[0] && URL.createObjectURL(uploadElmRef.current?.files?.[0])} alt={filename} className='w-full h-full object-contain' /></button> : <button type='button' className='btn w-full h-full p-6 border border-base-content/20' onClick={() => uploadElmRef.current?.click()}>{data.image ? <img src={data.image ?? ""} alt={data.name} className='w-full h-full object-contain' /> : <ArrowUpOnSquareIcon className='w-full h-full' />}</button>}
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 row-span-2'>
                        <label htmlFor='details' className='text-base-content'>Description</label>
                        <textarea id='details' name='description' value={data?.description ?? ""} className='textarea textarea-bordered h-36' required onChange={e => setData({ ...data, description: e.target.value })}></textarea>
                    </div>

                </div>
                <div className='flex flex-row gap-2 justify-end my-5 w-full'>
                    <button type='submit' form='frm' className='btn btn-primary' disabled={isSubmiting}>{isSubmiting && <span className="loading loading-spinner"></span>}{isNew ? 'Create' : 'Update'}</button>
                    <Link href="/admin/product">
                        <button className='btn btn-secondary'>Cancel</button>
                    </Link>
                </div>
            </div>
        </form>
    )
}
