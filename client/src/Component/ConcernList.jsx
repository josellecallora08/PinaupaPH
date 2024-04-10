import React, { useEffect, useState } from 'react'
import SearchBar from '../Component/SearchBar'
import ConcernCard from './ConcernCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReports } from '../features/report'
const ConcernList = () => {
  const [searchItem, setSearchItem] = useState('')
  const [StatselectedOption, setStatSelectedOption] = useState('')
  const [ConcernselectedOption, setConcernselectedOption] = useState('')
  const dispatch = useDispatch()
  const reports = useSelector((state) => state.report.data)
  const handleSearch = (e) => {
    setSearchItem(e.target.value)
  }
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
      <div className=" px-5 lg:pl-14 py-3">
        <h1 className="lg:text-base uppercase text-sm font-bold my-5 ">
          Concern And Issues
        </h1>

        <div className="lg:flex-row flex flex-col gap-10 justify-between ">
          <div className="w-full md:max-w-60 max-w-full">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="lg:gap-9 flex justify-center gap-6">
            <div className="lg:text-sm flex items-center justify-center">
              <select
                className=" lg:p-3 bg-white border  border-gray-400 hover:border-gray-500 rounded-md shadow leading-tight focus:outline-none focus:shadow-outline p-2 cursor-pointer "
                value={StatselectedOption}
                onChange={handleStatOptionChange}
                style={{
                  color: StatselectedOption ? 'black' : 'gray',
                  width: '180px',
                }}
              >
                <option style={{ color: 'gray' }} value="">
                  Select Building
                </option>
                <option value="option1" className="">
                  Option 1
                </option>
                <option value="option2" className="">
                  Option 2
                </option>
                <option value="option3" className="">
                  Option 3
                </option>
              </select>
            </div>

            <div className="lg:text-sm flex items-center justify-center">
              <select
                className=" lg:p-3 bg-white border  border-gray-400 hover:border-gray-500 rounded-md shadow leading-tight focus:outline-none focus:shadow-outline p-2 cursor-pointer"
                value={ConcernselectedOption}
                onChange={handleConcernOptionChange}
                style={{
                  color: ConcernselectedOption ? 'black' : 'gray',
                  width: '180px',
                }}
              >
                <option style={{ color: 'gray' }} value="">
                  Select Building
                </option>
                <option value="option1" className="w-10">
                  Option 1
                </option>
                <option value="option2" className="w-10">
                  Option 2
                </option>
                <option value="option3" className="w-10">
                  Option 3
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-y-2 lg:gap-x-3">
          {reports?.map((val, key) => (
            <ConcernCard key={key} val={val} num={key} />
          ))}
        </div>
      </div>
    </>
  )
}

export default ConcernList
