import React, { Fragment, useEffect, useState } from 'react'
import FamMemEditableRow1 from './FamMemEditableRow1'
import FamMemReadRow1 from './FamMemReadRow1'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'

const EditFamMemTable1 = ({ id, setIsEditFamilyMemForm }) => {
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
    if (window.confirm('Are you sure you want to delete this tenant?')) {
      dispatch(deleteHousehold(id, contactId))
      console.log('Tenant deleted')
    }
  }



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
            {household &&
              household.map((contact, key) => (
                <Fragment key={key}>
                  {editContactId === contact._id ? (
                    <FamMemEditableRow1
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <FamMemReadRow1
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
      
   
      </form>
    </div>
  )
}

export default EditFamMemTable1
