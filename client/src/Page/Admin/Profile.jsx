import React,{useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { BiEdit } from "react-icons/bi";
import EditOwnerDetails from '../../Component/EditOwnerDetails'
import ChangePd from '../../Component/ChangePd'
import { isLoggedin } from '../../features/authentication';


const Profile = () => {
  const [modal, setIsModalOpen] = useState(false)
  const [changeModal, setchangeModal] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const toggleModal = () => {
    setIsModalOpen(!modal)
  }

  useEffect(() => {
    dispatch(isLoggedin())
    console.log(user?.birthday)
  }, [])
  return (
    <>{modal ? <EditOwnerDetails setIsModalOpen = {setIsModalOpen}/> :''}
      {changeModal ? <ChangePd setchangeModal= {setchangeModal} /> :''}
    
    <div className='flex flex-col gap-5 w-full h-full py-5'>
      <p className='h-full max-h-5 text-2xl font-bold w-11/12 m-auto py-2'>PROFILE</p>
      {/* Profile / landlord */}
      <div className='w-full h-full '>
        <div className='flex justify-center w-11/12 h-full m-auto rounded-md shadow-md flex-col md:flex-row' >
            <div className='flex flex-col w-full h-full'>
                <div className="flex justify-center items-center w-full h-full">
                  <figure className='flex justify-center items-center w-full h-full md:max-w-60 md:max-h-60  max-w-40 max-h-40 '>
                    <img src={user?.image} className='w-full h-full pt-2' onClick={() => setchangeModal(prevState => !prevState)}/>
                  </figure>
                </div>
              <div className="w-full h-full max-h-10 flex justify-center items-center py-6">
                <p className='md:text-2xl text-base uppercase font-bold'>{user?.name}</p>
              </div>
            </div>

            <div className='w-full h-full flex flex-col '>
              {/* Details */}
              <div className='w-full h-full flex-col flex'>
                <div className='w-full h-full max-h-12 px-4 py-2 text-white bg-[#183044] flex items-center justify-between'>
                  <p className='md:text-xl text-base'>PERSONAL DETAILS</p>
                  <BiEdit className='h-20 w-7' onClick={() => setIsModalOpen(prevState => !prevState)}/> 
                  
                </div>

                <div className='w-full h-full flex flex-col px-4 py-2'>
                  <div className='w-full flex m-auto'>
                    <p className='w-[170px] pb-2'>Phone No.</p>
                    <p>{user?.phone}</p>
                  </div>

                  <div className='w-full flex m-auto'>
                    <p className='w-[170px] pb-2'>Email Address</p>
                    <p>{user?.email}</p>
                  </div>

                  <div className='w-full flex m-auto'>
                    <p className='w-[170px]'>Date of Birth</p>
                    <p>{new Date(user?.birthday).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Account */}

              <div className='w-full h-full flex-col flex'>
                <div className='w-full h-full max-h-12 py-2 px-4 text-white bg-[#183044] flex items-center justify-between '>
                  <p className='md:text-xl text-base'>ACCOUNTS</p>
                  <BiEdit className='h-20 w-7' onClick={() => setIsModalOpen(prevState => !prevState)}/>
                </div>

                <div className='w-full flex flex-col px-4 py-3 '>
                  <div className='w-full flex m-auto pb-2'>
                    <p className='w-[170px]'>Username</p>
                    <p>{user?.username}</p>
                  </div>

                  <div className='w-full flex m-auto'>
                    <p className='w-[170px]'>Password</p>
                    <p>***********</p>
                  </div>
                </div>  
              </div>
            </div>
        </div>
      </div>
      {/* Apartment Details */}
      <div className='w-full h-full '>
        <p className='h-full max-h-5 text-2xl font-bold w-11/12 m-auto py-8 mb-4'>APARTMENT DETAILS</p>
        
          <div className="w-11/12 md:h-full md:max-w-[500px] md:max-h-[300px] bg-white rounded-md shadow-md md:mx-[52px] mx-4">
              <div className='w-full h-full max-h-12 px-4 py-2 text-white bg-[#183044] flex items-center'>
                <p>LANDLORD APARTMENT</p>
              </div>
              
              <div className='w-full flex flex-col'>
                <div className='w-full h-full flex px-4 py-2'>
                    <p className='w-[170px]'>Apartment Name</p>
                    <p>Cavite</p>
                  </div>
                  <div className='w-full h-full flex px-4 py-2'>
                    <p className='w-[170px]'>Address</p>
                    <p>Samploc St</p>
                  </div>

                  <div className='w-full h-full flex px-4 py-2'>
                    <p className='w-[170px]'>Total House</p>
                    <p>20</p>
                  </div>
              </div>
          </div>
        
      </div>
    </div>
    </>
  )
}

export default Profile