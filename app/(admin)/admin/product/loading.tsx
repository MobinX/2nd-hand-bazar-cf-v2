export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className='flex flex-col items-center w-full px-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-x-7 gap-y-5  w-full'>
                <div className='flex flex-col gap-2'>
                    <div className='bg-gray-200 h-6 w-1/2 animate-pulse'></div>
                    <div className='bg-gray-200 h-8 w-3/4 animate-pulse'></div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='bg-gray-200 h-6 w-1/2 animate-pulse'></div>
                    <div className='bg-gray-200 h-8 w-3/4 animate-pulse'></div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='bg-gray-200 h-6 w-1/2 animate-pulse'></div>
                    <div className='bg-gray-200 h-8 w-3/4 animate-pulse'></div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='bg-gray-200 h-6 w-1/2 animate-pulse'></div>
                    <div className='bg-gray-200 h-8 w-3/4 animate-pulse'></div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='bg-gray-200 h-6 w-1/2 animate-pulse'></div>
                    <div className='bg-gray-200 h-8 w-3/4 animate-pulse'></div>
                </div>
                <div className='flex flex-col gap-2 row-span-2'>
                    <div className='bg-gray-200 h-6 w-full animate-pulse'></div>
                    <div className='bg-gray-200 h-36 w-full animate-pulse'></div>
                </div>
                <div className='flex flex-row gap-2'>
                    <div className='bg-gray-200 h-6 w-1/2 animate-pulse'></div>
                    <div className='bg-gray-200 h-6 w-1/2 animate-pulse'></div>
                </div>
            </div>
            <div className='flex flex-row gap-2 justify-end my-5 w-full'>
                <div className='bg-gray-200 h-10 w-20 animate-pulse'></div>
                <div className='bg-gray-200 h-10 w-20 animate-pulse'></div>
            </div>
        </div>
    );
  }