import { useEffect, useMemo, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import AddScheduleModal from "../../modals/AddScheduleModal";
import { useDisclosure } from "@chakra-ui/react";
import EditScheduleModal from "../../modals/EditScheduleModal";
import { useParams, useSearchParams } from "react-router-dom";
import { useFacultyContext } from "../../hooks/useFacultyContext";
import EditFacultyScheduleModal from "../../modals/EditFacultyScheduleModal";
import { useSemesterContext } from "../../hooks/useSemesterContext";

const FacultySchedList = ({edit}) => {
    const { semesterSchedules,selectedFacultySchedules, selectedFacultyFilteredSchedules, dispatch } = useSemesterContext()
    const [queryParameters] = useSearchParams()
    const [editSched, setEditSched] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const params = useParams()

    useEffect(() => {
        (function () {
            setIsLoading(true)
            dispatch({type: 'FILTER_SELECTED_FACULTY_SCHEDULE_DEPARTMENT', payload:queryParameters.getAll("filter") })
            setIsLoading(false)
        }())
    }, [queryParameters])



    return (
        <>
            <table className="w-full border-separate border-spacing-0">
                <thead className="h-12">
                    <tr>
                        <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel rounded-tl-2xl rounded-bl-2xl border-r-0">Course Code</th>
                        <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">Course Description</th>
                        <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">Class</th>
                        <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">Section</th>
                        <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">Time</th>
                        <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">Day</th>
                        <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">Room</th>
                        <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">Units</th>
                        <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">Students</th>
                        <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">FIC</th>
                        <th className={`bg-placebo-turquoise border border-collapse border-enamelled-jewel ${edit ? "border-x-0" : "rounded-tr-2xl rounded-br-2xl border-l-0"}`}>Remarks</th>
                        {edit && <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel rounded-tr-2xl rounded-br-2xl border-l-0">Delete</th>}
                    </tr>
                </thead>
                <tbody>
                    {selectedFacultyFilteredSchedules && selectedFacultyFilteredSchedules.length > 0 && selectedFacultyFilteredSchedules.map(({ course, faculty, room, schedule, section, remarks, students, _id }) => {
                        
                        return (
                            <tr
                                className="h-12 hover:bg-placebo-turquoise"
                                key={_id}
                                onMouseDown={() => {
                                    edit &&
                                        (dispatch({
                                            type:'EDIT_FACULTY_SCHEDULE',
                                            payload:{
                                            _id: _id,
                                            course: course,
                                            faculty: faculty,
                                            room: room,
                                            students: students,
                                            remarks: remarks,
                                            schedule: schedule
                                        }}), onOpen())

                                }
                                }>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{course.code}</td>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{course.name}</td>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{course.type}</td>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{schedule.map(({ section }) => { return section })}</td>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{schedule.map((time) => { return Object.keys(time).length !== 0 && (<p>{time.startTime + " - " + time.endTime}</p>) })}</td>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{schedule.map((time, index) => { return <p key={index}>{Object.keys(time).length !== 0 && (time.day.map((e) => { return e }))}</p> })}</td>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{room.building + " " + room.name}</td>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{course.units}</td>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{students.map(({ name, bloc, yearLevel }, index) => { return (<p key={index} >{yearLevel + name + `${bloc ? (" - " + bloc) : ""}`}</p>) })}</td>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{faculty.lastName}</td>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{remarks}</td>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{edit && <IoTrashOutline />}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            {
                isLoading &&
                <div className="mt-24">
                    <p className="text-8xl font-bold">Loading ...</p>
                </div>
            }
            {
                !semesterSchedules.length > 0 && !isLoading &&
                <div className="mt-24">
                    <p className="text-8xl font-bold">Start adding the list</p>
                    <p className="text-3xl bold">or</p>
                    <button className="w-96 h-20 border border-enamelled-jewel hover:border-enamelled-jewel rounded-lg hover:bg-placebo-turquoise">Copy Alpha List</button>
                </div>
            }
            {
                selectedFacultyFilteredSchedules && selectedFacultyFilteredSchedules.length == 0 && !isLoading &&
                <div className="mt-24 flex-col space-y-10">
                    <p className="text-8xl font-bold">No Schedule Found</p>
                    <p className="text-4xl font-bold">Start adding the list</p>
                </div>
            }
            {edit &&
                <EditFacultyScheduleModal semester={params.id} onClose={onClose} isOpen={isOpen} />
            }
        </>
    )
}

export default FacultySchedList;
