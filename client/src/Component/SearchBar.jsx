import React from 'react'
import { CiSearch } from "react-icons/ci";
const SearchBar = ({onSearch}) => {
  return (
    <div className=" relative">
      <input
        type="search"
        placeholder="Search..."
        className=" w-full border-2 border-[#9e9e9e] rounded-full p-2 focus:outline-none focus:border-blue-500 pl-8 "
        onChange={onSearch}
      />
      <CiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
    </div>
  )
}

export default SearchBar