import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createHousehold, editHousehold, fetchHousehold } from '../features/household'

const FamMemEditableRow = ({ user_id,
  household_id,
  handleCancelClick,
}) => {

  const household = useSelector((state) => state.household.single)
  const dispatch = useDispatch()
  const [fields, setFields] = useState({
    name: household?.name || '',
    mobile: household?.mobile || '',
    relationship: household?.relationship || '',
    birthday: household?.birthday || '',
  })

  const handleInput = (e) => {
    const { name, value } = e.target
    setFields({
      ...fields,
      [name]: value
    })
  }

  useEffect(() => {
    dispatch(fetchHousehold(user_id, household_id))
  }, [])
  const handleSubmit = async () => {
    console.log(user_id)
    console.log(fields)
    console.log(household_id)
    dispatch(editHousehold(user_id, household_id, fields))
  }
  return (
    <tr>
      <td className=''>
        <input
          className="lg:w-auto ml-2 p-1 w-24 rounded-md border-2 border-primary-color"
          type="text"
          placeholder="Enter Name"
          name="name"
          value={fields.name}
          onChange={handleInput}
        />
      </td>
      <td className=''>
        <input
          className="lg:w-auto ml-2 p-1 w-24 rounded-md border-2 border-primary-color"
          type="text"
          placeholder="Enter Name"
          name="mobile"
          value={fields.mobile}
          onChange={handleInput}
        />
      </td>
      <td>
        <input
          className="lg:w-auto p-1 border-2 w-24 rounded-md border-primary-color"
          type="text"
          placeholder="Enter Relationship"
          name="relationship"
          value={fields.relationship}
          onChange={handleInput}
        />
      </td>
      <td>
        <input
          className="lg:w-auto p-1 border-2 w-24 rounded-md border-primary-color"
          type="date"
          placeholder="Enter Phone"
          name="birthday"
          value={fields.birthday}
          onChange={handleInput}
        />
      </td>
      <td className="flex text-center text-sm">
        <button
          onClick={handleSubmit}
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


