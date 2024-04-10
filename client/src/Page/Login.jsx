import logImg from '/login.svg';
import logo from '/logo.svg';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLogin } from '../features/authentication';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const loading = useSelector(state => state.auth.loading)
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      dispatch(isLogin(credentials));
  };

  return (
    <>
      <div className="w-full h-screen bg-white1">
        <div className="  lg:items-start lg:ml-28 flex flex-col items-center justify-center ">
          <img src={logo} alt="PinaupaPH logo" className="lg:w-48 w-1/2 my-10" />
        </div>
        <div className="lg:flex lg:flex-row-reverse lg:justify-between mx-10 ">
          <img src={logImg} alt="" className="lg:w-1/3 lg:mr-24 w-10/12 mb-7 ml-8" />
          <p className="lg:hidden text-lg text-dark-gray">Log in to your account</p>
          <form action="" className="lg:w-1/3 lg:ml-20 lg:rounded-md lg:p-10 lg:bg-white lg:shadow-md ">
            <h1 className="lg:text-4xl lg:font-bold lg:block hidden ">Log in</h1>
            <div className="flex flex-col text-lg text-primary font-bold mt-3">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="username"
                onChange={handleInputChange}
                placeholder="e.g juan.delacruz@gmail.com"
                className="border-2 border-dark-gray w-full p-3 rounded-md"
                value={credentials.username}
              />
            </div>
            <div className="flex flex-col text-lg text-primary font-bold mt-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleInputChange}
                placeholder="********"
                className="border-2 border-dark-gray w-full p-3 rounded-md"
                
                value={credentials.password}
              />
            </div>

            <Link to="forgot-password" className="text-end text-dark-gray font-bold mt-3 cursor-pointer">
              Forgot Password?
            </Link>
            {error && <p className="text-red">{error}</p>}
            <button
              onClick={handleSubmit}
              className="bg-dark-blue  w-full p-3 rounded-md mt-4 uppercase text-white font-bold hover:opacity-80"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;