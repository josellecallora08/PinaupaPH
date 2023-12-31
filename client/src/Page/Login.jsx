import logImg from '../Image/Login.png'
import logo from '../Image/logo.png'
import { useState } from 'react'
const Login = () => {
  const handleSubmit = (e) => {

    e.preventDefault()
  }
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className=' overflow-hidden max-h-screen max-w-screen'>
      <div className='hidden lg:flex lg:items-center lg:justify-between w-screen px-20 pt-5'>
            <div>
              <img src={logo} alt="logo" className=' w-2/3 h-auto'/>
            </div>
            <div>
              <button className='hidden lg:block bg-white text-black px-10 py-1 rounded-xl border-dark-blue border-2 hover:bg-light-blue hover:text-white hover:outline-none'>Login</button>
          </div> 
          </div>
          
         <div className=' flex flex-col w-screen h-screen items-center lg:flex-row justify-center'>
          
              <div className='my-20 lg:hidden'>
                <div>
                    <img src={logo} alt="logo" className=''/>
                </div>
                
              </div>
              <form action="" className='flex flex-col gap-2 w-full px-20 lg:w-1/2'onSubmit={handleSubmit}>
                  <div className=' hidden lg:block -mt-40'>
                    <h1 className='text-light-blue text-4xl font-medium'>Login</h1>
                    <p className='text-dark-gray text-xl '>Log in to your apartment rental management software.</p>
                  </div>
                  <p className='text-dark-gray text-left mb-3 lg:hidden'>Login to your Account</p>
                  <div>
                    <label className='relative cursor-pointer'>
                      <input type="email" placeholder="Email" value={email}  className=' text-lg text-black font-normal bg-gray rounded-lg  outline-none placeholder-dark-gray placeholder-opacity-0 pt-7 pl-2 pb-2 w-full'onChange={(e) => setEmail(e.target.value)}  />
                      <span className='text-medium text-light-gray text-opacity-80  absolute left-1 bottom-5 px-1 '>Email</span>
                    </label>
                    
                  </div>
                  <div>
                    <label className='relative cursor-pointer'>
                      <input type="password" placeholder="Password" value={password}  className=' text-lg text-black font-normal bg-gray rounded-lg  outline-none placeholder-dark-gray placeholder-opacity-0 pt-7 pl-2 pb-2 w-full' onChange={(e) => setPassword(e.target.value)} />
                      <span className='text-medium text-light-gray text-opacity-80  absolute left-1 bottom-5 px-1 '>Password</span>
                    </label>
                  </div>
                  <p className='text-dark-gray text-end my-2'>Forgot Password ?</p>
                  <button className='py-4 rounded-lg text-white text-xl'>Login</button>
                  <p className='hidden lg:block text-dark-gray my-2'>Create your account here.</p>
              </form>

              <div className='hidden lg:block mb-40 mt-20'>
                <img src={logImg} alt="login" className=' w-9/12' />
          </div>

      </div>

</div>

  )
}

export default Login