import React from 'react'

const PetEditableRow = ({
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
            placeholder="Enter Pet Name"
            name="petfullName"
            value={editFormData.petfullName}
            onChange={handleEditFormChange}
          />
        </td>
        <td>
          <input className='p-1 border-2 rounded-md border-primary' 
            type="text"
            required="required"
            placeholder="Enter Species"
            name="species"
            value={editFormData.species}
            onChange={handleEditFormChange}
          />
        </td>
        <td>
          <input className='p-1 border-2 rounded-md border-primary'
            type="text"
            required="required"
            placeholder="Enter Birthday"
            name="birthday"
            value={editFormData.birthday}
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

export default PetEditableRow
