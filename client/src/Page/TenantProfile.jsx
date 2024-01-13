import React from 'react'
import { useState } from 'react'
import TenantProfileInfo from '../Data/TenantProfileInfo';
import { FaEdit } from "react-icons/fa";
import EditTenantDetails from '../Component/EditTenantDetails';
import EditTenantAccount from '../Component/EditTenantAccount';
import EditFamilyMem from '../Component/EditFamilyMem';
const TenantProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditTenantDetailForm, setIsEditTenantDetailForm] = useState(false)
  const [isEditTenantAccountForm, setIsEditTenantAccountForm] = useState(false)
  const [isEditFamilyMemForm, setIsEditFamilyMemForm] = useState(false)
  const toggleEditTenantDetailForm = () => {
    setIsEditTenantDetailForm(!isEditTenantDetailForm);
  }
  const toggleEditTenantAccountForm = () => {
    setIsEditTenantAccountForm(!isEditTenantAccountForm);
  }
  const toggleEditFamilyMemForm = () => {
    setIsEditFamilyMemForm(!isEditFamilyMemForm);
  }
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');

  };





  
  return (
    <div className='bg-white1'>
      
      {/* Tenant Profile Header */}
      <div className='lg:flex lg:items-center lg:justify-between'>
        <div className=' p-5 mx-4'>
            <h1 className='text-3xl font-bold'>Tenant/Profile</h1>
        </div>

        {/* Tab Navigation */}
        <div className='lg:text-xl lg:mt-0 lg:mr-14 lg:text-dark-gray  flex justify-evenly gap-3 mt-10'>
          <button onClick={() => handleTabClick('profile')} className={activeTab === 'profile' ? ' lg:text-black border-b-2 ' : ''}>
            Profile
          </button>
          <button onClick={() => handleTabClick('documents')} className={activeTab === 'documents' ? 'lg:text-black border-b-2' : ''}>
            Documents
          </button>
          <button onClick={() => handleTabClick('transaction')} className={activeTab === 'transaction' ? 'lg:text-black border-b-2' : ''}>
            Transaction
          </button>
        </div>
      </div>
    


      <div className=' mx-7 shadow-xl rounded-md'>
        {/* Content based on Active Tab */}
        {activeTab === 'profile' && (
        <div className=' lg:mt-5 mt-10   '>
           
            {TenantProfileInfo.map((profile, index) => (
                <div className='lg:flex lg:gap-5' key={index}>
                {/* Upper section */}
                 {/* Left profile */}
                  <div className='lg:w-1/2 lg:p-6  lg:rounded-lg lg:shadow-md lg:shadow-light-gray lg:origin-left  '>
                  <div className='flex gap-3'>
                          <img src={profile.Account[0].pfp} alt="Profile" className='lg:w-24 lg:h-24 w-14 h-14' />
                          
                          <div className='lg:mt-5 lg:ml-3'>
                            <h2 className='text-xl font-bold mb-2'>{profile.PersonalDetails[0].name}</h2>
                            <h2 className=''>{profile.ApartmentDetails[0].aparmentunit}</h2>
                          </div>
                  </div>

                        {/*Profile Content */}
        {/*Account */}
                        <div className='relative'>
                          <h1 className='lg:text-3xl text-xl font-bold mt-10'>Account</h1>
                          <FaEdit size={25} className='absolute top-0 right-0 cursor-pointer' onClick={toggleEditTenantAccountForm}  />
                            <div className='lg:text-md text-sm mt-3 ml-2 flex flex-col items-start'>
                              <p>Username<span className='ml-24'>{profile.Account[0].username}</span></p>
                              <p>Password<span className='ml-24'>{profile.Account[0].password}</span></p>
                            </div>
                        </div>
                        {isEditTenantAccountForm && (
              <div className='fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center bg-black bg-opacity-50'>
                <div className='bg-white p-8 rounded-md'>
                  <EditTenantAccount />
                  <div className='flex justify-end mt-5 gap-3'>

                      <button onClick={(e) => handleSubmit(e, toggleEditTenantAccountForm)} className=' bg-light-blue text-white font-bold py-2 px-4 rounded'>
                        Submit
                      </button>

                      <button
                        className='bg-red-500 bg-red text-white font-bold py-2 px-4 rounded'
                        onClick={toggleEditTenantAccountForm}
                      >
                        Close
                      </button>
                    
                  </div>
                  
                </div>
              </div>
            )}
                        
        {/*Personal Details */}
      
          
                        <div className='relative'>
                          <h1 className='lg:text-3xl text-xl font-bold mt-4'>Personal Details</h1>
                          <FaEdit size={25} className='absolute top-0 right-0 cursor-pointer'onClick={toggleEditTenantDetailForm} />
                            <div className='text-sm mt-3 ml-2 '>

                              <div className='lg:text-md flex gap-20'>
                                  <div className=' '>
                                    <p>Name</p>
                                    <p>Date of Birth</p>
                                    <p>Contact</p>
                                    <p>Email</p>
                                  </div>
                                  <div className=''>
                                    <p className=''>{profile.PersonalDetails[0].name}</p>
                                    <p className=''>{profile.PersonalDetails[0].birthday}</p>
                                    <p className=''>{profile.PersonalDetails[0].contact}</p>
                                    <p className=''>{profile.PersonalDetails[0].email}</p>
                                    
                                  </div>
                              </div>
                            </div>
                        </div>
                        {isEditTenantDetailForm && (
              <div className='fixed top-0 left-0 w-full z-50 h-full flex items-center justify-center bg-black bg-opacity-50'>
                <div className='bg-white p-8 rounded-md'>
                  <EditTenantDetails />
                  <div className='flex justify-end mt-5 gap-3'>

                      <button onClick={(e) => handleSubmit(e, toggleEditTenantDetailForm)} className=' bg-light-blue text-white font-bold py-2 px-4 rounded'>
                        Submit
                      </button>

                      <button
                        className='bg-red-500 bg-red text-white font-bold py-2 px-4 rounded'
                        onClick={toggleEditTenantDetailForm}
                      >
                        Close
                      </button>
                    
                  </div>
                  
                </div>
              </div>
            )}

        {/*Apartment Details */}
                        <div>
                          <h1 className='lg:text-3xl text-xl font-bold mt-4'>Apartment Details</h1>
                        
                            <div className='lg:text-md text-sm mt-3 ml-2 '>

                              <div className='flex gap-14'>
                                  <div className=' '>
                                    <p>Apartment Unit</p>
                                    <p>Deposit</p>
                                    <p>Date of Move-in</p>
                                  </div>
                                  <div className=''>
                                    <p className=''>{profile.ApartmentDetails[0].aparmentunit}</p>
                                    <p className=''>{profile.ApartmentDetails[0].deposit}</p>
                                    <p className=''>{profile.ApartmentDetails[0].dateofmovein}</p>
                                  </div>
                              </div>
                            </div>
                        </div>

                  </div>
                        {/* Right profile */}  
                  <div className='lg:w-1/2 lg:p-6 lg:overflow-y-auto lg:rounded-lg lg:shadow-md lg:shadow-light-gray lg:origin-left '>
                                  {/*Family Members */}
                                  <div className='relative lg:mb-24'>
                        <h1 className='lg:text-3xl lg:mb-4 text-xl font-bold mt-4'>Family Members</h1>
                        <FaEdit size={25} className='absolute top-0 right-0 cursor-pointer' onClick={toggleEditFamilyMemForm} />
                            
                            <div className='lg:text-md flex gap-24 '>
                                <div>
                                  <p className=' lg:text-2xl mb-2 text-xl'>{profile.FamilyMembers[0].relationship}</p>
                                  <p>Name</p>
                                  <p>Mobile No.</p>
                                </div>
                                <div className='-ml-2 mt-4'>
                                  <p><br /></p>
                                  <p className=''>{profile.FamilyMembers[0].name}</p>
                                  <p className=''>{profile.FamilyMembers[0].phone}</p>
                                
                                </div>
                            </div>
                          
                      </div>
                      {isEditFamilyMemForm && (
            <div className='fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white p-8 rounded-md'>
                <EditFamilyMem />
                <div className='flex justify-end mt-5 gap-3'>

                    <button onClick={(e) => handleSubmit(e, toggleEditFamilyMemForm)} className=' bg-light-blue text-white font-bold py-2 px-4 rounded'>
                      Submit
                    </button>

                    <button
                      className='bg-red-500 bg-red text-white font-bold py-2 px-4 rounded'
                      onClick={toggleEditFamilyMemForm}
                    >
                      Close
                    </button>
                  
                </div>
                
              </div>
            </div>
          )}
           {/*Pets */}
           <div className='lg:overflow-y-auto relative'>
                    <h1 className='lg:text-3xl lg:mb-4 text-xl font-bold mt-4'>Pets</h1>
                    <FaEdit size={25} className='absolute top-0 right-0' />
                

                        <div className='lg:text-md flex gap-28'>
                            <div className=' '>
                              <p>Name</p>
                              <p>Species</p>
                              <p>Age</p>
                            </div>
                            <div className=''>
                              <p className=''>{profile.Pets[0].name}</p>
                              <p className=''>{profile.Pets[0].species}</p>
                              <p className=''>{profile.Pets[0].age} Years old</p>
                            </div>
                        </div>
                      
                  </div>
                  </div>



            
                </div>
              ))
            }

        </div>
        )}







        {activeTab === 'documents' && (
          <div>
            {/* Documents content goes here */}
            <h2>Documents</h2>
            {/* ... display documents */}
          </div>
        )}

        {activeTab === 'transaction' && (
          <div>
            {/* Documents content goes here */}
            <h2>Transaction</h2>
            {/* ... display documents */}
          </div>
        )}
      </div>
        
    </div>
  )
}

export default TenantProfile