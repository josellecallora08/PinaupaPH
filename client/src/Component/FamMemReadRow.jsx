import React from 'react'
import { RiEditBoxFill } from 'react-icons/ri'
import { AiFillCloseSquare } from 'react-icons/ai'
const ReadRow = ({ id, contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr className="text-center">
      <td className="px-4 py-2 lg:text-base md:text-base text-xs">{contact.name}</td>
      <td className="px-4 py-2 lg:text-base md:text-base text-xs">{contact.mobile}</td>
      <td className="px-4 py-2 lg:text-base md:text-base text-xs">{contact.relationship}</td>
      <td className="px-4 py-2 lg:text-base md:text-base text-[10px]">{new Date(contact.birthday).toDateString()}</td>
      <td className="px-4 py-2 ">
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
          className=" text-lime font-bold lg:text-2xl md:lg:text-2xl  text-xl "
        >
          <RiEditBoxFill />
        </button>
        <button
          type="button"
          onClick={() => handleDeleteClick(contact._id)}
          className=" text-xl lg:text-2xl md:lg:text-2xl text-red"
        >
          {' '}
          <AiFillCloseSquare />
        </button>
      </td>
    </tr>
  )
}

export default ReadRow
