import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import SemNavBar from "../components/SemNavBar.jsx";
import { ScheduleContextProvider } from "../context/scheduleContext.jsx"

const Semester = () => {
    const params = useParams()
    return (
        <div className='flex flex-col h-screen w-screen'>
            <SemNavBar semId={params.id} />
            <ScheduleContextProvider>
                <Outlet />
            </ScheduleContextProvider>
        </div>
    )
}

export default Semester;