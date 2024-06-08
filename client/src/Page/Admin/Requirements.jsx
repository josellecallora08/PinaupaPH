import React, { useState } from 'react'
import AddRequirement from '../../Component/AdminComponent/AddRequirement'
import RequirementCard from '../../Component/AdminComponent/RequirementCard'

const Requirements = () => {
  const [isAddRequirementForm, setIsAddRequirementForm] = useState(false)
  return (
    <>
      <div className=" ml-4 mt-5 mb-4">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Requirements</h1>
          <button onClick={() => setIsAddRequirementForm(true)} className="bg-primary-color text-white  py-2 px-4 rounded-md hover:bg-primary-color/80">
            Add Requirement
          </button>
          {isAddRequirementForm && (
            <div className="fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center bg-black bg-opacity-50 ">
              <div className="lg:w-9/12 bg-white rounded-lg relative">
               <AddRequirement setIsAddRequirementForm={setIsAddRequirementForm} />
              
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Requirements
