import close from '/close_red.svg'
import pfp from '/pfp.svg'
const Toast = ({ message }) => {
    return (
        <>
            <div className="fixed right-0 size-full max-w-[350px] flex flex-col items-end justify-end gap-2 py-5">
                <div className="relative w-4/5 h-full p-1 z-50 bg-gray/50 max-h-28 rounded-xl mx-auto text-sm overflow-hidden">
                    <button className='absolute rounded-full  right-1 top-1'>
                        <figure className='size-full max-w-7 '>
                            <img src={close} className="size-full object-contain" alt="" />
                        </figure>
                    </button>
                    <div className='flex flex-col p-2 gap-2 overflow-hidden'>
                        <div className='col-span-2 row-span-1 flex items-center gap-2'>
                            <figure className='size-full max-w-10 rounded-full'>
                                <img src={pfp} className='size-full object-contain' alt="" />
                            </figure>
                            <div>
                                <p className='text-md font-semibold'>Joselle E. Callora</p>
                                <p className='text-xs font-regular'>Unit - 201</p>
                            </div>
                        </div>
                        <div className='col-span-2 row-span-1 text-ellipsis box-border overflow-hidden'>
                            <p>{'Commented on your Reported Issue'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Toast