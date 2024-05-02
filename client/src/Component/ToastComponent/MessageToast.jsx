import { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux'
import close from '/close.svg'
import {sample} from '../../features/authentication'
const MessageToast = ({ message, error, isVisible, setIsVisible }) => {
const dispatch = useDispatch()
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            dispatch(sample())
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const handleHover = () => {
        clearTimeout(timer);
        setIsVisible(true);
    };
    return (
        <>
            <div onMouseEnter={handleHover} className={`z-50 absolute top-24 right-5 bg-white1/20 ${message ? 'border-[#00ff00]/20' : error ? 'border-red' : 'border-primary-color'} border-2 size-full max-w-40 md:max-w-60 max-h-12 md:max-h-20 rounded-md shadow-md overflow-hidden`}>
                <div className="size-full p-2 bg-white1 flex items-center justify-center font-regular">
                    <p className='text-xs md:text-base text-center'>{message ? message : error}</p>
                </div>
                <button className="absolute top-1 right-1 md:top-2 md:right-2 p-1 bg-red/20 hover:bg-red rounded-full max-w-fit max-h-fit">
                    <figure className='size-full max-w-1 max-h-1'>
                        <img src={close} className='size-full object-contain' alt="" />
                    </figure>
                </button>
            </div>
        </>
    )
}

export default MessageToast