import React, { useEffect, useState } from 'react'
import SearchBar from '../../Component/SearchBar'
import LeaseCard from '../../Component/LeaseCard'
import { FaPlus } from 'react-icons/fa6'
import AddLease from '../../Component/AdminComponent/AddLease'
import { Link } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDocuments } from '../../features/documents'

const Least = () => {
  const dispatch = useDispatch()
  const contracts = useSelector((state) => state.docs.data)
  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }
  console.log(contracts)
  useEffect(() => {
    dispatch(fetchDocuments())
  }, [])

  return (
    <>
      {modal && <AddLease setModal={setModal} />}
      <div className="w-full m-auto h-full flex flex-col bg-white1  ">
        <div className="w-11/12 h-full m-auto">
          <div className="lg:text-base pt-5 font-bold">
            <Link to={'/dashboard'} className="hover:underline">
              DOCUMENTS
            </Link>{' '}
            /{' '}
            <Link to={`/document/lease-agreement`} className="hover:underline">
              LEASE AGREEMENTS{' '}
            </Link>
          </div>
          <div className="flex flex-col py-5 gap-2 md:flex-row justify-between items-center">
            <div className="w-full md:w-auto">
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

          <div className=" md:grid-cols-2  grid grid-cols-1 gap-5 mt-3">
            {contracts &&
              contracts?.map((val, key) => <LeaseCard key={key} val={val} />)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Least
