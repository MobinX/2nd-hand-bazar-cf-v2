"use client"
import React, { useState, useEffect } from 'react'
import Link from "next/link";
import { create } from '../actions/create';
import { useFormState, useFormStatus } from 'react-dom';
import { UserType } from '@/types';
import { update } from '../actions/update';
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';

export const dynamic = 'force-dynamic'

export default function Form({ isNew = true, datas = {}, parentId = null }: { isNew?: boolean, datas?: UserType, parentId?: number | null }) {

    const [data, setData] = useState(datas);
    const [isUploading, setIsUploading] = useState(false) //for image
    const [filename, setFilename] = useState("") // for image
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

                        {data?.image && <input name="previmage" value={data.image} className='hidden' readOnly />}


                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='email' className='text-base-content'>Email</label>
                        <input type='email' id='email' name='email' value={data?.email} className='input input-bordered' required onChange={e => setData({ ...data, email: e.target.value })} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='password' className='text-base-content'>Password</label>
                        <input type='password' id='password' name='password' value={data?.password ?? ""}  className='input input-bordered' required onChange={e => setData({ ...data, password: e.target.value })} />
                    </div>
                    
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='type' className='text-base-content'>Role</label>
                        <select id='type' name='role' value={data?.role} className='select select-bordered' required onChange={e => setData({ ...data, role: e.target.value })}>
                            <option value='user'>User</option>
                            <option value='admin'>Admin</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='provider' className='text-base-content'>Provider</label>
                        <input type='text' id='provider' name='provider' value={data?.email} className='input input-bordered' required onChange={e => setData({ ...data, provider: e.target.value })} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='phone' className='text-base-content'>Phone</label>
                        <input type='tel' id='phone' name='phone' value={data?.phone} className='input input-bordered' required onChange={e => setData({ ...data, phone: e.target.value })} />
                    </div>
                    {/*  */}
                    <div className='flex flex-col gap-2 row-span-2'>
                        <label htmlFor='image' className='text-base-content'>Image</label>
                        <input type='file' ref={uploadElmRef} id='image' name='image' className='hidden' required={isNew} onChange={e => onUploadChange()} />
                        <div className='flex justify-center items-center w-full h-36'>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {isUploading ? <button type='button' className='btn w-full h-full p-6 border border-base-content/20' onClick={() => uploadElmRef.current?.click()}><img src={uploadElmRef.current?.files?.[0] && URL.createObjectURL(uploadElmRef.current?.files?.[0])} alt={filename} className='w-full h-full object-contain' /></button> : <button type='button' className='btn w-full h-full p-6 border border-base-content/20' onClick={() => uploadElmRef.current?.click()}>{data.image ? <img src={data.image ?? ""} alt={data.name} className='w-full h-full object-contain' /> : <ArrowUpOnSquareIcon className='w-full h-full' />}</button>}
                        </div>
                    </div>

                    

                </div>
                <div className='flex flex-row gap-2 justify-end my-5 w-full'>
                    <button type='submit' form='frm' className='btn btn-primary' disabled={isSubmiting}>{isSubmiting && <span className="loading loading-spinner"></span>}{isNew ? 'Create' : 'Update'}</button>
                    <Link href="/admin/user">
                        <button className='btn btn-secondary'>Cancel</button>
                    </Link>
                </div>
            </div>
        </form>
    )
}
