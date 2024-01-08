

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoMdHome } from 'react-icons/io';
import { TiExport } from 'react-icons/ti';
import { IoHelpCircleSharp } from 'react-icons/io5';
import { IoIosLogOut } from 'react-icons/io';



const SemNavbar = ({semId}) => {
  return (
    <nav className='bg-placebo-turquoise p-8 border-b-2 border-enamelled-jewel'>
      <div className='flex items-center space-x-24 justify-center gap-x-20 gap-2 px-2'>
        <LinkButton to={`/home`}>
          <IoMdHome /> Back
        </LinkButton>
        <LinkButton to={`/semester/${semId}/summary`}>
          <IoMdHome /> Summary
        </LinkButton>
        <LinkButton to={`/semester/${semId}/faculty`}>
          <TiExport /> Faculty
        </LinkButton>
        <LinkButton to={`/semester/${semId}/bloc`}>
          <IoHelpCircleSharp /> Bloc
        </LinkButton>
        <LinkButton to={`/semester/${semId}/alphalist`}>
          <IoIosLogOut /> Alpha List
        </LinkButton>
        <LinkButton to="/">
          <IoIosLogOut /> Signout
        </LinkButton>
      </div>
    </nav>
  );
};

const LinkButton = ({ to, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = to === location.pathname;

  const handleSignOut = () => {
    (async function (){
      await fetch('http://localhost:4000/api/auth/signout',{
        method: 'GET',
        credentials: 'include'
      })
    }())
  }
  const handleClick = () => {
    if (!isActive) {
      if (to == "/") {
        handleSignOut();
      }
      navigate(to);
    }
  }

  return (
    <a
      className={`flex items-center cursor-pointer text-3xl bg-transparent text-enamelled-jewel ${isActive ? 'border-b-2 border-enamelled-jewel rounded-sm' : ''}`}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

export default SemNavbar;