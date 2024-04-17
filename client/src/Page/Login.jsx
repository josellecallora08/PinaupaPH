import logImg from '/login.svg'
import logo from '/logo.svg'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isLoggedin, isLogin } from '../features/authentication'
import { useNavigate, Link } from 'react-router-dom'
import SearchLoading from '../Component/LoadingComponent/Loading'
import { fetchUser } from '../features/user'

const Login = () => {
  const navigate = useNavigate()
  const loading = useSelector((state) => state.auth.loading)
  const error = useSelector((state) => state.auth.error)

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
    dispatch(isLogin(credentials, navigate))
  }

  useEffect(() => {
    dispatch(isLoggedin())
  })

  return (
    <>
      {loading ? (
        <SearchLoading />
      ) : (
        <div className="w-full h-screen py-5">
          <div className="  lg:items-start lg:ml-28 flex flex-col items-center justify-center ">
            <Link to={'/'} className='flex justify-center'>
              <img
                src={logo}
                alt="PinaupaPH logo"
                className="lg:w-48 w-1/2 my-10"
              />
            </Link>
          </div>
          <div className="lg:flex lg:w-full lg:flex-row-reverse items-center lg:justify-between mx-10 ">
            <img
              src={logImg}
              alt=""
              className="lg:w-1/3 lg:mr-24 w-10/12 mb-7 ml-8"
            />
            <p className="lg:hidden text-lg text-dark-gray">
              Sign in your account
            </p>
            <form className="lg:w-1/3 lg:ml-20 lg:rounded-md lg:p-10 lg:h-fit lg:bg-white lg:shadow-md ">
              <h1 className="lg:text-4xl lg:font-bold lg:block hidden ">
                Sign In
              </h1>
              {error && <p className="text-red border border-red/50 font-regular mt-5 rounded-xl shadow-md bg-red/10 p-5">{error}</p>}
              <div className="flex flex-col text-lg text-primary-color font-semibold mt-3">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="username"
                  onChange={handleInputChange}
                  placeholder="e.g juan.delacruz@gmail.com"
                  className="border-2 bg-white1 border-dark-gray w-full p-3 rounded-md"
                  value={credentials.username}
                />
              </div>
              <div className="flex flex-col text-lg text-primary-color font-semibold mt-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  placeholder="********"
                  className="border-2 bg-white1 border-dark-gray w-full p-3 rounded-md"
                  value={credentials.password}
                />
              </div>

              <Link
                to="forgot-password"
                className="w-full text-end text-dark-gray font-regular my-3 cursor-pointer"
              >
                Forgot Password?
              </Link>

              <button
                onClick={handleSubmit}
                className="bg-dark-blue  w-full p-3 rounded-md mt-4 uppercase text-white tracking-wider font-bold hover:opacity-80"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Login
