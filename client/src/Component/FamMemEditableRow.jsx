import React from 'react'

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
  
      <tr className=''>
        <td>
          <input className='ml-6 p-1 rounded-md border-2 border-primary'
            type="text"
            required="required"
            placeholder="Enter Name"
            name="fullName"
            value={editFormData.fullName}
            onChange={handleEditFormChange}
          />
        </td>
        <td>
          <input className='p-1 border-2 rounded-md border-primary' 
            type="text"
            required="required"
            placeholder="Enter Relationship"
            name="relationship"
            value={editFormData.relationship}
            onChange={handleEditFormChange}
          />
        </td>
        <td>
          <input className='p-1 border-2 rounded-md border-primary'
            type="text"
            required="required"
            placeholder="Enter Phone"
            name="phoneNumber"
            value={editFormData.phoneNumber}
            onChange={handleEditFormChange}
          />
        </td>
        <td className='text-center text-sm'>
          <button
            type="submit"
            className="bg-primary hover:opacity-80 text-white font-bold p-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={handleCancelClick}
            className="bg-red hover:opacity-80 text-white font-bold p-2 rounded"
          >
            Cancel
          </button>
        </td>
      </tr>
  
  )
}

export default EditableRow
