import { PiCopy } from "react-icons/pi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FilterBar from "../components/Filters/FilterBar";
import { useSemesterContext } from "../hooks/useSemesterContext";

//Assume that no "Create new" Button is clicked.. 
//Only use ID's for the value of variables  

const Summary = () => {
    const { semesterFaculties, semesterSchedules, isLoading } = useSemesterContext()
    const navigate = useNavigate()
    const params = useParams()
    return (
        <div className="px-20 pt-10 text-center">
            <h1 className="text-enamelled-jewel-text font-extrabold">SUMMARY OF UNITS PER FACULTY</h1>
            <div className="flex flex-row space-x-20 mt-7 justify-center">
                {/* Filter Div */}
                <FilterBar />
                {console.log(semesterFaculties)}
                <div className="w-2/3">
                    <table className="w-full border-separate border-spacing-0">
                        <thead className="h-12 shadow-custom rounded-md">
                            <tr>
                                <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel text-enamelled-jewel text-xl rounded-tl-md rounded-bl-md border-r-0">Faculty</th>
                                <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel text-enamelled-jewel text-xl border-x-0 ">TLC</th>
                                <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel text-enamelled-jewel text-xl border-x-0 ">ALC</th>
                                <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel text-enamelled-jewel text-xl border-x-0 ">SLC</th>
                                <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel text-enamelled-jewel text-xl border-x-0 ">RLC</th>
                                <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel text-enamelled-jewel text-xl rounded-tr-md rounded-br-md border-l-0">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                semesterFaculties.length > 0 && semesterFaculties.map((faculty) => {
                                    const TLC = semesterSchedules.reduce((totalUnits, sched) => totalUnits + (sched.faculty._id === faculty._id ? sched.course.units : 0), 0)
                                    return (
                                        <tr key={faculty._id} className="h-12 hover:bg-placebo-turquoise">
                                            <td className="border border-collapse border-black border-opacity-30 border-b-1 border-x-0 border-t-0">{faculty.lastName}</td>
                                            <td className="border border-collapse border-black border-opacity-30 border-b-1 border-x-0 border-t-0">{TLC}</td>
                                            <td className="border border-collapse border-black border-opacity-30 border-b-1 border-x-0 border-t-0">{faculty.ALC}</td>
                                            <td className="border border-collapse border-black border-opacity-30 border-b-1 border-x-0 border-t-0">{faculty.SLC}</td>
                                            <td className="border border-collapse border-black border-opacity-30 border-b-1 border-x-0 border-t-0">{faculty.RLC}</td>
                                            <td className="border border-collapse border-black border-opacity-30 border-b-1 border-x-0 border-t-0">{TLC + faculty.ALC + faculty.SLC + faculty.RLC}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className="w-full h-full flex items-center justify-center">
                        {
                            isLoading &&
                            <div className="mt-24">
                                <p className="text-8xl font-bold">Loading ...</p>
                            </div>
                        }
                        {
                            semesterFaculties.length == 0 && !isLoading &&
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-7xl font-bold text-enamelled-jewel">Start Adding the List</p>
                                <p className="text-3xl p-2 font-light italic text-enamelled-jewel">or</p>
                                <button onClick={() => { navigate(`../../../home?copy=true&currentSemester=${params.id}`)}} className="flex items-center justify-center font-semibold w-96 h-20 border text-xl text-enamelled-jewel border-enamelled-jewel rounded-md bg-placebo-turquoise transition ease-in duration-200 hover:shadow-custom">
                                    <PiCopy /> Copy Alpha List
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Summary;