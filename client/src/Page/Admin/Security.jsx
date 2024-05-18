import React, { useState, useRef, useEffect } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Webcam from 'react-webcam'
import AddCamera from '../../Component/AdminComponent/AddCamera'

const Security = () => {
  const [isOpenTripleDots, setIsOpenTripleDots] = useState([])
  const [showCameraFeed, setShowCameraFeed] = useState([])
  const [cameras, setCameras] = useState([])
  const [availableCameras, setAvailableCameras] = useState([])
  const [isAddCameraForm, setIsAddCameraForm] = useState(false)
  const [isHovered, setIsHovered] = useState(Array(cameras.length).fill(false))

  const webcamRef = useRef(null)
  const tripleDotsRefs = useRef([])

  useEffect(() => {
    const getCameras = async () => {
      try {
        const cameras = await navigator.mediaDevices.enumerateDevices()
        const videoDevices = cameras.filter(
          (device) => device.kind === 'videoinput',
        )
        setAvailableCameras(videoDevices)
      } catch (error) {
        console.error('Error accessing camera devices:', error)
      }
    }

    getCameras()
  }, [])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const isOutsideMenu = !tripleDotsRefs.current.some(
        (ref) => ref && ref.contains(event.target),
      )
      if (isOutsideMenu) {
        setIsOpenTripleDots(Array(cameras.length).fill(false))
      }
    }

    document.body.addEventListener('click', handleOutsideClick)

    return () => {
      document.body.removeEventListener('click', handleOutsideClick)
    }
  }, [cameras])

  const addCamera = ({ name, deviceId }) => {
    setCameras((prevCameras) => [...prevCameras, { name, deviceId }])
    setShowCameraFeed((prevState) => [...prevState, true])
    setIsOpenTripleDots((prevState) => [...prevState, false])
  }

  const handleToggleCamera = (index) => {
    setIsOpenTripleDots((prevState) =>
      prevState.map((item, i) => (i === index ? true : item)),
    )
  }

  const handleCloseCamera = (index) => {
    setShowCameraFeed((prevState) =>
      prevState.map((item, i) => (i === index ? !item : item)),
    )
    setIsOpenTripleDots((prevState) =>
      prevState.map((item, i) => (i === index ? false : item)),
    )
  }

  const handleDeleteCamera = (index) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this camera?',
    )
    if (isConfirmed) {
      setCameras((prevCameras) =>
        prevCameras.filter((camera, i) => i !== index),
      )
      setShowCameraFeed((prevState) =>
        prevState.filter((feed, i) => i !== index),
      )
    }
  }

  return (
    <>
      <div className='w-full h-full bg-white1'>
        <div className="w-11/12 mx-auto">
          <div className="flex justify-between items-center p-4">
            <div>
              <h1 className="font-bold h-fit m-auto py-5 lg:py-0">
                Security/CCTV Live Feeds
              </h1>
            </div>
            <div>
              <button
                onClick={() => setIsAddCameraForm(true)}
                className="btn text-white lg:px-5 lg:py-3 px-2 py-1 text-xs uppercase bg-primary-color"
              >
                <IoMdAdd size={15} /> Add CCTV
              </button>
            </div>
          </div>
        </div>
        {/* Container */}
        <div className="grid lg:grid-cols-4 gap-2 mb-10">
          {/* Boxes */}
          {cameras.map((camera, index) => (
            <div
              key={index}
              className="col-span-2 relative"
              onMouseEnter={() =>
                setIsHovered((prevState) =>
                  prevState.map((item, i) => (i === index ? true : item)),
                )
              }
              onMouseLeave={() =>
                setIsHovered((prevState) =>
                  prevState.map((item, i) => (i === index ? false : item)),
                )
              }
            >
              <div className="relative h-full">
                {/* Camera Feed */}
                {showCameraFeed[index] ? (
                  <div className="w-full h-auto relative">
                    <Webcam
                      audio={false}
                      screenshotFormat="image/jpeg"
                      width="100%"
                      height="100%"
                      ref={webcamRef}
                      videoConstraints={{ deviceId: camera.deviceId }}
                    />
                    {/* Name and Triple Dots */}
                    <div
                      className={`absolute top-0 right-0 p-2 flex justify-between items-center bg-primary-color text-white rounded-tr-md `}
                      ref={(el) => (tripleDotsRefs.current[index] = el)}
                    >
                      <div className="mr-2 text-sm">{camera.name}</div>
                      <div className="cursor-pointer">
                        <BsThreeDotsVertical
                          onClick={() => handleToggleCamera(index)}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-80">
                    <span>Camera is closed</span>
                  </div>
                )}
                {/* Triple Dots Menu */}
                {isOpenTripleDots[index] && (
                  <div className="absolute right-0 top-0 mt-8 z-10">
                    <div className="bg-white w-36 cursor-pointer shadow-md shadow-gray">
          
                      <div
                        onClick={() => handleDeleteCamera(index)}
                        className="p-2 cursor-pointer hover:bg-primary-color hover:text-white"
                      >
                        Delete
                      </div>
                      <div className="p-2 cursor-pointer hover:bg-primary-color hover:text-white">
                        Refresh
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isAddCameraForm && (
        <div className="fixed top-0 left-0 w-full h-full flex z-50 items-center justify-center bg-black bg-opacity-50 ">
          <div className="lg:w-1/2 h-[30rem] bg-white rounded-lg relative">
            <AddCamera
              addCamera={addCamera}
              setIsAddCameraForm={setIsAddCameraForm}
              availableCameras={availableCameras}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Security
