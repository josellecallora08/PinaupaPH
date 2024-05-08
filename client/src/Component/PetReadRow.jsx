import React from 'react'
import { RiEditBoxFill } from "react-icons/ri";
import { AiFillCloseSquare } from 'react-icons/ai'
const PetReadRow = ({id, pets, handleEditClick,handleDeleteClick }) => {
  return (
    
      <tr className='text-center'>
        <td className="px-4 py-2">{pets.name}</td>
        <td className="px-4 py-2">{pets.species}</td>
        <td className="px-4 py-2">{(new Date(pets.birthday).toLocaleDateString())}</td>
        <td className="px-4 py-2">
          <button
            type="button"
            onClick={(event) => handleEditClick(event, pets)}
            className="text-lime font-bold text-2xl "
          >
            <RiEditBoxFill />
          </button>
          <button type='button' onClick={() => handleDeleteClick(id, pets._id)} className=' text-2xl text-red'> <AiFillCloseSquare/></button>
        </td>
      </tr>
   
  )
}

export default PetReadRow
