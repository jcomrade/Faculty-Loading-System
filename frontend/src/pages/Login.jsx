import React, { useState } from 'react';
import VerticalSeparator from '../components/VerticalSeparator';
import { PiUserCircleFill } from 'react-icons/pi';
import { MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
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
        <form className='flex flex-col items-center' onSubmit={handleSubmit}>
          <div className='flex items-center border bg-blizzard border-enamelled-jewel p-2 rounded-10px w-full max-h-12 focus:outline-none focus:border-blue-500'>
            <PiUserCircleFill className='text-enamelled-jewel text-4xl' />
            <VerticalSeparator />
            <div className='w-full'>
              <input
                className='bg-blizzard text-black-mana w-full focus:outline-none'
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
                className='bg-blizzard text-black-mana w-full focus:outline-none'
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
          <button className='bg-blizzard border border-enamelled-jewel text-enamelled-jewel' type='submit'>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;