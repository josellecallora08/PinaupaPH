import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BiEdit } from 'react-icons/bi'
import EditOwnerDetails from '../../Component/EditOwnerDetails'
import ChangePd from '../../Component/ChangePd'
import { isLoggedin } from '../../features/authentication'
import { changeProfile, editUser } from '../../features/user'
import { fetchApartments } from '../../features/apartment'
import ProfileEditAccount from '../../Component/AdminComponent/ProfileEditAccount'
import MessageToast from '../../Component/ToastComponent/MessageToast'

const Profile = () => {
  const [update, setUpdate] = useState(false)
  const [modal, setIsModalOpen] = useState(false)
  const [changeModal, setchangeModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const user = useSelector((state) => state.auth.user)
  const data = useSelector((state) => state.user.data)
  const single = useSelector((state) => state.user.single)
  const error = useSelector((state) => state.user.error)
  const msg = useSelector((state) => state.user.msg)
  const apartment = useSelector((state) => state.apartment.data)
  const [isProfileEditAccount, setIsProfileEditAccount] = useState(false)
  const dispatch = useDispatch()
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }
  const toggleEditAccount = () => {
    setIsProfileEditAccount(!isProfileEditAccount)
  }
  const handleConfirm = (e) => {
    e.preventDefault()
    // const userId = user?.role === "Admin" || user?.role === "Superadmin" ? user?._id : user?._id
    dispatch(
      changeProfile(user._id, user?.profile_image.public_id, selectedFile),
    )
    setUpdate(true)
    setchangeModal(false)
    setIsVisible((prevState) => !prevState)
  }

  const [fields, setFields] = useState({
    username: user?.username || '',
    password: '',
    newpassword: '',
    confirmpassword: '',
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
    setIsProfileEditAccount((prevState) => !prevState)
    setIsVisible(true)
  }

  useEffect(() => {
    dispatch(isLoggedin())
  }, [update, setUpdate, handleSubmit])

  useEffect(() => {
    dispatch(fetchApartments())
  }, [])
  return (
    <>
      {isVisible && (
        <MessageToast
          message={msg}
          error={error}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      )}
      {modal && (
        <EditOwnerDetails
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          error={error}
          msg={msg}
          user={user}
          data={data}
          single={single}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {changeModal && (
        <ChangePd
          userImage={user?.profile_image.image_url}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          handleFileChange={handleFileChange}
          setChangeModal={setchangeModal}
          handleConfirm={handleConfirm}
        />
      )}

      <div className="flex flex-col gap-5 w-full h-full py-5 bg-white1">
        <p className="h-full max-h-5 text-2xl font-bold w-11/12 m-auto py-2">
          PROFILE
        </p>
        {/* Profile / landlord */}
        <div className="w-full h-full mt-2 ">
          <div className="flex justify-center w-11/12 h-full m-auto rounded-md shadow-md flex-col md:flex-row bg-white">
            <div className="flex flex-col w-full h-full">
              <div className="flex justify-center items-center w-full h-full py-4">
                <figure className=" border-black border-2 cursor-pointer flex justify-center items-center w-full h-full md:max-w-60 md:max-h-60  max-w-40 max-h-40 rounded-full ">
                  <img
                    src={
                      user?.role === 'Admin' || user?.role === 'Superadmin'
                        ? user?.profile_image.image_url
                        : user?.user_id.profile_image.image_url
                    }
                    className="w-full h-full p-1 rounded-full"
                    onClick={() => setchangeModal((prevState) => !prevState)}
                  />
                </figure>
              </div>
              <div className="w-full h-full max-h-10 flex justify-center items-center py-6">
                <p className="md:text-2xl text-base uppercase font-bold">
                  {user?.role === 'Admin' || user?.role === 'Superadmin'
                    ? user?.name
                    : user?.user_id.name}
                </p>
              </div>
            </div>

            <div className="w-full h-full flex flex-col ">
              {/* Details */}
              <div className="w-full h-full flex-col flex">
                <div className="w-full h-full max-h-12 px-4 py-2 text-white bg-[#183044] flex items-center justify-between">
                  <p className="md:text-xl text-base">PERSONAL DETAILS</p>
                  <BiEdit
                    className="h-20 w-7 cursor-pointer hover:scale-125 duration-300"
                    onClick={() => setIsModalOpen((prevState) => !prevState)}
                  />
                </div>

                <div className="w-full h-full flex flex-col px-4 py-2">
                  <div className="w-full flex m-auto">
                    <p className="w-[170px] pb-2">Phone No.</p>
                    <p>
                      {user?.role === 'Admin' || user?.role === 'Superadmin'
                        ? user?.mobile_no
                        : user?.user_id.mobile_no}
                    </p>
                  </div>

                  <div className="w-full flex m-auto">
                    <p className="w-[170px] pb-2">Email Address</p>
                    <p>
                      {user?.role === 'Admin' || user?.role === 'Superadmin'
                        ? user?.email
                        : user?.user_id.email}
                    </p>
                  </div>

                  <div className="w-full flex m-auto">
                    <p className="w-[170px]">Date of Birth</p>
                    <p>
                      {new Date(
                        user?.role === 'Admin' || user?.role === 'Superadmin'
                          ? user?.birthday
                          : user?.user_id.birthday,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account */}

              <div className="w-full h-full flex-col flex">
                <div className="w-full h-full max-h-12 py-2 px-4 text-white bg-[#183044] flex items-center justify-between ">
                  <p className="md:text-xl text-base">ACCOUNTS</p>
                  <BiEdit
                    className="h-20 w-7 cursor-pointer hover:scale-125 duration-300"
                    onClick={toggleEditAccount}
                  />
                </div>

                <div className="w-full flex flex-col px-4 py-3 ">
                  <div className="w-full flex m-auto pb-2">
                    <p className="w-[170px]">Username</p>
                    <p>
                      {user?.role === 'Admin' || user?.role === 'Superadmin'
                        ? user?.username
                        : user?.user_id.username}
                    </p>
                  </div>

                  <div className="w-full flex m-auto">
                    <p className="w-[170px]">Password</p>
                    <p>***********</p>
                  </div>
                </div>
                {isProfileEditAccount && (
                  <div className="fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center bg-black bg-opacity-50">
                    <div className="lg:w-1/2 bg-white rounded-lg">
                      <ProfileEditAccount
                        handleInput={handleInput}
                        handleSubmit={handleSubmit}
                        fields={fields}
                        setIsProfileEditAccount={setIsProfileEditAccount}
                        error={error}
                        msg={msg}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Apartment Details */}
        <div className="w-full h-full ">
          {user?.role !== 'Superadmin' && (
            <p className="h-full max-h-5 text-2xl font-bold w-11/12 m-auto py-8 mb-4">
              APARTMENT DETAILS
            </p>
          )}

          <div className="flex flex-wrap gap-3 pb-10">
            {user?.role !== 'Superadmin' &&
              apartment &&
              apartment.map((val, key) => (
                <div
                  key={key}
                  className="w-11/12 md:h-full md:max-w-[500px] md:max-h-[300px] overflow-hidden bg-white rounded-md shadow-md md:mx-[52px] mx-4"
                >
                  <div className="w-full h-full max-h-12 px-4 py-2 text-white bg-[#183044] flex items-center">
                    <p>APARTMENT NO. {key + 1}</p>
                  </div>

                  <div className="w-full flex flex-col">
                    <div className="w-full h-full flex px-4 py-2">
                      <p className="w-[170px]">Apartment Name:</p>
                      <p>{val?.name}</p>
                    </div>
                    <div className="w-full h-full flex px-4 py-2">
                      <p className="w-[170px]">Address:</p>
                      <p>{val?.address}</p>
                    </div>

                    <div className="w-full h-full flex px-4 py-2">
                      <p className="w-[170px]">Total House:</p>
                      <p>{val?.units?.length}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
