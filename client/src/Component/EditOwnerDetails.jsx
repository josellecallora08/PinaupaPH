import React, { useState } from 'react'
import {useSelector } from 'react-redux'

function EditOwnerDetails({setIsModalOpen}) {
  const user = useSelector((state) => state.user.data)

  const [fields, setFields] = useState({
    name: user?.name || '',
    birthday: user?.birthday || '',
    mobile_no: user?.mobile_no || '',
    email: user?.email || '',
    unit_id: user?.unit_id || '',
    deposit: user?.deposit || '',
    occupancy: user?.occupancy || ''
  })
  
  const [isFormOpen, setIsFormOpen] = useState(false)
  const toggleForm = (e) => {

    setIsFormOpen(!isFormOpen);
  }
  const handleInput = (e) => {

  }
  const handleSubmit = () => {
  console.log('Form submitted');
  toggleForm();
  }
  
  
  return (
    <div  className='fixed w-full h-full flex items-center justify-center '>
      <div className='absolute w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-sm' onClick={() => setIsModalOpen(prevState => !prevState)}></div>
      <div  className='md:w-4/12 w-4/5 h-fit bg-white z-10 rounded-md shadow-md flex flex-col overflow-hidden'>
        <h1 className='bg-[#183044] uppercase font-bold tracking-wider text-white p-3'>EDIT LANDLORD DETAILS</h1>
        <div className='w-full flex justify-between py-5 h-full'>
          
          <form method="POST" className='w-11/12 h-full m-auto flex flex-col gap-3 z-10'>
            
          <div>
              <label htmlFor="">Name</label>
              <div className='w-full h-full max-h-12 border-2 border-[#183044] rounded-md overflow-hidden'>
                <input type="text" placeholder='Name' className='w-full h-full p-3 outline-none'/>
              </div>
            </div> 
             
            <div>
              <label htmlFor="">Email Address</label>
              <div className='w-full h-full max-h-12 border-2 border-[#183044] rounded-md overflow-hidden'>
                <input type="text" placeholder='Email' className='w-full h-full p-3 outline-none'/>
              </div>
            </div>
            
            <div>
            <label htmlFor="">Birthday</label>
              <div className='w-full h-full max-h-12 border-2 border-[#183044] rounded-md overflow-hidden'>
                <input type="date" className='w-full h-full p-3 outline-none'/>
              </div>
            </div>
            <div>
              <label htmlFor="">Contact</label>
              <div className='w-full h-full max-h-12 border-2 border-[#183044] rounded-md overflow-hidden'>
                <input type="text" placeholder='Contact' className='w-full h-full p-3 outline-none'/>
              </div>
            </div>

            <div className='w-full h-full flex  justify-end mt-6'>
              <button type="submit" className='w-[120px] border border-primary text-white bg-[#183044] rounded-md bg-primary p-2 mr-2'>Submit</button>
              <button type='button' className='w-[120px] border border-primary text-[#183044] bg-white rounded-md p-2' onClick={() => setIsModalOpen(prevState => !prevState)}>Cancel</button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditOwnerDetails

