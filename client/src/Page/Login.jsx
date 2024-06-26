import logImg from '/login.svg'
import logo from '/logo.svg'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isLoggedin, isLogin } from '../features/authentication'
import { useNavigate, Link } from 'react-router-dom'
import ButtonLoading from '../Component/LoadingComponent/ButtonLoading'
import { fetchUser } from '../features/user'
import MessageToast from '../Component/ToastComponent/MessageToast'
import Cookies from 'js-cookie'
const Login = () => {
  const navigate = useNavigate()
  const loading = useSelector((state) => state.auth.loading)
  const error = useSelector((state) => state.auth.error)
  const msg = useSelector((state) => state.auth.msg)
  const [isVisible, setIsVisible] = useState(true)
  const token = Cookies.get('token')
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
    if (token) {
      dispatch(isLoggedin())
    }
  }, [])

  return (
    <>
      {/* {isVisible && <MessageToast message={msg} error={error} isVisible={isVisible} setIsVisible={setIsVisible} />} */}
      <div className="w-full mt-20 px-10 ">
        <div className="w-11/12 h-full max-h-40 m-auto flex justify-center lg:justify-between items-center">
          <div className="size-full max-w-40 max-h-40 flex mr-10 lg:mr-10 justify-center items-center">
            <Link to={'/'} className="h-fit">
              <img src={logo} alt="PinaupaPH logo" className="w-full" />
            </Link>
          </div>
          <Link
            to="/contact"
            className="hidden lg:block px-5 py-2 bg-primary-color text-white font-semibold rounded-md shadow-lg hover:bg-primary-dark transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color"
          >
            Contact Us
          </Link>
        </div>

        <div className="lg:flex lg:w-full lg:flex-row-reverse items-center lg:justify-between mt-8">
          <img
            src={logImg}
            alt=""
            className="md:w-3/5 md:m-auto lg:w-1/3 lg:mr-24 w-10/12 mb-7 ml-8"
          />
          <p className="lg:hidden text-lg text-dark-gray">
            Sign in your account
          </p>

          <form

            className="lg:w-1/3 lg:ml-20 lg:rounded-md lg:p-10 lg:h-fit lg:bg-white1 lg:shadow-md"
          >
            <h1 className="lg:text-3xl lg:font-semibold lg:block text-primary-color hidden">
              Sign In
            </h1>
            {error && (
              <p className="text-red border border-red/50 font-regular mt-5 rounded-xl shadow-md bg-red/10 p-5">
                {error}
              </p>
            )}
            <div className="flex flex-col text-primary-color mt-3">
              <label htmlFor="email" className="font-bold mb-3">
                Email / Username
              </label>
              <input
                type="text"
                name="username"
                onChange={handleInputChange}
                placeholder="e.g juan.delacruz@gmail.com"
                className="border-2 font-regular bg-white text-primary-color text-md border-primary-color focus:ring-2 ring-primary-color w-full p-3 rounded-md"
                value={credentials.username}
              />
            </div>
            <div className="flex flex-col text-primary-color mt-3">
              <label htmlFor="password" className="font-bold mb-3">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="border-2 font-regular bg-white text-primary-color text-md border-primary-color focus:ring-2 ring-primary-color w-full p-3 rounded-md"
                value={credentials.password}
              />
            </div>
            <div className="flex items-center justify-between my-3">
              <Link
                to="forgot-password"
                className="  text-dark-gray font-regular  cursor-pointer hover:underline hover:text-primary-color"
              >
                Forgot Password?
              </Link>

              <Link to="/contact" className="lg:hidden text-dark-gray font-regular  cursor-pointer hover:underline hover:text-primary-color">
              </Link>
            </div>

            {loading ? (
              <ButtonLoading msg={'Logging In...'} />
            ) : (
              <button onClick={handleSubmit} className="bg-dark-blue w-full p-3 rounded-md mt-4 mb-5 lg:mb-0 text-white tracking-wider font-semibold hover:opacity-80">
                Sign in
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
