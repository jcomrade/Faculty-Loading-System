import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { FaRegFileAlt } from "react-icons/fa";
import { CiFileOn } from "react-icons/ci";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiPlus } from "react-icons/hi";

const Home = () => {
  const [semData, setSemData] = useState(null);
  const [userData, setUserData] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    (async function () {
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
    (async function () {
      try {
        const res = await fetch('http://localhost:4000/api/semester', {
          method: 'GET',
          credentials: "include"
        })
        const data = await res.json()
        setSemData(data)
      } catch (err) {
        console.log(err)
      }
    }());
  }, []);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  return (
    <div className='flex flex-col h-screen w-screen'>
      <NavBar />
      <div className='flex flex-row justify-center space-x-4 py-7'>
        {userData.userType === "Super User" && (
          <>
            <button className='flex items-center font-bold justify-center text-xl border-enamelled-jewel bg-placebo-turquoise text-enamelled-jewel w-40'><HiPlus />New File</button>
            <button className='flex items-center font-bold justify-center text-xl border-enamelled-jewel bg-placebo-turquoise text-enamelled-jewel w-40'><HiOutlinePencilSquare />Edit</button>
          </>
        )}
      </div>

      <div className='mx-auto w-5/6'>
        <table className='w-full border-b'>
          <thead className='border-b-2 border-black text-left'>
            <tr>
              <th className='flex items-center text-black p-2'>
                <CiFileOn />
                Name
              </th>
              <th className='text-black p-2'>Modified By</th>
              <th className='text-black p-2'>Date Modified</th>
            </tr>
          </thead>
          <tbody>
            {semData ? (
              semData.map((sem, index) => (
                <tr
                  className={`border-b cursor-pointer ${index === selectedRow ? 'bg-placebo-turquoise' : ''}`}
                  key={sem._id}
                  onClick={() => handleRowClick(index)}
                >
                  <td className="flex flex-row items-center text-black p-2">
                    <FaRegFileAlt />
                    {sem.semesterType} Semester {sem.AY}
                  </td>
                  <td className='text-black p-2'>{sem.modifiedBy}</td>
                  <td className='text-black p-2'>{sem.dateModified}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3' className='text-black text-center p-2'>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Home;