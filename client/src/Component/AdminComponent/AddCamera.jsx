import React, { useState} from 'react';
import { IoMdClose } from 'react-icons/io';

const AddCamera = ({ setIsAddCameraForm, addCamera, availableCameras }) => {
  const [cameraName, setCameraName] = useState('');
  const [password, setPassword] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [portNumber, setPortNumber] = useState('');
  const [selectedCamera, setSelectedCamera] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCamera = {
      name: cameraName,
      password: password,
      ipAddress: ipAddress,
      portNumber: portNumber,
      deviceId: selectedCamera
    };
    addCamera(newCamera);
    setIsAddCameraForm(false);
  }

  return (
    <div  className="relative">
      <div className="relative w-full flex py-4 rounded-tl-lg rounded-tr-lg bg-dark-blue text-white items-center ">
        <h1 className="lg:text-xl  ml-5 text-lg font-bold ">Add Camera</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="lg:w-full lg:pt-4 w-[20rem] h-[25rem] px-4 overflow-y-auto"
      >
        <button className="absolute top-4 right-6">
          <IoMdClose
            onClick={() => setIsAddCameraForm((prevState) => !prevState)}
            size={25}
            color="white"
          />
        </button>
  
        <h1 className="text-base font-bold mb-2">CCTV Configuration</h1>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block  text-sm font-bold mb-2 text-primary-color"
          >
            Name of the Camera
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={cameraName}
            onChange={(e) => setCameraName(e.target.value)}
            required
            placeholder="Enter Camera Name"
            className="text-sm shadow appearance-none border border-primary-color rounded w-full py-2 px-3 text- leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block  text-sm font-bold mb-2 text-primary-color"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="text-sm shadow appearance-none border border-primary-color rounded w-full py-2 px-3 text- leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="ipaddress"
            className="block  text-sm font-bold mb-2 text-primary-color"
          >
            IP Address
          </label>
          <input
            type="text"
            id="ipaddress"
            name="ipaddress"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            placeholder="Enter IP Address"
            className="text-sm shadow appearance-none border border-primary-color rounded w-full py-2 px-3 text- leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="port"
            className="block  text-sm font-bold mb-2 text-primary-color"
          >
            Port
          </label>
          <input
            type="text"
            id="port"
            name="port"
            value={portNumber}
            onChange={(e) => setPortNumber(e.target.value)}
            placeholder="Enter Port"
            className="text-sm shadow appearance-none border border-primary-color rounded w-full py-2 px-3 text- leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="selectCamera"
            className="block  text-sm font-bold mb-2 text-primary-color"
          >
            Select Camera
          </label>
          <select
            id="selectCamera"
            name="selectCamera"
            value={selectedCamera}
            onChange={(e) => setSelectedCamera(e.target.value)}
            className="text-sm shadow appearance-none border border-primary-color rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Camera</option>
            {availableCameras.map(camera => (
              <option key={camera.deviceId} value={camera.deviceId}>{camera.label || `Camera ${camera.deviceId}`}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-end mt-5 mb-3 gap-3">
          <button
            type="submit"
            className=" bg-dark-blue text-white font-bold  py-2 px-4 rounded"
          >
            Submit
          </button>

          <button
            className=" bg-red text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsAddCameraForm((prevState) => !prevState)}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCamera;
