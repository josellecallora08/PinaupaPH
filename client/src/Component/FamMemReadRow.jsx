import React from 'react'
import { RiEditBoxFill } from "react-icons/ri";
import { AiFillCloseSquare } from 'react-icons/ai'
const ReadRow = ({id, contact, handleEditClick,handleDeleteClick }) => {
  return (
    
      <tr className='text-center'>
        <td className="px-4 py-2">{contact.name}</td>
        <td className="px-4 py-2">{contact.mobile}</td>
        <td className="px-4 py-2">{contact.relationship}</td>
        <td className="px-4 py-2">{new Date(contact.birthday).toDateString()}</td>
        <td className="px-4 py-2">
          <button
            type="button"
            onClick={(event) => handleEditClick(event, contact)}
            className=" text-lime font-bold text-2xl "
          >
            <RiEditBoxFill />
          </button>
          <button type='button' onClick={() => handleDeleteClick(contact._id)} className=' text-2xl text-red'> <AiFillCloseSquare/></button>
        </td>
      </tr>
   
  )
}

export default ReadRow
