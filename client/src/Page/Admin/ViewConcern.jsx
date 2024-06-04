import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import send from '/send.svg'
import { io } from 'socket.io-client'
import noimage from '/noimage.svg'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import comments from '/comments.svg'
import { createComment, insertCommentSuccess } from '../../features/comment'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosCheckboxOutline } from 'react-icons/io'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { LuTrash2 } from 'react-icons/lu'
import {
  deleteConcern,
  fetchConcern,
  resetConcernStatus,
  resolveConcern,
} from '../../features/concern'
import { fetchComments } from '../../features/comment'
import { isLoggedin } from '../../features/authentication'
import PopUp from '../../Component/PopUp'
import { FaEdit } from 'react-icons/fa'
import EditReportForm from '../../Component/Tenant Component/EditReportForm'
const socket = io(`${import.meta.env.VITE_URL}/`)

const ViewConcern = () => {
  const { id } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const concern = useSelector((state) => state.concern.single)
  const loading = useSelector((state) => state.concern.loading)
  const user = useSelector((state) => state.auth.user)
  const convo = useSelector((state) => state.comment.data)
  const [comment, setComments] = useState(null)
  const messageContainerRef = useRef(null)
  const [isDotOpen, setIsDotOpen] = useState(false)
  const navigate = useNavigate()
  const [popupMessage, setPopupMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const msgConcern = useSelector((state) => state.concern.msg)
  const errorConcern = useSelector((state) => state.concern.error)
  const [showEditForm, setShowEditForm] = useState(false)
  const toggleDot = () => {
    setIsDotOpen(!isDotOpen)
  }
  const handleEditButtonClick = () => {
    setShowEditForm(!showEditForm)
  }

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this Issue?',
    )
    if (isConfirmed) {
      dispatch(deleteConcern(id, navigate))
    }
  }

  const handleComplete = async () => {
    dispatch(resolveConcern(id))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (comment === '' || comment === null) {
      return
    }

    let user_id = user.role === 'Admin' ? user : user.user_id
    socket.emit('send-comment', { user_id, comment, id })
    dispatch(
      createComment(
        user.role === 'Admin' ? user?._id : user?.user_id?._id,
        id,
        comment,
        location.pathname,
      ),
    ) // Submit the comment
    setComments(null)
  }
  useEffect(() => {
    const sendMessage = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleSubmit(e)
        setComments(null)
      }
    }

    document.addEventListener('keydown', sendMessage)

    return () => {
      document.removeEventListener('keydown', sendMessage)
    }
  }, [handleSubmit])

  useEffect(() => {
    const handleReceiveComment = (message) => {
      dispatch(insertCommentSuccess(message))
    }

    // Listen for incoming comments
    socket.on('receive-comment', handleReceiveComment)

    // Clean up socket connection when the component unmounts
    return () => {
      socket.off('receive-comment', handleReceiveComment)
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(isLoggedin())
    dispatch(fetchComments(id))
  }, [])

  useEffect(() => {
    dispatch(fetchConcern(id))
  }, [])

  useEffect(() => {
    const container = messageContainerRef.current

    if (container && concern && concern.comments?.length > 0) {
      container.scrollTop = container.scrollHeight
    }
  }, [concern, comment, handleSubmit])
  useEffect(() => {
    if (msgConcern !== null) {
      setPopupMessage(msgConcern)
    } else if (errorConcern !== null) {
      setPopupMessage(errorConcern)
    }

    if (msgConcern !== null || errorConcern !== null) {
      setShowPopup(true)
      setTimeout(() => {
        setShowPopup(false)
        dispatch(resetConcernStatus())
      }, 3000)
    }
  }, [msgConcern, errorConcern])
  return (
    <>
      <div className=" overflow-y-auto w-full h-full flex flex-col pb-5 xl:bg-gray text-primary-color">
        <div className="w-11/12 m-auto h-fit py-2 gap-5 flex items-center">
          <h1 className="uppercase font-bold">
            <span
              className=" hover:cursor-pointer hover:underline mr-1"
              onClick={() => window.history.back()}
            >
              Concern and Issue
            </span>{' '}
            / View
          </h1>
        </div>
        <div className="md:w-11/12 h-fit  m-auto grid grid-cols-2 grid-flow-row rounded-lg bg-white">
          <div className="col-span-2 xl:col-span-1 xl:row-span-1  p-5  ">
            <div className="w-full h-full grid grid-flow-4 gap-5 ">
              <div className=" relative row-span-1 grid grid-cols-2 items-center">
                <div className="col-span-1 h-full flex items-center gap-5">
                  <figure className="w-full h-full max-w-10 max-h-10 rounded-full shadow-xl  overflow-hidden">
                    <img
                      src={concern?.sender_id?.user_id.profile_image.image_url}
                      className="w-full h-full"
                      alt=""
                    />
                  </figure>
                  <div className="w-full">
                    <p className="text-sm  xl:text-lg font-semibold">
                      {concern?.sender_id?.user_id.name}
                    </p>
                    <p className="text-xs">
                      <span>UNIT - </span>
                      {concern?.sender_id?.unit_id.unit_no}
                    </p>
                  </div>
                </div>
                <div className="col-span-1 xl:w-full xl:mb-4 items-center text-sm xl:text-base flex justify-end">
                  <p className="xl:mt-1 text-xs">
                    {new Date(concern?.createdAt).toDateString()}
                  </p>
                  {(user?.role !== 'Admin' || concern?.status) && (
                    <div>
                      <BsThreeDotsVertical
                        className="w-7 h-auto ml-10 cursor-pointer text-primary-color"
                        onClick={toggleDot}
                      />
                    </div>
                  )}
                </div>

                {isDotOpen && (
                  <div
                    className={`absolute top-9 z-50 right-6 shadow-sm shadow-dark-gray bg-white rounded-md overflow-hidden animate-slideIn transition-transform transform origin-top`}
                  >
                    {concern?.status === false &&
                      user?.user_id?.role === 'Tenant' && (
                        <div
                          onClick={handleComplete}
                          className="flex items-center  gap-4 px-4 py-2 text-primary-color hover:bg-primary-color hover:text-white rounded-md w-full focus:outline-none transition duration-300 cursor-pointer"
                        >
                          <IoIosCheckboxOutline size={20} /> Resolve
                        </div>
                      )}
                    <div
                      onClick={handleDelete}
                      className="flex items-center  gap-4 px-4 py-2 text-primary-color hover:bg-primary-color hover:text-white rounded-md w-full focus:outline-none transition duration-300 cursor-pointer"
                    >
                      <LuTrash2 size={20} color="red" /> Delete
                    </div>

                    {user?.user_id?.role === 'Tenant' && (
                      <div
                        onClick={handleEditButtonClick}
                        className="flex items-center  gap-4 px-4 py-2 text-primary-color hover:bg-primary-color hover:text-white rounded-md w-full focus:outline-none transition duration-300 cursor-pointer"
                      >
                        <FaEdit size={20} /> Edit
                      </div>
                    )}
                  </div>
                )}
              </div>
              {showEditForm && (
                <EditReportForm
                  concern={concern}
                  setShowEditForm={setShowEditForm}
                />
              )}
              {/*  */}
              <div className="row-auto flex flex-col gap-5">
                <p className="font-bold h-fit">
                  {' '}
                  <span className="uppercase">{concern?.title}</span> -{' '}
                  <span>{concern?.type}</span>
                </p>
                <div className="h-full text-sm ">
                  <p className=" text-ellipsis font-regular xl:w-96 overflow-y-auto max-h-[125px] xl:text-wrap overflow-hidden">
                    {concern?.description}
                  </p>
                </div>
              </div>
              {/*  */}
              <div className="row-span-4 w-full  bg-white1 rounded-xl shadow-md overflow-hidden">
                <div className="relative w-full h-full min-h-60 xl:h-[600px]">
                  {concern?.attached_image &&
                  concern?.attached_image?.length > 0 ? (
                    <Carousel
                      infiniteLoop={true}
                      swipeable={true}
                      arrowStyle={{ color: 'red' }}
                    >
                      {concern?.attached_image?.map((image, index) => (
                        <figure
                          className="w-full h-full max-w-[500px] lg:max-w-full m-auto xl:h-[600px]"
                          key={index}
                        >
                          <img
                            src={image?.image_url}
                            className="w-full h-full object-contain"
                            alt=""
                          />
                        </figure>
                      ))}
                    </Carousel>
                  ) : (
                    <img
                      src={noimage}
                      className="w-full h-full object-contain"
                    />
                  )}

                  {/* <div className="absolute top-0 left-0 w-fit h-full flex items-center">
                    <button className="w-full h-full max-w-10 max-h-14 rounded-md hover:bg-gray/40">
                      <img src={angle} className="w-full h-full" alt="" />
                    </button>
                  </div>
                  <div className="absolute top-0 w-fit h-full right-5 flex items-center rotate-180">
                    <button className="w-full h-full max-w-10  max-h-14 rounded-md hover:bg-gray/40">
                      <img src={angle} className="w-full h-full" alt="" />
                    </button>
                  </div> */}
                </div>
              </div>
              {/*  */}
            </div>
          </div>

          <div className="col-span-2 xl:col-span-1 xl:row-span-1 p-5">
            <div className="w-full h-full flex flex-col">
              <div className="w-full xl:w-11/12 h-full m-auto flex flex-col rounded-xl border-2 border-primary-color overflow-hidden">
                <div className="h-full max-h-10 lg:max-h-20 flex items-center justify-center py-5 bg-primary-color rounded-t-md">
                  <div className="flex items-center gap-2 ">
                    <figure className="w-full h-full max-w-7">
                      <img src={comments} alt="" />
                    </figure>

                    <p className="font-light tracking-wider text-white">
                      Conversation
                    </p>
                  </div>
                </div>
                <div className="w-full h-[300px] lg:h-full ">
                  <div
                    ref={messageContainerRef}
                    className={`w-full h-auto md:max-h-[500px] lg:max-h-[650px] max-h-[300px] font-regular  gap-2 px-5 ${concern?.comments?.length > 5 ? 'hover:overflow-y-scroll' : ''} overflow-hidden`}
                  >
                    {convo?.map((val, key) => (
                      <div
                        key={key}
                        className={`min-h-12 py-2 h-auto flex ${(val.user_id?._id === user?._id && ' flex-row-reverse') || (val.user_id?._id === user?.user_id?._id && ' flex-row-reverse')} gap-2 overflow-hidden`}
                      >
                        <figure className=" w-12 h-12 overflow-hidden border shadow-xl rounded-full">
                          <img
                            src={val?.user_id?.profile_image?.image_url}
                            className="w-full h-full"
                            alt=""
                          />
                        </figure>
                        <div className="w-4/6 h-auto">
                          <div className="w-full h-auto break-words text-ellipsis overflow-hidden shadow-md text-xs md:text-base rounded-xl bg-gray/50 p-3">
                            {val.comment}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full h-full flex items-center max-h-32 bg-primary-color py-2">
                  <div className="w-11/12 m-auto h-4/5">
                    {(!concern?.status && (
                      <form
                        onSubmit={handleSubmit}
                        className="h-full w-full flex items-center gap-2 overflow-hidden"
                      >
                        {/* check */}

                        <textarea
                          name="comment"
                          id="comment"
                          value={comment || ''}
                          onChange={(e) => setComments(e.target.value)}
                          placeholder="Send Message"
                          className="w-full h-full bg-white rounded-md outline-none border-2 border-gray lg:p-2"
                        ></textarea>
                        <div className="w-full max-w-fit flex items-center">
                          <button
                            type="submit"
                            className="w-full h-full p-3 flex items-center justify-center  rounded-full hover:bg-white/10"
                          >
                            <figure className="w-full h-full max-w-5 max-h-5 md:max-w-10 md:max-h-10 flex justify-center items-center">
                              <img
                                src={send}
                                className="w-full h-full"
                                alt=""
                              />
                            </figure>
                          </button>
                        </div>
                      </form>
                    )) || (
                      <h1 className="h-full flex items-center text-white font-regular text-3xl">
                        RESOLVED ISSUE
                      </h1>
                    )}

                    {showPopup && (
                      <PopUp
                        message={popupMessage}
                        onClose={() => setShowPopup(false)}
                        isError={errorConcern}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewConcern
