import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import angle from '/angle.svg'
import send from '/send.svg'
import { io } from 'socket.io-client'
import comments from '/comments.svg'
import { createComment, deleteComment } from '../../features/comment'
import sample from '/background.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosCheckboxOutline } from 'react-icons/io'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { LuTrash2 } from 'react-icons/lu'
import { fetchReport } from '../../features/report'
import Loading from '../../Component/LoadingComponent/Loading'
import { fetchComments } from '../../features/socket'
import { isLoggedin } from '../../features/authentication'
const ViewConcern = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const report = useSelector((state) => state.report.single)
  const loading = useSelector((state) => state.report.loading)
  const user = useSelector((state) => state.auth.user)
  // const comment = useSelector((state) => state.comment.data)
  const [comment, setComments] = useState('')
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
    } else {
      console.log('Deletion cancelled')
    }
  }
  useEffect(() => {
    dispatch(isLoggedin())
  }, [])
  console.log(user)
  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent default form submission behavior
    dispatch(createComment(user._id, id, comment)) // Submit the comment
    setComments(null) // Reset the textarea
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
    dispatch(fetchReport(id))
  }, [])

  useEffect(() => {
    dispatch(fetchComments(id))
  }, [])

  useEffect(() => {
    const container = messageContainerRef.current;

    if (container && report && report.comments.length > 0) {
      container.scrollTop = container.scrollHeight;
    }
  }, [report, comment, handleSubmit]);
  return (
    <>
      <div className="w-full h-full flex flex-col pb-5 xl:bg-gray text-primary-color">
        <div className="w-11/12 m-auto h-fit py-2">
          <h1 className="uppercase font-bold">Concern and Issue</h1>
        </div>
        <div className="md:w-11/12 h-full m-auto grid grid-cols-2 grid-flow-row rounded-lg bg-white">
          <div className="col-span-2 xl:col-span-1 xl:row-span-1  p-5  ">
            <div className="w-full h-full grid grid-flow-row gap-5 ">
              {/*  */}
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
                    <div className="py-2 px-10 flex items-center gap-3 cursor-pointer hover:bg-dark-gray/20">
                      <IoIosCheckboxOutline size={20} color="green" /> Resolve
                    </div>
                    <div
                      onClick={handleDelete}
                      className="py-2 px-10 flex items-center gap-3 cursor-pointer hover:bg-dark-gray/20"
                    >
                      <LuTrash2 size={20} color="red" /> Cancel
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
                  <figure className="w-full h-full">
                    <img src={sample} className="w-full h-full" alt="" />
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
                <div className="h-full max-h-20 flex items-center justify-center py-5 bg-primary-color rounded-t-md">
                  <div className="flex items-center  gap-2 ">
                    <figure className="w-full h-full max-w-7">
                      <img src={comments} alt="" />
                    </figure>

                    <p className="font-light tracking-wider text-white">
                      Comments
                    </p>
                  </div>
                </div>
                <div className="w-full h-full " >
                  <div ref={messageContainerRef}
                    className={`w-full h-auto max-h-[600px] font-regular flex flex-col gap-2 px-5 ${report?.comments.length > 5 ? 'hover:overflow-y-scroll' : ''} overflow-hidden`}
                  >
                    {report?.comments.map((val, key) => (
                      <div key={key} className="min-h-12 w-full flex gap-2 items-center overflow-hidden">
                        <figure className="w-full h-full max-w-12 max-h-12 overflow-hidden rounded-full">
                          <img
                            src={val?.user_id?.profile_image.image_url}
                            className="w-full h-full object-contain"
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
                <div className="w-full h-full flex items-center max-h-32 bg-primary-color">
                  <div className="w-11/12 m-auto h-4/5">
                    <form
                      onSubmit={handleSubmit}
                      className="h-full w-full flex items-center gap-2 overflow-hidden"
                    >
                      <textarea
                        name="comment"
                        id="comment"
                        value={comment || ''}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Send Message"
                        className="w-full h-full bg-white  rounded-md outline-none border-2 border-gray p-5"
                      ></textarea>
                      <div className="w-full max-w-fit flex items-center">
                        <button
                          type="submit"
                          className="w-full h-full p-3 flex items-center justify-center  rounded-full hover:bg-white/10"
                        >
                          <figure className="w-full h-full max-w-10 max-h-10 flex justify-center items-center">
                            <img src={send} className="w-full h-full" alt="" />
                          </figure>
                        </button>
                      </div>
                    </form>
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
