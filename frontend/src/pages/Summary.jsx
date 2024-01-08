import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import FilterBar from "../components/Filters/FilterBar";
import { useSemesterContext } from "../hooks/useSemesterContext";

//Assume that no "Create new" Button is clicked.. 
//Only use ID's for the value of variables  

const Summary = () => {
    const {semesterFaculties, semesterSchedules } = useSemesterContext()
    const [isLoading, setIsLoading] = useState(false)
    console.log(semesterFaculties)

    return (
        <div className="px-20 pt-10 text-center">
            <h1 className="text-enamelled-jewel-text">Summary of units per Faculty</h1>
            <div className="flex flex-row space-x-20 mt-7">
                {/* Filter Div */}
                <FilterBar />
                {console.log(semesterFaculties)}
                <div className="w-full">
                    <table className="w-full border-separate border-spacing-0">
                        <thead className="h-12">
                            <tr>
                                <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel rounded-tl-2xl rounded-bl-2xl border-r-0">Faculty</th>
                                <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">TLC</th>
                                <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">ALC</th>
                                <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">SLC</th>
                                <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">RLC</th>
                                <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel rounded-tr-2xl rounded-br-2xl border-l-0">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                semesterFaculties.length > 0 && semesterFaculties.map((faculty) => {
                                    const TLC = semesterSchedules.reduce((totalUnits, sched)=> totalUnits + (sched.faculty._id === faculty._id ? sched.course.units : 0),0)
                                    return (
                                        <tr key={faculty._id} className="h-12 hover:bg-placebo-turquoise">
                                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{faculty.lastName}</td>
                                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{TLC}</td>
                                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{faculty.load.ALC}</td>
                                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{faculty.load.SLC}</td>
                                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{faculty.load.RLC}</td>
                                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{TLC + faculty.load.ALC + faculty.load.SLC + faculty.load.RLC}</td>
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
                            <div>
                            <p className="text-8xl font-bold">Start adding the list</p>
                            <p className="text-3xl bold">or</p>
                            <button className="w-96 h-20 border border-enamelled-jewel hover:border-enamelled-jewel rounded-lg hover:bg-placebo-turquoise">Copy Alpha List</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Summary;