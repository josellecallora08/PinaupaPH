import React, { Fragment, useEffect, useState } from 'react'
import petdata from './pet-mock-data.json'
import PetEditableRow from './PetEditableRow'
import PetReadRow from './PetReadRow'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { deletePet, fetchPets } from '../features/pet'

const EditPetTable = ({ id, setIsEditPetForm }) => {
  const [contacts, setContacts] = useState(petdata)
  const error = useSelector((state) => state.pet.error)
  const dispatch = useDispatch()
  const [editContactId, setEditContactId] = useState(null)
  const pets = useSelector(state => state.pet.data)
  const [editFormData, setEditFormData] = useState({
    name: '',
    species: '',
    birthday: '',
  })
  useEffect(() => {
    dispatch(fetchPets(id))
  }, [])
  const handleEditFormChange = (event) => {
    event.preventDefault()

    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...editFormData }
    newFormData[fieldName] = fieldValue

    setEditFormData(newFormData)
  }

  const handleEditClick = (event, pets) => {
    event.preventDefault()
    setEditContactId(pets._id)

    const formValues = {
      petfullName: pets.name,
      species: pets.species,
      birthday: new Date(pets.birthday).toLocaleDateString(),
    }

    setEditFormData(formValues)
  }

  const handleEditFormSubmit = (event) => {
    event.preventDefault()
    setError(
      'An error occurred while submitting the form.An error occurred while submitting the form An error occurred while submitting the form An error occurred while submitting the form ',
    )

    const editedContact = {
      id: editContactId,
      petfullName: editFormData.petfullName,
      species: editFormData.species,
      birthday: editFormData.birthday,
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

  const handleDeleteClick = (id, contactId) => {
    if (window.confirm(
      'Are you sure you want to delete this tenant?',
    )) {
      dispatch(deletePet(id, contactId))
      console.log('Tenant deleted')
    }
  }


  return (
    <div>
      <div className="relative w-full flex  rounded-tl-lg rounded-tr-lg  text-black items-center ">
        <h1 className="lg:text-xl  ml-5 text-lg font-bold pt-6 pb-2 h-auto ">
          Edit Pet Details
        </h1>
      </div>
      <form action="" onSubmit={handleEditFormSubmit} className='flex flex-col overflow-y-auto h-96 flex-shrink-0'>
        <div className="lg:justify-between lg:flex lg:items-center lg:-mb-1 mb-3">
          <button className="absolute top-4 right-6">
            <IoMdClose
              onClick={() => setIsEditPetForm((prevState) => !prevState)}
              size={25}
              color="dark-blue"
            />
          </button>
        </div>
        <table className=" table-fixed min-w-full border-collapse w-full  ">
          <thead className='  bg-dark-blue  text-white sticky top-0 '>
            <tr className='text-center text-sm font-semibold  ' >
              <th className="py-5 ">Name</th>
              <th className="">Species</th>
              <th className="">Birthday</th>
              <th className="">Actions</th>
            </tr>
          </thead>
          <tbody className="pt-10">
            {pets && pets.map((val, key) => (
              <Fragment key={key}>
                {editContactId === val._id ? (
                  <PetEditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <PetReadRow
                    id={id}
                    pets={val}
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
        {/* {contacts.length <= 4 && (
          <div className="flex justify-end absolute bottom-0 right-0 mb-10 mr-10 gap-3">
            <button
              type="submit"
              className="bg-primary-color text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        )}
        {contacts.length > 4 && (
          <div className="flex justify-end mb-10 mt-2 mr-10">
            <button
              type="submit"
              className=" bg-primary-color text-white font-semibold py-2 px-4  rounded"
            >
              Submit
            </button>
          </div>
        )} */}
      </form>
    </div>
  )
}

export default EditPetTable
