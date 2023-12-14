import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { FaRegFileAlt } from "react-icons/fa";
import { CiFileOn } from "react-icons/ci";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiPlus } from "react-icons/hi";
const Home = () => {
  const [semData, setSemData] = useState(null)
  const [userData, setUserData] = useState({});
  useEffect(() => {
    (async function(){
        try {
            const res = await fetch("http://localhost:4000/api/auth/user", {
                method: 'GET',
                credentials: "include"
            });
            const user = await res.json();
            setUserData(user);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }

    }())
  }, []);
  useEffect(() => {
    (async function(){
      try {
        const res = await fetch('http://localhost:4000/api/semester',{
          method: 'GET',
          credentials: "include"
        })
        const data = await res.json()
        setSemData(data)
      } catch (err) {
        console.log(err)
      }
    }());
  }, [])
  return (
    <div className='flex flex-col h-screen w-screen'> 
      <NavBar />
        <div className='flex flex-row justify-center space-x-4 pt-7'>
        {
          userData.userType === "Super User" 
            ? 
              <>
              <button className='flex items-center font-bold justify-center text-xl border-enamelled-jewel bg-placebo-turquoise text-enamelled-jewel w-40'><HiPlus />New File</button>
              <button className='flex items-center font-bold justify-center text-xl border-enamelled-jewel bg-placebo-turquoise text-enamelled-jewel w-40'><HiOutlinePencilSquare />Edit</button>
              </>
            : <></>
        }
          
        </div>
        <div className='flex border-b border-black justify-center max-w-5xl'>
            <a className='flex items-center text-black'><CiFileOn />Name</a>
            <a className='text-black'>Modified By</a>
            <a className='text-black'>Date Modified</a>
        </div>
        {semData ? (
            semData.map((sem) => (
              <div className='flex' key={sem._id}>
                <p className="text-black flex flex-row items-center"><FaRegFileAlt />{sem.semesterType} Semester {sem.AY}</p>
                <p className='text-black'>{sem.modifiedBy}</p>
                <p className='text-black'>{sem.dateModified}</p>
              </div>
              
            ))
          ) : (
            <p>Loading...</p>
          )}
    </div>
  );
}

export default Home;