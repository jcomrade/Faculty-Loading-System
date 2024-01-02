import { useEffect, useMemo, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import AddScheduleModal from "../modals/AddScheduleModal";
import { useDisclosure } from "@chakra-ui/react";
import EditScheduleModal from "../modals/EditScheduleModal";
import { useSchedulesContext } from "../hooks/useScheduleContext";
import { useParams, useSearchParams } from "react-router-dom";

const SchedList = ({ editing }) => {
    const { semesterSchedules,filteredSemesterSchedules, dispatch } = useSchedulesContext()
    const [queryParameters] = useSearchParams()
    const [editSched, setEditSched] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const params = useParams()
    useMemo(() => {
        (async function () {
            setIsLoading(true)
            const res = await fetch(`http://localhost:4000/api/semester/${params.id}/`, {
                method: 'GET',
                credentials: 'include',
            })
            const data = await res.json()
            // setSemScheds(data)
            dispatch({ type: 'SET_SCHEDULES', payload: data })
            // setFilteredScheds(data)
            setIsLoading(false)
        }())
    }, [params.id])

    useEffect(() => {
        (function () {
            setIsLoading(true)
            dispatch({type: 'FILTER_SCHEDULE_DEPARTMENT', payload:queryParameters.getAll("filter") })
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
                        <th className={`bg-placebo-turquoise border border-collapse border-enamelled-jewel ${editing ? "border-x-0" : "rounded-tr-2xl rounded-br-2xl border-l-0"}`}>Remarks</th>
                        {editing && <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel rounded-tr-2xl rounded-br-2xl border-l-0">Delete</th>}
                    </tr>
                </thead>
                <tbody>
                    {filteredSemesterSchedules && filteredSemesterSchedules.length > 0 && filteredSemesterSchedules.map(({ course, faculty, room, schedule, section, remarks, students, _id }) => {
                        return (
                            <tr
                                className="h-12 hover:bg-placebo-turquoise"
                                key={_id}
                                onMouseDown={() => {
                                    editing &&
                                        (setEditSched({
                                            _id: _id,
                                            course: course,
                                            faculty: faculty,
                                            room: room,
                                            students: students,
                                            remarks: remarks,
                                            schedule: schedule
                                        }), onOpen())

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
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{editing && <IoTrashOutline />}</td>
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
                filteredSemesterSchedules.length == 0 && !isLoading &&
                <div className="mt-24 flex-col space-y-10">
                    <p className="text-8xl font-bold">No Schedule Found</p>
                    <p className="text-4xl font-bold">Start adding the list</p>
                </div>
            }
            {editSched &&
                <EditScheduleModal data={editSched} semester={params.id} onClose={onClose} isOpen={isOpen} />
            }
        </>
    )
}

export default SchedList;
