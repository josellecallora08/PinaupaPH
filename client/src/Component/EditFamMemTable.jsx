import React, { Fragment, useState } from 'react'
import data from './mock-data.json'
import FamMemEditableRow from './FamMemEditableRow'
import FamMemReadRow from './FamMemReadRow'
import { IoMdClose } from 'react-icons/io'

const Table = ({setIsEditFamilyMemForm}) => {
  const [contacts, setContacts] = useState(data)
  const [editContactId, setEditContactId] = useState(null)
  const [editFormData, setEditFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
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
    setEditContactId(contact.id)

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
    }

    setEditFormData(formValues)
  }

  const handleEditFormSubmit = (event) => {
    event.preventDefault()

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    }

    const newContacts = [...contacts]

    const index = contacts.findIndex((contact) => contact.id === editContactId)

    newContacts[index] = editedContact

    setContacts(newContacts)
    setEditContactId(null)
  }

  const handleCancelClick = () => {
    setEditContactId(null)
  }

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts]

    const index = contacts.findIndex((contact) => contact.id === contactId)

    newContacts.splice(index, 1)

    setContacts(newContacts)
  }
  return (
    <div>
      <div className="relative w-full flex  rounded-tl-lg rounded-tr-lg  text-black items-center ">
        <h1 className="lg:text-xl  ml-5 text-lg font-bold pt-6 pb-2 h-auto ">
          Edit Family Member Details
        </h1>
      </div>
      <form action="" onSubmit={handleEditFormSubmit} className='flex flex-col hover:overflow-y-auto h-96 flex-shrink-0'>
      <div className="lg:justify-between lg:flex lg:items-center lg:mb-5 mb-3">
            <button className="absolute top-4 right-6">
              <IoMdClose
                onClick={() => setIsEditFamilyMemForm((prevState) => !prevState)}
                size={25}
                color="dark-blue"
              />
            </button>
          </div>
        <table className=" table-fixed min-w-full border-collapse w-full  ">
          <thead className='  bg-dark-blue  text-white sticky top-0 '>
            <tr className='text-center text-sm font-semibold  ' >
              <th className="py-5 ">Name</th>
              <th className="">Address</th>
              <th className="">Phone Number</th>
              <th className="">Actions</th>
            </tr>
          </thead>
          <tbody className="pt-10">
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <FamMemEditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <FamMemReadRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
        {contacts.length <= 4 && (
  <div className="flex justify-end absolute bottom-0 right-0 mb-10 mr-10 gap-3">
    <button
      type="submit"
      className="bg-primary text-white font-bold py-2 px-4 rounded"
    >
      Submit
    </button>
  </div>
)}
{contacts.length > 4 && (
  <div className="flex justify-end mb-10 mt-2 mr-10">
      <button
      type="submit"
      className=" bg-primary text-white font-bold py-2 px-4  rounded"
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
