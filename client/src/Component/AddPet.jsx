import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { createPet } from '../features/pet'
import Popup from '../Component/PopUp'; 
const AddPet = ({ id, setIsAddPetForm }) => {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.pet.error)
  const msg = useSelector((state) => state.pet.msg)
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [fields, setFields] = useState({
    name: '',
    species: '',
    birthday: '',
  })

  const handleInput = (e) => {
    const { name, value } = e.target
    setFields((states) => ({
      ...states,
      [name]: value,
    }))
  }
  const handleCreatePet = async (e) => {
    e.preventDefault();
    try {
        await dispatch(createPet(id, fields));
        setPopupMessage('Pet added successfully!');
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
            setIsAddPetForm(false);
        }, 2000);
  
        setFields({
            name: '',
            species: '',
            birthday: '',
        });
    } catch (error) {
        console.error(error);
        
      setPopupMessage('Failed to add apartment. Please try again.');
      setIsError(true);
      setShowPopup(true);
    }
};


  return (
    <div className="relative">
      <div className="relative w-full flex py-4 rounded-tl-lg rounded-tr-lg  bg-dark-blue text-white items-center ">
        <h1 className="lg:text-xl  ml-5 text-lg font-bold ">Add Pet</h1>
      </div>
      <form
        onSubmit={handleCreatePet}
        className="lg:w-full lg:pt-4 w-[20rem] h-[22rem] px-4 overflow-y-auto"
      >
        <button className="absolute top-4 right-6">
          <IoMdClose
            onClick={() => setIsAddPetForm((prevState) => !prevState)}
            size={25}
            color="white"
          />
        </button>

        {error && (
          <div className=" w-auto bg-light-red text-dark-blue p-4 m-4 rounded ">
            {error}
          </div>
        )}
        <h1 className="text-base font-bold mb-2 lg:mt-0 mt-4">Add Pet Details</h1>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block  text-sm font-bold mb-2 text-dark-gray"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInput}
            value={fields.name}
            required
            placeholder="Enter your Pet name"
            className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="species"
            className="block  text-sm font-bold mb-2 text-dark-gray"
          >
            Specie
          </label>
          <input
            type="text"
            id="species"
            name="species"
            onChange={handleInput}
            value={fields.species}
            placeholder="Enter Specie of pet"
            className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="birthday"
            className="block  text-sm font-bold mb-2 text-dark-gray"
          >
            Birthday
          </label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            onChange={handleInput}
            value={fields.birthday}
            placeholder="Enter birthday of pet"
            className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-end mt-5 mb-3 gap-3">
          <button
            className=" bg-dark-blue text-white font-bold  py-2 px-4 rounded"
          >
            Submit
          </button>

          <button
            className="bg-red-500 bg-red text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsAddPetForm((prevState) => !prevState)}
          >
            Close
          </button>
        </div>
      </form>
      {showPopup && (
          <Popup 
            message={popupMessage} 
            onClose={() => setShowPopup(false)} 
            error={error}
          />
        )}
    </div>
  )
}

export default AddPet
