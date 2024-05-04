import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';

const Security = () => {
  const [cameras, setCameras] = useState([]);
  const [selectedCameras, setSelectedCameras] = useState([]);
  const [showCameras, setShowCameras] = useState(false);

  useEffect(() => {
    const getCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setCameras(videoDevices);
        setSelectedCameras(Array(videoDevices.length).fill('')); // Initialize selected cameras with empty strings
        setShowCameras(true);
      } catch (error) {
        console.error('Error fetching cameras:', error);
      }
    };

    getCameras();
  }, []);

  const handleCameraChange = (index, deviceId) => {
    setSelectedCameras(prevCameras =>
      prevCameras.map((prevDeviceId, i) => (i === index ? deviceId : prevDeviceId))
    );
  };

  const handleCloseCamera = (index) => {
    setSelectedCameras(prevCameras =>
      prevCameras.map((prevDeviceId, i) => (i === index ? '' : prevDeviceId))
    );
  };

  return (
    <div className='w-full h-full bg-white1'>
      <div className='h-full max-h-5 text-2xl font-bold w-11/12 m-auto py-8 mb-4 text-primary-color'>
        SECURITY
      </div>

      <div className='w-11/12 md:h-[400px] h-[270px] flex gap-5 m-auto shadow-md rounded-md border-black border-2 g md:border-solid'></div>

      {/* Camera footages */}
      <div className='w-11/12 md:h-[280px] grid md:grid-cols-3 grid-cols-2 md:gap-6 gap-4 m-auto mt-4'>
        {cameras.map((camera, index) => (
          <div key={camera.deviceId} className='relative'>
            {selectedCameras[index] !== '' && typeof selectedCameras[index] === 'string' && (
              <Webcam
                audio={false}
                videoConstraints={{ facingMode: 'user', deviceId: selectedCameras[index] }}
                screenshotFormat='image/jpeg'
                width={240}
                height={180}
                screenshotQuality={1}
              />
            )}
            <select
              className='absolute top-2 right-2 bg-red text-white px-2 py-1 rounded-md'
              onChange={(e) => handleCameraChange(index, e.target.value)}
              value={selectedCameras[index]}
            >
              <option value='' hidden>Select Camera</option>
              {cameras.map(camera => (
                <option key={camera.deviceId} value={camera.deviceId}>{camera.label}</option>
              ))}
            </select>
            {selectedCameras[index] !== '' && typeof selectedCameras[index] === 'string' && (
              <button
                className='absolute bottom-2 right-2 bg-lime text-white px-2 py-1 rounded-md'
                onClick={() => handleCloseCamera(index)}
              >
                Close Camera
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Security;
