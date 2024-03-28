import React from 'react'
import TenantProfileInfo from '../Data/TenantProfileInfo'
import { GrFormView } from 'react-icons/gr'
import { FiRefreshCcw } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
const DocumentCard = () => {
  return (
    <div>
      {/* Document Card */}
      <div className="p-5 rounded-md shadow-sm shadow-light-gray ">
        <h1 className="text-2 xl font-bold mb-3">Least Agreement</h1>
        <div className=" flex gap-5">
          <div>
            <img
              src={TenantProfileInfo[0].Account[0].pfp}
              alt="Profile"
              className="w-14"
            />
          </div>
          <div className="flex  lg:gap-56 gap-24 mb-4">
            <div>
              <h2 className="lg:text-lg font-black">
                {TenantProfileInfo[0].PersonalDetails[0].name}
              </h2>
              <p className=" bg-dark-blue w-20 lg:text-sm text-xs text-center text-white rounded-lg py-1 my-3 font-black">
                {TenantProfileInfo[0].ApartmentDetails[0].aparmentunit}
              </p>
            </div>
            <div>
              <p className="lg:text-lg font-black">Date of Renewal</p>
              <p className="text-light-gray mt-2 font-lg">
                {TenantProfileInfo[0].ApartmentDetails[0].dateofrenewal}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button className="lg:text-base text-sm flex items-center gap-1 bg-dark-blue justify-center text-white py-2 px-4 rounded">
            View
            <GrFormView color="white"  className="lg:text-2xl text-lg" />
          </button>
          <button className="bg-lime text-white py-2 px-4 rounded">
            <FiRefreshCcw color="white"className="lg:text-xl text-sm" />
          </button>
          <button className="bg-red text-white py-2 px-4 rounded">
            <IoClose color="white"className="lg:text-xl text-sm" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default DocumentCard
