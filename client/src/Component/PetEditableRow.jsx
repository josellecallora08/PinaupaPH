import React from 'react'

const PetEditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (

    <tr className=''>
      <td>
        <input className='lg:w-auto w-24 ml-2 p-1 rounded-md border-2 border-primary-color'
          type="text"
          required="required"
          placeholder="Enter Pet Name"
          name="petfullName"
          value={editFormData.petfullName}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input className='lg:w-auto ml-1 p-1 border-2 w-24 rounded-md border-primary-color'
          type="text"
          required="required"
          placeholder="Enter Species"
          name="species"
          value={editFormData.species}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input className='lg:w-auto ml-1 w-24 p-1 border-2 rounded-md border-primary-color'
          type="text"
          required="required"
          placeholder="Enter Birthday"
          name="birthday"
          value={editFormData.birthday}
          onChange={handleEditFormChange}
        />
      </td>
      <td className='flex text-center text-sm mr-2'>
        <button
          type="submit"
          className="lg:mr-2 lg:ml-20 ml-2 bg-primary-color hover:opacity-80 text-white font-bold p-2 rounded "
        >
          Save
        </button>
        <button
          onClick={handleCancelClick}
          className="bg-red hover:opacity-80 text-white font-bold p-1 rounded"
        >
          Cancel
        </button>
      </td>
    </tr>

  )
}

export default PetEditableRow
