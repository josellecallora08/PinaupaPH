import logImg from '/login.svg'
import logo from '/pinaupa-logo.svg'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { isLogin, isLoggedin } from '../features/authentication'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(credentials)
    dispatch(isLogin(credentials, navigate))
  }

  useEffect(() => {
    dispatch(isLoggedin(navigate))
  }, [dispatch, navigate])

  return (
    <div className=" overflow-hidden max-h-screen max-w-screen">
      <div className="hidden lg:flex lg:items-center lg:justify-between w-screen px-20 pt-5">
        <div>
          <img src={logo} alt="logo" className=" w-40 h-auto" />
        </div>
      </div>

      <div className=" flex flex-col w-screen h-screen items-center lg:flex-row justify-center">
        <div className="my-30 lg:hidden">
          <div>
            <img src={logo} alt="logo" />
          </div>
        </div>
        <form
          className="flex flex-col gap-2 w-full px-20 lg:w-1/2"
          onSubmit={handleSubmit}
        >
          <div className=" hidden lg:block lg:-mt-20 -mt-40">
            <h1 className="text-dark-blue text-4xl font-medium">Log In</h1>
            <p className="lg:py-2 text-dark-gray text-lg ">
              Log in to your apartment rental management software.
            </p>
          </div>
          <p className="text-dark-gray text-left mb-3 lg:hidden">
            Login to your Account
          </p>
          <div>
            <label className="relative cursor-pointer">
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={credentials.username}
                className=" text-lg text-black font-normal bg-gray rounded-lg  outline-none placeholder-dark-gray placeholder-opacity-0 pt-7 pl-2 pb-2 w-full"
                onChange={handleInputChange}
              />
              <span className="text-medium text-light-gray text-opacity-80  absolute left-1 bottom-5 px-1 ">
                Username
              </span>
            </label>
          </div>
          <div>
            <label className="relative cursor-pointer">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={credentials.password}
                className=" text-lg text-black font-normal bg-gray rounded-lg  outline-none placeholder-dark-gray placeholder-opacity-0 pt-7 pl-2 pb-2 w-full"
                onChange={handleInputChange}
              />
              <span className="text-medium text-light-gray text-opacity-80  absolute left-1 bottom-5 px-1 ">
                Password
              </span>
            </label>
          </div>
          <button
            className="lg:mt-2 py-4 rounded-lg text-white bg-dark-blue text-xl hover:opacity-80"
            type="submit"
          >
            Login
          </button>
        </form>

        <div className="hidden lg:block mb-40 mt-20">
          <img src={logImg} alt="login" className=" w-9/12" />
        </div>
      </div>
    </div>
  )
}

export default Login
