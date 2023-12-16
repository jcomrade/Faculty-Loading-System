import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { FaRegFileAlt } from "react-icons/fa";
import { CiFileOn } from "react-icons/ci";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiPlus } from "react-icons/hi";
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
const Home = () => {
  const navigate = useNavigate()
  const [semData, setSemData] = useState(null);
  const [firstYear, setFirstYear] = useState("");
  const [secondYear, setSecondYear] = useState("");
  const [semester, setSemester] = useState("")
  const [userData, setUserData] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSubmit = (fyear, syear, sem) => {
    const payload = {
      semesterType: sem,
      AY: `${fyear}-${syear}`,
      userId:userData.userId
    };
    (
      async function () {
        const res = await fetch("http://localhost:4000/api/semester", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify(payload)
        })
        const data = await res.json()
        setSemData([...semData,data])
      }()
    )
    
  }
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
            <button className='flex items-center font-bold justify-center text-xl border-enamelled-jewel bg-placebo-turquoise text-enamelled-jewel w-40' onClick={onOpen}><HiPlus />New File</button>
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
                  onMouseEnter={() => handleRowClick(index)}
                  onMouseDown={()=> navigate(`/semester/${sem._id}/summary`)}
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


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='flex flex-row items-center mb-5 '>
              <div className='pr-3'>
                <p>Academic Year: </p>
              </div>
              <div>
                <input className='w-20 border border-black rounded-md p-1 text-center' onChange={(e)=>setFirstYear(e.target.value)} type='text' placeholder='Year'/>
              </div>
              <div className='mx-3'>
                -
              </div>
              <div className='bg-blue'>
                <input className='w-20 border border-black rounded-md p-1 text-center' onChange={(e)=>setSecondYear(e.target.value)} type='text' placeholder='Year'/>
              </div>
            </div>
            <div className='flex flex-row items-center'>
              <div>Semester: </div>
              <button onClick={()=>setSemester("1st")} className={`mx-4 ${semester == "1st" ? "bg-placebo-turquoise":""} border px-3 border-black rounded-md`}>1st</button>
              <button onClick={()=>setSemester("2nd")} className={`mx-2 ${semester == "2nd" ? "bg-placebo-turquoise":""} border px-3 border-black rounded-md`}>2nd</button>
              <button onClick={()=>setSemester("Mid Year")} className={`mx-4 ${semester == "Mid Year" ? "bg-placebo-turquoise":""} border px-3 border-black rounded-md`}>Mid Year</button>
            </div>
          </ModalBody>
          <ModalFooter>
              <div className="flex flex-row space-x-4">
                <button onClick={()=>{handleSubmit(firstYear, secondYear, semester);onClose}} className='px-3 py-1'>Add</button>
                <button onClick={onClose}className='px-3 py-1'>Cancel</button>
              </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Home;