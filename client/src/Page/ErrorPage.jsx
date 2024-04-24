import logo from '/logo.svg'
const ErrorPage = () => {
    return (
        <>
            <div className="size-full min-h-screen bg-white1">
                <div className="w-11/12 h-full m-auto flex flex-col justify-center items-center">
                    <div className='w-full h-20 flex justify-center items-center'>
                        <figure className='size-full max-w-40'>
                            <img src={logo} className="size-full " alt="" />
                        </figure>
                    </div>
                    <div className='size-full grid grid-cols-2 gap-5'>
                        <div className="justify-self-center self-center h-full col-span-1 border">
                            <h1 className='text-6xl font-bold'>So Sorry!</h1>
                            <p className='text-2xl font-semibold'>The page you are looking for</p>
                            <p className='text-2xl font-semibold'>cannot be found</p>
                            <br/>
                            <div>
                                <p className='font-bold'>Possible Reasons:</p>
                                <ul className='list-disc pl-5 font-regular'>
                                    <li>The address may have been typed incorrectly;</li>
                                    <li>It may be a broken or outdated link.</li>
                                </ul>
                            </div>
                            <div className='mt-9'>
                                <button className='border bg-primary-color rounded-md text-white font-regular px-5 py-2'>
                                    Go to home
                                </button>
                            </div>
                        </div>
                        <div className="h-full col-span-1 border"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ErrorPage