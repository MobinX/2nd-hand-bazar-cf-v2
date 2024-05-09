"use client"
import { deleteProduct } from "@/services/lib/product";
import { ProductType } from "@/types";
import { PlusIcon } from '@heroicons/react/16/solid'
import { ArrowLeftIcon, ArrowPathIcon, ArrowRightIcon, MagnifyingGlassIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useState, useRef, useEffect } from "react";
import { del } from "../actions/delete";
import { reCatch } from "../actions/reCatch";
import Link from "next/link";
import Image from "next/image";

export const Table = ({ datas, labels ,parentProduct = null }: { datas: ProductType[], labels: string[], parentProduct?: {id:number, name: string} |null}) => {
    const [srchQry, setSrchQry] = useState('')
    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const [showModal, setShowModal] = useState(false)
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isReCatching, setIsReCatching] = useState(false)


    useEffect(() => {
        if (dialogRef.current?.open && !showModal) {
            dialogRef.current?.close()
        } else if (!dialogRef.current?.open && showModal) {
            dialogRef.current?.showModal()
        }
    }, [showModal])
    useEffect(() => {
        setSelectedItems([])
}, [datas])
    const onDelete = async (ids: number[]) => {
        setIsDeleting(true)
        let res = null
        if(parentProduct){
             res = await del(ids,parentProduct.id)
        }
        else{
            res = await del(ids,null)
        }
        
        if (res) {
            setShowModal(false)
            setIsDeleting(false)
        }
    }
    const onReCatch = async () => {
        setIsReCatching(true)
        await reCatch()
        setIsReCatching(false)
    }
    return (
        <div className='card bg-base-100 card-bordered rounded-2xl w-full'>
            <div className='card-body p-0 pb-5'>
                <div className='flex flex-row justify-between items-center w-full px-5 pt-5'>
                    <div className='inline-flex items-center gap-3'>
                        <div className='flex items-center border-base-200 bg-base-200 border rounded-xl px-2'>
                            <MagnifyingGlassIcon className='w-5 h-5 text-base-content' />
                            <input type='text' placeholder='Search' value={srchQry} onChange={e => setSrchQry(e.target.value)} className='input input-sm input-ghost focus:bg-transparent focus:outline-none focus:outline-offset-0 focus:border-transparent w-full' />
                        </div>
                        <div></div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <button className='btn btn-sm btn-outline  btn-square' onClick={async () => await onReCatch()}>{isReCatching ? <span className="loading loading-spinner"></span> : <ArrowPathIcon className='w-5 h-5 ' />} </button>

                        <Link href={parentProduct ? `new?parentId=${parentProduct.id}&parentName=${parentProduct.name}` : "product/new"}><button className='btn btn-sm btn-outline  btn-square'><PlusIcon className='w-5 h-5 ' /></button></Link>
                        <div className="indicator">
                            {selectedItems.length > 0 && <span className="indicator-item w-5 h-5 flex justify-center items-center text-xs text-secondary-content bg-secondary rounded-full">{selectedItems.length}</span>}
                            <button className={`btn btn-sm btn-outline  btn-square ${selectedItems.length > 0 ? "active" : "disabled"} `} disabled={selectedItems.length == 0} onClick={() => setShowModal(true)}><TrashIcon className='w-5 h-5' /></button>
                            <dialog ref={dialogRef} className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Alert!</h3>
                                    <p className="py-4">Are you sure? Deleting {selectedItems.length} Item{selectedItems.length > 1 ? "s" : ""}</p>
                                    <div className="modal-action">

                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-primary" onClick={async () => await onDelete(selectedItems)}>{isDeleting && <span className="loading loading-spinner"></span>}Delete</button>
                                        <button className="btn btn-secondary ml-2" onClick={() => setShowModal(false)}>Close</button>

                                    </div>
                                </div>
                            </dialog>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto mt-3">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" checked={selectedItems.length == datas.length && selectedItems.length > 0} onChange={e => { e.target.checked ? datas.map(d => setSelectedItems(arr => !arr.includes(d?.id ?? 0) ? arr.concat([d?.id ?? 0]) : arr)) : setSelectedItems([]) }} />
                                    </label>
                                </th>
                                {labels.map((label, index) => (
                                    <td className="text-sm" key={index}>{label}</td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {datas.filter(d => d.name?.toLowerCase().includes(srchQry.toLowerCase())).map((data, index) => (
                                <tr key={index}>
                                    <td>
                                        <label>
                                            <input type="checkbox" className="checkbox" checked={selectedItems.includes(data?.id ?? 0)} onChange={e => {
                                                if (e.target.checked) {
                                                    setSelectedItems(arr => arr.concat([data?.id ?? 0]));
                                                } else {
                                                    setSelectedItems(arr => arr.filter(id => id !== (data?.id ?? 0)));
                                                }
                                            }} />
                                        </label>
                                    </td>
                                    <td><Link href={`/admin/product/${data.id}`}>{data.name}</Link></td>
                                    <td>{data.slug}</td>
                                    <td><Image src={data.image ?? ""} height={80}  width={80} className="rounded-md" alt={data.name ?? ""}/></td>
                                    <td>{data.description}</td>
                                    <td>{data.price}</td>
                                    <td>{data?.uploader?.name}</td>
                                </tr>
                            ))}


                        </tbody>


                    </table>
                </div>
                <div className="flex justify-end items-center w-full px-5 py-2">
                    <div className="join">
                        <button className="join-item btn btn-sm  btn-square"><ArrowLeftIcon className='w-5 h-5' /></button>
                        <button className="join-item btn btn-sm  btn-square btn-primary">1</button>
                        <button className="join-item btn btn-sm  btn-square">2</button>
                        <button className="join-item btn btn-sm  btn-square"><ArrowRightIcon className='w-5 h-5' /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}