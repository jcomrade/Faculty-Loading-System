import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import VerticalSeparator from '../components/VerticalSeparator';
import { PiUserCircleFill } from 'react-icons/pi';
import { MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  // Temporary Only
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({userName: username, password: password}),
        headers: {'Content-Type': 'application/json'},
        credentials: "include",
      })
      const data = await res.json()
      if(data.errors){
        setErrors(data.errors)
      }else{
        setUserData(data)
      }


      // .then(async(response)=> await response.json())
      // .then(async(res)=>{
      //   const data = await res;
      //   if(data.errors){
      //     setErrors(data.errors)
      //     console.log(errors)
      //   }else{
      //     setUserData(data)
      //     console.log(userData)
      //   }
      // })
      // .catch((err)=>console.log(err))
    }catch(err){
      console.log(err)
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='bg-aqua-wave h-screen w-screen flex justify-center items-center'>
      <div>
        <div className='text-6xl font-bold text-center'>
          <h1>Login</h1>
        </div>
        <br/>
        <form className='flex flex-col items-center max-w-md mx-auto' onSubmit={handleSubmit}>
          <div className='flex items-center border bg-blizzard border-enamelled-jewel p-2 rounded-10px w-full max-h-12 focus:outline-none focus:border-blue-500'>
            <PiUserCircleFill className='text-enamelled-jewel text-4xl' />
            <VerticalSeparator />
            <div className='w-full'>
              <input
                className={`bg-blizzard w-full focus:outline-none ${username ? 'text-black' : 'text-black-mana'}`}
                placeholder='Username'
                type='text'
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
          </div>
          <br/>
          <div className='flex items-center border bg-blizzard border-enamelled-jewel p-2 rounded-10px w-full max-h-12 focus:outline-none focus:border-blue-500'>
            <MdLock className='text-enamelled-jewel text-4xl' />
            <VerticalSeparator />
            <div className='w-full flex'>
              <input
                className={`bg-blizzard w-full focus:outline-none ${password ? 'text-black' : 'text-black-mana'}`}
                placeholder='Password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
              />
              {showPassword ? (
                <MdVisibility
                  className='text-enamelled-jewel cursor-pointer ml-2 text-xl'
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <MdVisibilityOff
                  className='text-enamelled-jewel cursor-pointer ml-2 text-xl'
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
          </div>
          <br/>
          <button className='bg-blizzard border border-enamelled-jewel text-enamelled-jewel' type='submit' onClick={()=>navigate('/home')}>
            Sign In
          </button>
        </form>
        <div>
            {
              errors ? (<div>{errors.message}</div>) : (<></>)
            }
          </div>
      </div>
    </div>
  );
};

export default Login;