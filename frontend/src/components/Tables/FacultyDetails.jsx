import { useFacultyContext } from "../../hooks/useFacultyContext"
import { useSemesterContext } from "../../hooks/useSemesterContext"
const FacultyDetails = () => {
    const { selectedFaculty, selectedFacultySchedules, dispatch } = useSemesterContext()
    return (
        <div>
            <table className="w-full border-2 border-black">
                <thead>
                    <tr className="bg-enamelled-jewel h-10 border-b-2 border-black">
                        <th className="font-bold text-white text-2xl">
                            {selectedFaculty ? selectedFaculty.lastName : "Name"}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b-2 border-black h-10">
                        <td>
                            <div className="flex flex-row justify-around">
                                <p>TLC</p>
                                <p>{selectedFacultySchedules && selectedFacultySchedules.length > 0
                                    ? selectedFacultySchedules.reduce(
                                        (totalUnits, sched) => totalUnits + sched.course.units,
                                        0
                                    )
                                    : "0"}
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b-2 border-black h-10">
                        <td>
                            <div className="flex flex-row justify-around">
                                <p>ALC</p>
                                <p>{selectedFaculty ? selectedFaculty.load.ALC : "0"}</p>
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b-2 border-black h-10">
                        <td>
                            <div className="flex flex-row justify-around">
                                <p>SLC</p>
                                <p>{selectedFaculty ? selectedFaculty.load.SLC : "0"}</p>
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b-2 border-black h-10">
                        <td>
                            <div className="flex flex-row justify-around">
                                <p>RLC</p>
                                <p>{selectedFaculty ? selectedFaculty.load.RLC : "0"}</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="pt-5 flex justify-between items-center">
                <p className="text-2xl font-bold inline">
                    Total Units : {selectedFaculty 
                        ? selectedFacultySchedules.reduce((totalUnits, sched) => totalUnits + sched.course.units,0 ) 
                        + selectedFaculty.load.ALC
                        + selectedFaculty.load.SLC 
                        + selectedFaculty.load.RLC 
                        : "0"}
                </p>
                <button onClick={()=>{dispatch({type: 'SET_EDIT'})}} className="inline border-2 border-enamelled-jewel text-2xl px-6">Edit</button>
            </div>
        </div>
    )
}

export default FacultyDetails