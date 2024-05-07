import React from 'react'
import { RiEditBoxFill } from "react-icons/ri";
import { AiFillCloseSquare } from 'react-icons/ai'
const FamMemReadRow1 = ({id, contact, handleEditClick,handleDeleteClick }) => {
  console.log(contact)
  return (
    
      <tr className='text-center'>
        <td className="px-4 py-2">asdds</td>
        <td className="px-4 py-2">asdas</td>
        <td className="px-4 py-2">asd</td>
        <td className="px-4 py-2">
          <button
            type="button"
            onClick={(event) => handleEditClick(event, contact._id)}
            className=" text-lime font-bold text-2xl "
          >
            <RiEditBoxFill />
          </button>
          <button type='button' onClick={() => handleDeleteClick(id,contact._id)} className=' text-2xl text-red'> <AiFillCloseSquare/></button>
        </td>
      </tr>
   
  )
}

export default FamMemReadRow1
