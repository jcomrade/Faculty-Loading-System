import React, { useEffect, useState } from 'react';

const Home = () => {
  const [semData, setSemData] = useState(null)
  const [userData] = useAuth();
  console.log(userData)
  useEffect(() => {
    (async function(){
      try {
        const res = await fetch('http://localhost:4000/api/semester',{
          method: 'GET',
          credentials: "include"
        })
        const data = await res.json()
        console.log(data)
        setSemData(data)
      } catch (err) {
        console.log(err)
      }
    }());
  }, [])
  return (
    <div> 
      <div>
        {
          userData ? (
          userData.userType === "Super User" 
            ? <button>Add Sem</button>
            : <></>
          ) : (<p>Loading...</p>)
        }
      </div>
      {semData ? (
          semData.map((sem) => (
            <div key={sem._id}>
              <p className={"text-black"}>{sem.semesterType} Semester {sem.AY}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
    </div>
  );
}

export default Home;