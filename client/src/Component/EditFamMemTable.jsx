import React, { Fragment, useEffect, useState } from 'react'
import FamMemEditableRow from './FamMemEditableRow'
import FamMemReadRow from './FamMemReadRow'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { deleteHousehold, fetchHouseholds } from '../features/household'

const Table = ({ id, setIsEditFamilyMemForm }) => {
  const dispatch = useDispatch()
  const household = useSelector((state) => state.household.data)
  const [contacts, setContacts] = useState()
  const [error, setError] = useState(null)
  const [editContactId, setEditContactId] = useState(null)
  const [editFormData, setEditFormData] = useState({
    name: '',
    relationship: '',
    birthday: '',
  })
  const handleEditFormChange = (event) => {
    event.preventDefault()

    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...editFormData }
    newFormData[fieldName] = fieldValue

    setEditFormData(newFormData)
  }

  const handleEditClick = (event, contact) => {
    event.preventDefault()
    setEditContactId(contact)

    const formValues = {
      name: contact.name,
      relationship: contact.relationship,
      birthday: contact.birthday,
    }

    setEditFormData(formValues)
  }

  const handleEditFormSubmit = (event) => {
    event.preventDefault()

    const editedContact = {
      id: editContactId,
      name: editFormData.name,
      relationship: editFormData.relationship,
      birthday: editFormData.birthday,
    }

    const newContacts = [...contacts]

    const index = contacts.findIndex((contact) => contact._id === editContactId)

    newContacts[index] = editedContact
    setError(
      'An error occurred while submitting the form.An error occurred while submitting the form An error occurred while submitting the form An error occurred while submitting the form ',
    )
    setContacts(newContacts)
    setEditContactId(null)
  }

  const handleCancelClick = () => {
    setEditContactId(null)
  }

  const handleDeleteClick = async (id, contactId) => {
    if (window.confirm(
      'Are you sure you want to delete this tenant?',
    )) {
      dispatch(deleteHousehold(id, contactId))
      console.log('Tenant deleted')
    }
  }

  useEffect(() => {
    dispatch(fetchHouseholds(id))
  }, [])

  return (
    <div>
      <div className="relative w-full flex  rounded-tl-lg rounded-tr-lg  text-black items-center ">
        <h1 className="lg:text-xl  ml-5 text-lg font-bold pt-6 pb-2 h-auto ">
          Edit Family Member Details
        </h1>
      </div>
      <form
        action=""
        onSubmit={handleEditFormSubmit}
        className="flex flex-col overflow-y-auto h-96 "
      >
        <div className="lg:justify-between lg:flex lg:items-center lg:-mb-1 mb-3">
          <button className="absolute top-4 right-6">
            <IoMdClose
              onClick={() => setIsEditFamilyMemForm((prevState) => !prevState)}
              size={25}
              color="dark-blue"
            />
          </button>
        </div>

        <table className=" table-fixed min-w-full border-collapse w-full  ">
          <thead className="  bg-dark-blue  text-white sticky top-0 ">
            <tr className="text-center text-sm font-semibold  ">
              <th className="py-5 ">Name</th>
              <th className="">Relationship</th>
              <th className="">Birthday</th>
              <th className="">Actions</th>
            </tr>
          </thead>
          <tbody className="pt-10">
            {household.map((contact, key) => (
              <Fragment key={key}>
                {editContactId === contact._id ? (
                  <FamMemEditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <FamMemReadRow
                    id={id}
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
        {error && (
          <div className=" w-auto bg-light-red text-dark-blue p-4 m-4 rounded ">
            {error}
          </div>
        )}
        {household.length <= 4 && (
          <div className="flex justify-end absolute bottom-4 right-0 mb-5 mr-10 gap-3">
            <button
              type="submit"
              className="bg-primary-color text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        )}
        {household.length > 4 && (
          <div className="flex justify-end mb-8 mt-3 mr-10">
            <button
              type="submit"
              className=" bg-primary-color text-white font-semibold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

export default Table
