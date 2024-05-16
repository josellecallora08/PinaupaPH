import React, { useEffect, useState } from 'react'
import SearchBar from '../Component/SearchBar'
import ConcernCard from './ConcernCard'
import { useDispatch, useSelector } from 'react-redux'
import { createReport, fetchReports, searchReport } from '../features/report'
import Loading from './LoadingComponent/Loading'
import { FaPlus } from 'react-icons/fa6'
import CreateTicket from './Tenant Component/CreateTicket'
const ConcernList = () => {
  const [isCreateTicket, setisCreateTicket] = useState(false)
  const [searchItem, setSearchItem] = useState('')
  const [type, setSelectedType] = useState('')
  const [update, setUpdate] = useState(false)
  const [description, setDescription] = useState('')
  const [attached_image, setImage] = useState(null)
  const error = useSelector((state) => state.report.error)
  const msg = useSelector((state) => state.report.msg)
  const data = useSelector((state) => state.report.data)
  const user = useSelector((state) => state.auth.user)
  const loading = useSelector((state) => state.report.loading)
  const dispatch = useDispatch()
  const [selected, setSelected] = useState('all')
  const reports = useSelector((state) => state.report.data)
  const [title, setTitle] = useState('')
  const handleImageChange = (event) => {
    const file = event.target.files[0]
    setImage(file)
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
      createReport(user?.user_id._id, title, description, attached_image, type),
    )
    // Add form submission logic here
    if (msg || error || data) {
      setisCreateTicket((prevState) => !prevState)
    }
  }

  const handleSearch = (e) => {
    setSearchItem(e.target.value)
  }
  useEffect(() => {
    if (searchItem && searchItem !== '') {
      dispatch(searchReport(searchItem))
    } else {
      dispatch(fetchReports())
    }

  }, [searchItem])

  return (
    <>
      <div className="h-2 px-5 lg:pl-14 py-3">
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
                <button
                  onClick={() => setisCreateTicket((prevState) => !prevState)}
                  className="btn lg:btn-wide bg-primary-color font-bold uppercase text-white hover:text-primary-color"
                >
                  <FaPlus />
                  Add Report
                </button>

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

        <div className="lg:grid lg:grid-cols-3 lg:gap-y-2 lg:gap-x-3">
          {user && user?.role === 'Admin' ? (
            loading ? (
              <Loading />
            ) : (
              reports
                ?.filter((item) =>
                  selected === 'all'
                    ? item.status.toString()
                    : item.status.toString() === selected.toString(),
                )
                .map((val, key) => (
                  <ConcernCard key={key} val={val} num={key} />
                ))
            )
          ) : user?.user_id.role === 'Tenant' ? (
            loading ? (
              <Loading />
            ) : (
              reports
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
            )
          ) : loading ? (
            <Loading />
          ) : (
            reports
              ?.filter((item) => item.status === selected)
              .map((val, key) => <ConcernCard key={key} val={val} num={key} />)
          )}
        </div>
      </div>
    </>
  )
}

export default ConcernList
