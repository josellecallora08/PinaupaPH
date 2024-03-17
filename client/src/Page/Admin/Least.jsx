import React, { useState } from 'react'
import SearchBar from '../../Component/SearchBar'
import LeaseCard from '../../Component/LeaseCard'
import { FaPlus } from 'react-icons/fa6'
import AddLease from '../../Component/AddLease'

import 'react-datepicker/dist/react-datepicker.css'
const Least = () => {
  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }

  return (
    <>
      {modal && (
        <AddLease
          setModal={setModal}
        />
      )}
      <div className="lg:ml-3 mr-3 flex flex-col ">
        <h1 className="lg:text-2xl m-4 my-7 ml-8 text-4xl font-bold">
          DOCUMENTS / LEASE AGREEMENTS
        </h1>
        <div className="flex flex-row justify-between items-center">
          <SearchBar />
          <button
            className="bg-[#183044] flex flex-row items-center py-3 px-6 rounded-md"
            onClick={toggleModal}
          >
            <FaPlus color="white" size={20} />
            <h1 className="text-white pr-3 ml-3">CREATE LEASE</h1>
          </button>
        </div>

        <div className="lg:grid-cols-3 md:grid-cols-2 grid grid-cols-1 mt-3">
          <LeaseCard />
          <LeaseCard />
          <LeaseCard />
          <LeaseCard />
          <LeaseCard />
          <LeaseCard />
          <LeaseCard />
          <LeaseCard />
        </div>
      </div>
    </>
  )
}
export default Least
