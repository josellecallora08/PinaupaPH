import React, { useEffect, useState } from 'react'
import SearchBar from '../../Component/SearchBar'
import LeaseCard from '../../Component/LeaseCard'
import { FaPlus } from 'react-icons/fa6'
import AddLease from '../../Component/AdminComponent/AddLease'
import { Link } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import Loading from '../../Component/LoadingComponent/Loading'
import { useDispatch, useSelector } from 'react-redux'
import {
  createDocument,
  deleteDocument,
  fetchDocuments,
  resetDocumentStatus,
  searchContract,
} from '../../features/documents'
import PopUp from '../../Component/PopUp'

const Least = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.docs.loading)
  const contracts = useSelector((state) => state.docs.data)
  const [modal, setModal] = useState(false)
  const [searchItem, setSearchItem] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [popupMessage, setPopupMessage] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const errorDocument = useSelector((state) => state.docs.error)
  const msgDocument = useSelector((state) => state.docs.msg)

  const toggleModal = () => {
    setModal(!modal)
  }
  console.log('docs contracts', contracts)

  const handleSearch = (e) => {
    setSearchItem(e.target.value)
  }

  const handleLease = (e) => {
    e.preventDefault()
    dispatch(createDocument(selectedUser.value))
    dispatch(resetDocumentStatus())
    
  }

  useEffect(() => {
    if (msgDocument !== null) {
      setPopupMessage(msgDocument)
    } else if (errorDocument !== null) {
      setPopupMessage(errorDocument)
    }

    if (msgDocument !== null || errorDocument !== null) {
      setShowPopup(true)
      setTimeout(() => {
        setShowPopup(false)
        dispatch(resetDocumentStatus())
        setModal(false)
      }, 3000)
    }
  }, [dispatch, handleLease])
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(deleteDocument(id))
      console.log('Deleting item...')
    }
  }

  useEffect(() => {
    if (searchItem && searchItem !== '') {
      dispatch(searchContract(searchItem))
    } else {
      dispatch(fetchDocuments())
    }
  }, [searchItem])

  return (
    <>
      {showPopup && (
        <PopUp
          message={popupMessage}
          onClose={() => setShowPopup(false)}
          isError={errorDocument}
        />
      )}
      {/* {loading && <Loading />} */}
      {modal && (
        <AddLease
          setModal={setModal}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          handleLease={handleLease}
        />
      )}
      <div className="w-full m-auto h-full flex flex-col bg-white1  ">
        <div className="w-11/12 h-full m-auto">
          <div className="lg:text-base pt-5 font-bold">
            <Link to={'/dashboard'} className="hover:underline">
              DOCUMENTS
            </Link>{' '}
            {/* check */}/{' '}
            <Link to={`/document/lease-agreement`} className="hover:underline">
              LEASE AGREEMENTS{' '}
            </Link>
          </div>
          <div className="flex flex-col py-5 gap-2 md:flex-row justify-between items-center">
            <div className="w-full md:w-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
            <button
              onClick={toggleModal}
              className="btn md:btn-wide w-full bg-primary-color text-white hover:text-primary-color"
            >
              <FaPlus />
              Create Lease
            </button>
          </div>

          <div className=" md:grid-cols-3  grid grid-cols-1 gap-5 mt-3">
            {contracts &&
              contracts?.map((val, key) => (
                <LeaseCard key={key} val={val} handleDelete={handleDelete} />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Least
