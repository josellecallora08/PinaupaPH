import React, { useEffect, useState } from 'react'
import SearchBar from '../Component/SearchBar'
import ConcernCard from './ConcernCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReports, searchReport } from '../features/report'
import Loading from './LoadingComponent/Loading'
import { FaPlus } from 'react-icons/fa6'
import CreateTicket from './Tenant Component/CreateTicket'
const ConcernList = () => {
  const [StatselectedOption, setStatSelectedOption] = useState('')
  const [isCreateTicket, setisCreateTicket] = useState(false)
  const [ConcernselectedOption, setConcernselectedOption] = useState('')
  const [searchItem, setSearchItem] = useState('')
  const user = useSelector((state) => state.auth.user)
  const loading = useSelector((state) => state.report.loading)
  const dispatch = useDispatch()
  const reports = useSelector((state) => state.report.data)
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

  const handleStatOptionChange = (e) => {
    setStatSelectedOption(e.target.value)
  }
  const handleConcernOptionChange = (e) => {
    setConcernselectedOption(e.target.value)
  }
  useEffect(() => {
    dispatch(fetchReports())
  }, [])
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
            {/* <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                Who shot first?
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>

            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                Who shot first?
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select> */}
            {user && user?.user_id?.role === 'Tenant' ? (
              <>
                <button
                  onClick={() => setisCreateTicket((prevState) => !prevState)}
                  className="btn btn-wide bg-primary-color font-bold uppercase text-white hover:text-primary-color"
                >
                  <FaPlus />
                  Add Report
                </button>

                {isCreateTicket && (
                  <div className="fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center bg-black bg-opacity-50">
                    <div className="lg:w-9/12 bg-white rounded-lg relative">
                      <CreateTicket id={user?.user_id._id} setisCreateTicket={setisCreateTicket} />
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
              reports?.map((val, key) => (
                <ConcernCard key={key} val={val} num={key} />
              ))
            )
          ) : user?.user_id.role === 'Tenant' ? (
            loading ? (
              <Loading />
            ) : (
              reports
                ?.filter((item) => item.user_id === user?.id)
                .map((val, key) => (
                  <ConcernCard key={key} val={val} num={key} />
                ))
            )
          ) : loading ? (
            <Loading />
          ) : (
            reports?.map((val, key) => (
              <ConcernCard key={key} val={val} num={key} />
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default ConcernList
