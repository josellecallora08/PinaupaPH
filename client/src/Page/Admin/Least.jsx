import React, { useState } from 'react'
import SearchBar from '../../Component/SearchBar'
import LeaseCard from '../../Component/LeaseCard'
import { FaPlus } from 'react-icons/fa6'
import AddLease from '../../Component/AddLease'
import { Link } from 'react-router-dom'

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
      <div className="w-11/12 m-auto h-full mr-3 flex flex-col ">
        <div className="lg:text-base lg:ml-0  my-7 ml-8 text-xl font-bold">
          <Link to={'/dashboard'} className='hover:underline'>DOCUMENTS</Link> / <Link to={`/document/lease-agreement`} className='hover:underline'>LEASE AGREEMENTS  </Link>
        </div>
        <div className="flex flex-row justify-between items-center">
          <SearchBar />
          <button
            className="lg:mr-12 bg-primary flex flex-row items-center py-3 px-6 rounded-md"
            onClick={toggleModal}
          >
            <FaPlus color="white" size={20} />
            <h1 className="text-white pr-3 ml-3">CREATE LEASE</h1>
          </button>
        </div>

        <div className="xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 lg:pr-10 grid grid-cols-1 mt-3">
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
