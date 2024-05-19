import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isLoggedin } from '../features/authentication'
import { editUser } from '../features/user'
import { IoMdClose } from 'react-icons/io'

function EditOwnerDetails({
  isVisible,
  setIsVisible,
  error,
  msg,
  user,
  data,
  single,
  setIsModalOpen,
}) {
  // const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const [fields, setFields] = useState({
    name: user?.name || '',
    birthday: user?.birthday
      ? new Date(user?.birthday)?.toISOString().split('T')[0]
      : '',
    mobile_no: user?.mobile_no || '',
    email: user?.email || '',
  })

  const handleInput = (e) => {
    const { name, value } = e.target
    setFields({
      ...fields,
      [name]: value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(editUser(user?._id, fields))
    setIsModalOpen((prevState) => !prevState)
    setIsVisible(true)
  }
  useEffect(() => {
    dispatch(isLoggedin())
  }, [handleSubmit])

  return (
    <div className="fixed w-full h-full flex items-center justify-center ">
      <div
        className="absolute w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-sm"
        onClick={() => setIsModalOpen((prevState) => !prevState)}
      ></div>
      <div className="relative lg:w-1/2 w-full mx-10  h-fit mt-20 bg-white z-10 rounded-md shadow-md flex flex-col overflow-hidden">
        <h1 className="bg-[#183044] uppercase font-bold tracking-wider text-white p-3">
          EDIT LANDLORD DETAILS
        </h1>
        <div className="w-full flex justify-between py-5 h-full">
          <form
            onSubmit={handleSubmit}
            method="POST"
            className="w-full px-5 h-full m-auto flex flex-col gap-3 z-10"
          >
            <button type="button" className="absolute top-3 right-6">
              <IoMdClose
                onClick={() => setIsModalOpen((prevState) => !prevState)}
                size={20}
                color="white"
              />
            </button>
            <div>
              <label htmlFor="">Name</label>
              <div className="w-full h-full max-h-12 border-2 border-[#183044] rounded-md overflow-hidden">
                <input
                  type="text"
                  name="name"
                  value={fields.name}
                  onChange={handleInput}
                  placeholder="Name"
                  className="w-full h-full p-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="">Email Address</label>
              <div className="w-full h-full max-h-12 border-2 border-[#183044] rounded-md overflow-hidden">
                <input
                  type="email"
                  name="email"
                  value={fields.email}
                  onChange={handleInput}
                  placeholder="Email"
                  className="w-full h-full p-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="">Birthday</label>
              <div className="w-full h-full max-h-12 border-2 border-[#183044] rounded-md overflow-hidden">
                <input
                  type="date"
                  name="birthday"
                  value={fields.birthday}
                  onChange={handleInput}
                  className="w-full h-full p-3 outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="">Contact</label>
              <div className="w-full h-full max-h-12 border-2 border-[#183044] rounded-md overflow-hidden">
                <input
                  type="text"
                  name="mobile_no"
                  placeholder="Contact"
                  value={fields.mobile_no}
                  onChange={handleInput}
                  className="w-full h-full p-3 outline-none"
                />
              </div>
            </div>

            <div className="w-full h-full flex  justify-end mt-6">
              <button
                type="submit"
                className=" font-semibold w-[120px] border border-primary-color text-white  rounded-md bg-primary-color p-2 mr-2"
              >
                Submit
              </button>

              <button
                onClick={() => setIsModalOpen((prevState) => !prevState)}
                className=" bg-red text-white font-semibold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditOwnerDetails
