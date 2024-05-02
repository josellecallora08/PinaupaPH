import React, { useEffect, useState } from 'react'
import SearchBar from '../Component/SearchBar'
import ConcernCard from './ConcernCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReports } from '../features/report'
import Loading from './LoadingComponent/Loading'
import { FaPlus } from 'react-icons/fa6'
import CreateTicket from './Tenant Component/CreateTicket'
const ConcernList = () => {
  const [StatselectedOption, setStatSelectedOption] = useState('')
  const [isCreateTicket, setisCreateTicket] = useState(false)
  const [ConcernselectedOption, setConcernselectedOption] = useState('')
  const user = useSelector((state) => state.auth.user)
  const loading = useSelector((state) => state.report.loading)
  const dispatch = useDispatch()
  const reports = useSelector((state) => state.report.data)
  const handleSearch = (e) => {}
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
            <select className="select select-bordered w-full max-w-xs">
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
            </select>
            {user && user?.user_id.role === 'Tenant' ? (
              <>
                <button onClick={() => setisCreateTicket(prevState => !prevState)} className="btn btn-wide bg-primary-color font-bold uppercase text-white hover:text-primary-color">
                  <FaPlus />
                  Add Report
                </button>

               {isCreateTicket &&  <CreateTicket setisCreateTicket={setisCreateTicket} />}
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
          ) : user?.role === 'Tenant' ? (
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
