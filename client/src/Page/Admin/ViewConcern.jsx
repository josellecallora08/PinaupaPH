import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import angle from '/angle.svg'
import send from '/send.svg'
import { io } from 'socket.io-client'
import comments from '/comments.svg'
import { createComment, deleteComment, insertCommentSuccess } from '../../features/comment'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosCheckboxOutline } from 'react-icons/io'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { LuTrash2 } from 'react-icons/lu'
import { deleteReport, fetchReport, resolveReport } from '../../features/report'
import { fetchComments } from '../../features/comment'
import { isLoggedin } from '../../features/authentication'
import { RiArrowLeftSLine } from "react-icons/ri";

const socket = io(`${import.meta.env.VITE_URL}/`)

const ViewConcern = () => {
  const { id } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const report = useSelector((state) => state.report.single)
  const loading = useSelector((state) => state.report.loading)
  const user = useSelector((state) => state.auth.user)
  const msg = useSelector((state) => state.comment.data)
  const [comment, setComments] = useState(null)
  const messageContainerRef = useRef(null)
  const [isDotOpen, setIsDotOpen] = useState(false)

  const toggleDot = () => {
    setIsDotOpen(!isDotOpen)
  }
  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this Issue?',
    )
    if (isConfirmed) {
      dispatch(deleteReport(id))
    }
  }
  const handleComplete = async () => {
    dispatch(resolveReport(id))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (comment === '' || comment === null) {
      return;
    }

    let user_id = user.role === "Admin" ? user : user.user_id
    socket.emit('send-comment', { user_id, comment, id })
    dispatch(
      createComment(
        user.role === 'Admin' ? user?._id : user?.user_id?._id,
        id,
        comment,
        location.pathname
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
      dispatch(insertCommentSuccess(message));
    };
  
    // Listen for incoming comments
    socket.on('receive-comment', handleReceiveComment);
  
    // Clean up socket connection when the component unmounts
    return () => {
      socket.off('receive-comment', handleReceiveComment);
    };
  }, [dispatch]);
  

  useEffect(() => {
    dispatch(isLoggedin())
    dispatch(fetchReport(id))
    dispatch(fetchComments(id))
  }, [])

  useEffect(() => {
    const container = messageContainerRef.current

    if (container && report && report.comments.length > 0) {
      container.scrollTop = container.scrollHeight
    }
  }, [report, comment, handleSubmit])

  return (
    <>
      <div className="w-full h-full flex flex-col pb-5 xl:bg-gray text-primary-color">
        <div className="w-11/12 m-auto h-fit py-2 gap-5 flex items-center">
          <h1 className="uppercase font-bold"><span className=' hover:cursor-pointer hover:underline mr-1' onClick={() => window.history.back()}>Concern and Issue</span> / View</h1>
        </div>
        <div className="md:w-11/12 h-full  m-auto grid grid-cols-2 grid-flow-row rounded-lg bg-white">
          <div className="col-span-2 xl:col-span-1 xl:row-span-1  p-5  ">
            <div className="w-full h-full grid grid-flow-4 gap-5 ">
         
              <div className=" relative row-span-1 grid grid-cols-2 items-center">
                <div className="col-span-1 h-full flex items-center gap-5">
                  <figure className="w-full h-full max-w-20 max-h-20 rounded-full shadow-xl  overflow-hidden">
                    <img
                      src={report?.sender_id.user_id.profile_image.image_url}
                      className="w-full h-full"
                      alt=""
                    />
                  </figure>
                  <div className="w-full">
                    <p className="text-sm  xl:text-lg font-semibold">
                      {report?.sender_id.user_id.name}
                    </p>
                    <p className="text-xs">
                      <span>UNIT - </span>
                      {report?.sender_id.unit_id.unit_no}
                    </p>
                  </div>
                </div>
                <div className=" col-span-1 xl:w-full xl:mb-4 items-center  text-sm xl:text-base flex justify-end ">
                  <p className="xl:mt-1  ">
                    {new Date(report?.createdAt).toDateString()}
                  </p>
                  <div className="">
                    <BsThreeDotsVertical
                      className="  w-7 h-auto ml-10 cursor-pointer text-primary-color"
                      onClick={toggleDot}
                    />
                  </div>
                </div>

                {isDotOpen && (
                  <div className="absolute top-16 right-6 shadow-sm shadow-dark-gray bg-white  ">
                    {report?.status === false && (
                      <div
                        onClick={handleComplete}
                        className="py-2 px-10 flex items-center gap-3 cursor-pointer hover:bg-dark-gray/20"
                      >
                        <IoIosCheckboxOutline size={20} color="green" /> Resolve
                      </div>
                    )}
                    <div
                      onClick={handleDelete}
                      className="py-2 px-10 flex items-center gap-3 cursor-pointer hover:bg-dark-gray/20"
                    >
                      <LuTrash2 size={20} color="red" /> Delete
                    </div>
                  </div>
                )}
              </div>
              {/*  */}
              <div className="row-auto flex flex-col gap-5">
                <p className="font-bold h-fit">
                  {' '}
                  <span className="uppercase">{report?.title}</span> -{' '}
                  <span>{report?.type}</span>
                </p>
                <div className="h-full text-sm ">
                  <p className="text-ellipsis font-regular xl:max-w-auto max-h-[125px] xl:text-wrap overflow-hidden">
                    {report?.description}
                  </p>
                </div>
              </div>
              {/*  */}
              <div className="row-span-4 w-full h-full bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative w-full h-full min-h-60">
                  <figure className="w-full h-full max-h-[550px]">
                    <img
                      src={report?.attached_image?.image_url}
                      className="w-full h-full object-contain"
                      alt=""
                    />
                  </figure>
                  <div className="absolute top-0 left-5 w-fit h-full flex items-center">
                    <button className="w-full h-full max-w-10 max-h-14 rounded-md hover:bg-gray/40">
                      <img src={angle} className="w-full h-full" alt="" />
                    </button>
                  </div>
                  <div className="absolute top-0 w-fit h-full right-5 flex items-center rotate-180">
                    <button className="w-full h-full max-w-10  max-h-14 rounded-md hover:bg-gray/40">
                      <img src={angle} className="w-full h-full" alt="" />
                    </button>
                  </div>
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
                      Comments
                    </p>
                  </div>
                </div>
                <div className="w-full h-full ">
                  <div
                    ref={messageContainerRef}
                    className={`w-full h-auto max-h-[300px] lg:max-h-[600px] font-regular flex flex-col gap-2 px-5 ${report?.comments.length > 5 ? 'hover:overflow-y-scroll' : ''} overflow-hidden`}
                  >
                    {msg?.map((val, key) => (
                      <div
                        key={key}
                        className="min-h-12 w-full flex gap-2 items-center overflow-hidden"
                      >
                        <figure className=" w-12 h-12 overflow-hidden border shadow-xl rounded-full">
                          <img
                            src={val?.user_id?.profile_image?.image_url}
                            className="w-full h-full  object-contain"
                            alt=""
                          />
                        </figure>
                        <div className="w-fit text-xs md:text-base rounded-md bg-gray/50 p-3">
                          {val.comment}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full h-full flex items-center max-h-32 bg-primary-color py-2">
                  <div className="w-11/12 m-auto h-4/5">
                    {!(report?.status) && <form
                      onSubmit={handleSubmit}
                      className="h-full w-full flex items-center gap-2 overflow-hidden"
                    >
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
                            <img src={send} className="w-full h-full" alt="" />
                          </figure>
                        </button>
                      </div>
                    </form>
                      || <h1 className='h-full flex items-center text-white font-regular text-3xl'>RESOLVED ISSUE</h1>}
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
