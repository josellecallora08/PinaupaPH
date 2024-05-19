import React from 'react'
import { FaCheckSquare } from "react-icons/fa";
import { MdCancel  } from "react-icons/md";
const FamMemEditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td className="">
        <input
          className="lg:w-auto  ml-2 p-1 w-[4rem] text-xs rounded-md border-2 border-primary-color"
          type="text"
          placeholder="Enter Name"
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        />
      </td>
      <td className="">
        <input
          className="lg:w-auto  ml-2 p-1 w-[4rem] text-xs rounded-md border-2 border-primary-color"
          type="text"
          placeholder="Enter Phone Number"
          name="mobile"
          value={editFormData.mobile}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          className="lg:w-auto  p-1 border-w-24 w-[4rem] text-xs rounded-md border-primary-color"
          type="text"
          placeholder="Enter Relationship"
          name="relationship"
          value={editFormData.relationship}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          className="lg:w-auto  p-1 border-w-24 w-[4rem] text-xs  rounded-md border-primary-color"
          type="date"
          placeholder="Enter Birthday"
          name="birthday"
          value={editFormData.birthday}
          onChange={handleEditFormChange}
        />
      </td>
      <td className="flex justify-center items-center gap-1 mt-2">
        <button
          type="submit"
          className='text-lg text-lime cursor-pointer'
        >
          <FaCheckSquare />
        </button>
        <button
          onClick={handleCancelClick}
          className="text-lg text-red cursor-pointer"
        >
        <  MdCancel  />
        </button>
      </td>
    </tr>
  )
}

export default FamMemEditableRow
