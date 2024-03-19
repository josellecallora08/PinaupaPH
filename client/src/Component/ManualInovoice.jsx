import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

const ManualInovoice = ({setModal}) => {
  const dispatch = useDispatch()
  const modal = useRef(null)

  const handleInvoice = () => {

  }

  useEffect(() => {
    const closeModal = (e) => {
      if(e.key == 'Escape'){
        setModal(state => state = false)
      }
    };

    document.addEventListener('keydown', closeModal);

    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, []);

  return (
    <div  className='fixed w-full h-full flex  items-center justify-center z-10 '>
      <div onClick={() => setModal(state => state = false)} className='absolute w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-sm'></div>
      <div  className='w-full md:w-1/5 h-fit bg-white z-10 rounded-md shadow-md flex flex-col overflow-hidden'>
        <h1 className='bg-primary uppercase font-bold tracking-wider text-white p-3'>Prepare Invoice</h1>
        <div className='w-full h-full flex justify-between py-5'>
          <form onSubmit={handleInvoice} method="POST" className='w-4/5 m-auto h-full flex flex-col gap-3 z-10'>
            <div className='w-full h-full max-h-12 border-2 border-[#9e9e9e] rounded-md overflow-hidden'>
              <select name="" id="" className='w-full h-full appearance-none outline-none p-2'>
                <option value="">Select Apartment</option>
              </select>
            </div>  
            <div className='w-full h-full max-h-12 border-2 border-[#9e9e9e] rounded-md overflow-hidden'>
              <select name="" id="" className='w-full h-full appearance-none p-2 outline-none'>
                <option value="">Select Tenant</option>
              </select>
            </div>
            <div className='w-full h-full max-h-12 border-2 border-[#9e9e9e] rounded-md overflow-hidden'>
              <input type="number" placeholder='Amount' className='w-full h-full p-2 outline-none'/>
            </div>
            <div className='w-full h-full max-h-12 border-2 border-[#9e9e9e] rounded-md overflow-hidden'>
              <input type="date" className='w-full h-full p-2 outline-none'/>
            </div>
            <div className='w-full h-full flex gap-2 max-h-12'>
              <button type="submit" className='w-full border border-primary text-white rounded-md bg-primary p-2'>Submit</button>
              <button type='button' onClick={() => setModal(prevState => !prevState)} className='w-full border border-primary text-primary rounded-md p-2'>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ManualInovoice