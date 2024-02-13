import { useEffect, useMemo, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import AddScheduleModal from "../../modals/AddScheduleModal";
import { useDisclosure } from "@chakra-ui/react";
import EditScheduleModal from "../../modals/EditScheduleModal";
import { useParams, useSearchParams } from "react-router-dom";
import { useSemesterContext } from "../../hooks/useSemesterContext";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    ModalCloseButton,
} from '@chakra-ui/react'
import TestModal from "../../modals/testModal";
const AlphaSchedList = ({ editing }) => {
    const { semesterSchedules, filteredSemesterSchedules, editSchedule, dispatch } = useSemesterContext()
    const [queryParameters] = useSearchParams()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const params = useParams()

    useEffect(() => {
        (function () {
            setIsLoading(true)
            dispatch({ type: 'FILTER_SCHEDULE_DEPARTMENT', payload: queryParameters.getAll("filter") })
            setIsLoading(false)
        }())
    }, [queryParameters])

    const dayAbbreviations = {
        Monday: 'Mon',
        Tuesday: 'T',
        Wednesday: 'W',
        Thursday: 'Th',
        Friday: 'F',
    };

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
                    {console.log(filteredSemesterSchedules)}
                    {filteredSemesterSchedules && filteredSemesterSchedules.length > 0 && filteredSemesterSchedules.map(({ course, faculty, room, schedule, section, remarks, students, _id }) => {
                        return (
                            <tr
                                className="h-12 hover:bg-placebo-turquoise"
                                key={_id}
                                onMouseDown={() => {
                                    if (editing) {
                                        dispatch({
                                            type: 'SET_EDIT_SCHEDULE',
                                            payload: {
                                                _id: _id,
                                                course: course,
                                                faculty: faculty,
                                                room: room,
                                                students: students,
                                                remarks: remarks,
                                                schedule: schedule
                                            }
                                        });
                                        onOpen();
                                    }
                                }}


                            >
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{course.code}</td>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{course.name}</td>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{course.type}</td>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">
                                    {students.map(({ bloc }, index) => {
                                        const labSection = bloc ? ` - ${bloc}L` : ''; // Add lab section if bloc is present
                                        return (
                                            <p key={index}>{ schedule.map((sched)=>sched.section).join('') + `${labSection}`}</p>
                                        );
                                    })}
                                </td>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{schedule.map((time) => { return Object.keys(time).length !== 0 && (<p>{time.startTime + " - " + time.endTime}</p>) })}</td>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">
                                    {schedule.map((time, index) => (
                                        <p key={index}>
                                            {Object.keys(time).length !== 0 &&
                                                time.day.map((day) => dayAbbreviations[day])}
                                        </p>
                                    ))}
                                </td>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{room.building + " " + room.name}</td>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{course.units}</td>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{students.map(({ name, bloc, yearLevel }, index) => { return (<p key={index} >{yearLevel + name + `${bloc ? (" - " + bloc) : ""}`}</p>) })}</td>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{faculty.lastName}</td>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{remarks.length > 10 ? `${remarks.slice(0, 10)}...` : remarks}</td>
                                <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0"><div className="flex justify-center">{editing && <IoTrashOutline />}</div></td>
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

            {isOpen && <EditScheduleModal onClose={onClose} isOpen={isOpen} />}
            {/* <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        asdasd
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal> */}
        </>
    )
}

export default AlphaSchedList;
