import React, { useEffect, useState } from 'react'
import SearchBar from '../../Component/SearchBar'
import TenantConcernCard from '../../Component/Tenant Component/TenantConcernCard'
import { FaPlus } from 'react-icons/fa6'
import CreateTicket from '../../Component/Tenant Component/CreateTicket'
import { base_url } from '../../utils/constants'
import {useDispatch} from 'react-redux'
import { handleSearchUser } from '../../features/user'
const TenantConcern = () => {
  const [searchItem, setSearchItem] = useState('')
  const [isCreateTicket, setisCreateTicket] = useState(false)
  const dispatch = useDispatch()
  const handleInput = (e) => {
    setSearchItem(e.target.value)
  }


  return (
    <>
      <div className=" px-5 py-3">
        <h1 className="lg:text-base uppercase text-sm font-bold my-5 ">
          Concern And Issues
        </h1>

        <div className="lg:flex-row flex flex-col gap-4 justify-between ">
          <div className="w-7/12 md:max-w-60 max-w-full">
            <SearchBar onSearch={handleInput} />
          </div>
          <div className='flex justify-end'>
            <button onClick={() => setisCreateTicket(true)} className="bg-primary flex gap-3 items-center py-3 px-10 rounded-md text-white">
              <FaPlus />
              Create Ticket
            </button>
          </div>
          {isCreateTicket && (
                    <div className="fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center bg-black bg-opacity-50 ">
                      <div className="lg:w-1/2 h-96 bg-white rounded-md relative">
                        <CreateTicket
                          setisCreateTicket={setisCreateTicket}
                        />
                      </div>
                    </div>
                  )}
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-y-2 lg:gap-x-3">
          <TenantConcernCard />
        </div>
      </div>
    </>
  )
}

export default TenantConcern
