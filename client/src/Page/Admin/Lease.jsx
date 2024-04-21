import React, { useState } from 'react'
import SearchBar from '../../Component/SearchBar'
import LeaseCard from '../../Component/LeaseCard'
import { FaPlus } from 'react-icons/fa6'
import AddLease from '../../Component/AdminComponent/AddLease'
import { Link } from 'react-router-dom'

import 'react-datepicker/dist/react-datepicker.css'
const Least = () => {
  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }

  return (
    <>
      {modal && <AddLease setModal={setModal} />}
      <div className="w-full m-auto h-full px-5 flex flex-col bg-white1  ">
        <div className="lg:text-base  my-7 font-bold">
          <Link to={'/dashboard'} className="hover:underline">
            DOCUMENTS
          </Link>{' '}
          /{' '}
          <Link to={`/document/lease-agreement`} className="hover:underline">
            LEASE AGREEMENTS{' '}
          </Link>
        </div>
        <div className="flex flex-col gap-2 md:flex-row justify-between items-center">
          <div className='w-full md:w-auto'>
            <SearchBar />
          </div>
          <button
            onClick={toggleModal}
            className="btn md:btn-wide w-full bg-primary-color text-white hover:text-primary-color"
          >
            <FaPlus />
            Create Lease
          </button>
        </div>

        <div className=" md:grid-cols-2  grid grid-cols-1 gap-2 mt-3">
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
