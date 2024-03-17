import React from 'react'
import profile from '/pfp.svg'

const ChangePd = ({setchangeModal}) => {
  return (
    <div className='flex h-full fixed items-center justify-center w-full bg-gray/20 backdrop-blur-sm'>
      <div className='absolute w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-sm' onClick={() => setchangeModal(prevState => !prevState)}></div>
      <div className='absolute w-full h-11/12 flex items-center justify-center bg-black/20 backdrop-blur-sm'></div>
      <div className=' relative md:w-[550px] w-[360px] h-[360px] py-12 rounded-md shadow-md bg-white overflow-hidden'>
        <figure className='w-full h-full max-h-[200px]'>
          <img src={profile} className='w-full h-full'/> 
        </figure>

        <button className='absolute bottom-0 h-full w-full max-h-16 bg-[#183044] text-white text-lg '>
          Change Profile
        </button>
      
      </div>
    </div>
  )
}

export default ChangePd
