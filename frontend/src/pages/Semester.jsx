import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import SemNavBar from "../components/SemNavBar.jsx";
const Semester= () => {
    const params = useParams()
    return (
        <div className='flex flex-col h-screen w-screen'>
        <SemNavBar semId={params.id}/>
        <Outlet/>
        </div>
    )
}

export default Semester;