"use client"
import { CategoryType } from "@/types";
import { PlusIcon } from '@heroicons/react/16/solid'
import { ArrowLeftIcon, ArrowRightIcon, MagnifyingGlassIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useState } from "react";

export const Table = ({ datas, labels }: { datas: CategoryType[], labels: string[] }) => {
    const [srchQry, setSrchQry] = useState('')
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
                        <button className='btn btn-sm btn-outline  btn-square'><PlusIcon className='w-5 h-5 ' /></button>
                        <button className='btn btn-sm btn-outline  btn-square'><TrashIcon className='w-5 h-5' /></button>
                    </div>




                </div>
                <div className="overflow-x-auto mt-3">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                {labels.map((label, index) => (
                                    <th key={index}>{label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {datas.filter(d => d.name?.toLowerCase().includes(srchQry.toLowerCase())).map((data, index) => (
                                <tr key={index}>
                                    <td>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </td>
                                    <td>{data.name}</td>
                                    <td>{data.slug}</td>
                                    <td>{data.icon}</td>
                                    <td>{data.details}</td>
                                    <td>{data.type}</td>
                                    <td>{data.showInHome?.toString()}</td>
                                    <td>{data.HomePageTitle?.toString()}</td>
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