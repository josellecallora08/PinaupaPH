import React from 'react'


const FamMemEditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td className="">
        <input
          className="lg:w-auto ml-2 p-1 w-24 rounded-md border-2 border-primary-color"
          type="text"
          placeholder="Enter Name"
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        />
      </td>
      <td className="">
        <input
          className="lg:w-auto ml-2 p-1 w-24 rounded-md border-2 border-primary-color"
          type="text"
          placeholder="Enter Name"
          name="mobile"
          value={editFormData.mobile}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          className="lg:w-auto p-1 border-2 w-24 rounded-md border-primary-color"
          type="text"
          placeholder="Enter Relationship"
          name="relationship"
          value={editFormData.relationship}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          className="lg:w-auto p-1 border-2 w-24 rounded-md border-primary-color"
          type="date"
          placeholder="Enter Phone"
          name="birthday"
          value={editFormData.birthday}
          onChange={handleEditFormChange}
        />
      </td>
      <td className="flex text-center text-sm">
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

export default FamMemEditableRow
