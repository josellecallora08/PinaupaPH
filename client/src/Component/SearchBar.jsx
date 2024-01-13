import React from 'react'
import { CiSearch } from "react-icons/ci";
const SearchBar = ({onSearch}) => {
  return (
    <div className="lg:w-1/2 lg:ml-8 relative ml-8 ">
      <input
        type="text"
        placeholder="Search..."
        className=" lg:w-1/2 border border-gray-300 rounded-full p-2 focus:outline-none focus:border-blue-500 pl-8 "
        onChange={(e) => onSearch(e.target.value)}
      />
      <CiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
    </div>
  )
}

export default SearchBar