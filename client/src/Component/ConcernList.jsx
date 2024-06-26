import React, { useEffect, useState } from 'react'
import SearchBar from '../Component/SearchBar'
import ConcernCard from './ConcernCard'
import { useDispatch, useSelector } from 'react-redux'
import {
  createConcern,
  fetchConcerns,
  resetConcernStatus,
  searchConcern,
} from '../features/concern'
import Loading from './LoadingComponent/Loading'
import { FaPlus } from 'react-icons/fa6'
import CreateTicket from './Tenant Component/CreateTicket'
import PopUp from './PopUp'
import CreateDepositReq from './Tenant Component/CreateDepositReq'

const ConcernList = () => {
  // /view-concern/:id
  const [isCreateTicket, setisCreateTicket] = useState(false)
  const [isCreateDepositReq, setisCreateDepositReq] = useState(false)
  const [searchItem, setSearchItem] = useState('')
  const [type, setSelectedType] = useState('')
  const [description, setDescription] = useState('')
  const [attached_image, setImage] = useState([])
  const error = useSelector((state) => state.concern.error)
  const msg = useSelector((state) => state.concern.msg)
  const user = useSelector((state) => state.auth.user)
  const loading = useSelector((state) => state.concern.loading)
  const dispatch = useDispatch()
  const [selected, setSelected] = useState('all')
  const concerns = useSelector((state) => state.concern.data)
  const [title, setTitle] = useState('')
  const menu = useSelector((state) => state.toggle.sidebar)
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files) // Convert FileList to an array
    setImage((prevImages) => [...prevImages, ...files]) // Append new files to the existing array
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createConcern(
        user?.user_id._id,
        title,
        description,
        attached_image,
        type,
      ),
    )
    setisCreateTicket((prevState) => !prevState)
  }

  useEffect(() => {
    if (msg !== null) {
      setPopupMessage(msg)
    } else if (error !== null) {
      setPopupMessage(error)
    }

    if (msg !== null || error !== null) {
      setShowPopup(true)
      setTimeout(() => {
        setShowPopup(false)
        dispatch(resetConcernStatus())
      }, 3000)
    }
  }, [msg, error])

  const handleSearch = (e) => {
    setSearchItem(e.target.value)
  }
  useEffect(() => {
    if (searchItem && searchItem !== '') {
      dispatch(searchConcern(searchItem))
    } else {
      dispatch(fetchConcerns())
    }
  }, [searchItem, dispatch, msg])

  return (
    <>
      <div className="h-2 px-5 lg:pl-14 py-3 ">
        <h1 className="lg:text-base uppercase text-sm font-bold my-5 ">
          Concern And Issues
        </h1>

        <div className="lg:flex-row flex flex-col gap-5 justify-between ">
          <div className="w-full md:max-w-60 max-w-full">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="lg:gap-9 flex justify-center gap-3">
            <select
              name="selected"
              onChange={(e) => setSelected(e.target.value)}
              className="select select-bordered w-full lg:max-w-xs"
            >
              <option hidden>Select Type of Concern</option>
              <option value={'all'}>All</option>
              <option value={'true'}>Resolved</option>
              <option value={'false'}>Unresolved</option>
            </select>
            {user && user?.user_id?.role === 'Tenant' ? (
              <>
                <button  onClick={() => setisCreateDepositReq((prevState) => !prevState)}  className="btn lg:btn-wide bg-primary-color font-bold uppercase text-white hover:text-primary-color">
                  Deposit Request
                </button>
                <button
                  onClick={() => setisCreateTicket((prevState) => !prevState)}
                  className="btn lg:btn-wide bg-primary-color font-bold uppercase text-white hover:text-primary-color"
                >
                  <FaPlus />
                  Add Concern
                </button>

                {isCreateDepositReq && (
                  <div className="fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center bg-black bg-opacity-50">
                    <div className="lg:w-9/12 bg-white rounded-lg relative">
                      <CreateDepositReq
                        setisCreateDepositReq={setisCreateDepositReq}
                      />
                    </div>
                  </div>
                )}

                {isCreateTicket && (
                  <div className="fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center bg-black bg-opacity-50">
                    <div className="lg:w-9/12 bg-white rounded-lg relative">
                      <CreateTicket
                        id={user?.user_id._id}
                        setisCreateTicket={setisCreateTicket}
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                        attached_image={attached_image}
                        setImage={setImage}
                        type={type}
                        setSelectedType={setSelectedType}
                        handleImageChange={handleImageChange}
                        handleDescriptionChange={handleDescriptionChange}
                        handleTypeChange={handleTypeChange}
                        handleSubmit={handleSubmit}
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              ''
            )}
          </div>
        </div>

        <div
          className={`${menu ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}   grid grid-cols-1 md:mr-10 gap-4 pb-5`}
        >
          {user && user?.role === 'Admin'
            ? concerns
                ?.filter((item) =>
                  selected === 'all'
                    ? item.status.toString()
                    : item.status.toString() === selected.toString(),
                )
                .map((val, key) => (
                  <ConcernCard key={key} val={val} num={key} />
                ))
            : user?.user_id.role === 'Tenant'
              ? concerns
                  ?.filter((item) =>
                    selected === 'all'
                      ? item?.sender_id?.user_id?._id === user?.user_id?._id
                      : item?.sender_id?.user_id?._id === user?.user_id?._id &&
                        selected !== 'all' &&
                        item.status.toString() === selected.toString(),
                  )
                  .map((val, key) => (
                    <ConcernCard key={key} val={val} num={key} />
                  ))
              : concerns
                  ?.filter((item) => item.status === selected)
                  .map((val, key) => (
                    <ConcernCard key={key} val={val} num={key} />
                  ))}
        </div>
      </div>
      {showPopup && (
        <PopUp
          message={popupMessage}
          isError={error}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  )
}

export default ConcernList
