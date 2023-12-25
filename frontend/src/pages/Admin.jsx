import { HiPlus } from "react-icons/hi";
import AdminNavBar from "../components/AdminNavBar";
import UserList from "../components/UserList";
import { useEffect, useState } from "react";
const Admin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userList, setUserList] = useState(null);
    const [adminData, setAdminData] = useState({})
    useEffect(() => {
        (async function () {
          try {
            const res = await fetch("http://localhost:4000/api/auth/user", {
              method: 'GET',
              credentials: "include"
            });
            const admin = await res.json();
            setAdminData(admin);
          } catch (error) {
            console.error("Error fetching Admin data:", error);
          }
        }())
      }, []);

    useEffect(()=>{
        (async function () {
            setIsLoading(true);
            const res = await fetch('http://localhost:4000/api/admin', {
                method: 'GET',
                credentials: 'include'
            })
            const data = await res.json()
            setUserList(data)
            setIsLoading(false);
        }())
    },[])
    return (
        <>
            <AdminNavBar />
            <div className="w-screen flex flex-col items-center p-10 space-y-5">
                {/* Admin Detauls */}
                <div className="w-11/12 min-h-min bg-placebo-turquoise flex flex-row p-5 border-2 border-enamelled-jewel rounded-lg text-2xl">
                    <div className="flex flex-col w-1/2 justify-start">
                        <p>Name : Juan Cruz</p>
                        <p>Account Type: Admin</p>
                    </div>
                    <div className="flex justify-end w-1/2">
                        <p> Employee Number: 2021-2021  </p>
                    </div>
                </div>

                {/* Configuration Buttons */}
                <div>
                    <button className='flex items-center font-bold justify-center text-xl border-2 border-enamelled-jewel bg-placebo-turquoise text-enamelled-jewel w-48 h-11'>
                        <HiPlus />Create User
                    </button>
                </div>

                {/* User List */}
                <div className="w-full">
                    <UserList users={userList}/>
                </div>
            </div>
        </>
    )
}

export default Admin;