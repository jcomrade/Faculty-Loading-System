import { useDisclosure } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { FaXmark } from "react-icons/fa6";
import { useEffect, useMemo, useState } from 'react';
import ScheduleMaker from '../components/DetailsMaker/WeeklyScheduleMaker';
import CourseMaker from '../components/DetailsMaker/CourseMaker';
import FacultyMaker from '../components/DetailsMaker/FacultyMaker';
import StudentMaker from '../components/DetailsMaker/StudentMaker';
import RemarksMaker from '../components/DetailsMaker/RemarksMaker';
import RoomMaker from '../components/DetailsMaker/RoomMaker';
import SectionMaker from '../components/DetailsMaker/SectionMaker';
import { useParams } from 'react-router-dom';
import { useSemesterContext } from '../hooks/useSemesterContext';
const AddScheduleModal = ({ onClose, isOpen }) => {
    const {editSchedule, semesterFaculties, semesterDegreePrograms, semesterBlocs, dispatch} = useSemesterContext()
    const [course, setCourse] = useState("")
    const [error, setError] = useState(null)
    const [room, setRoom] = useState("")
    const [faculty, setFaculty] = useState("")
    const [students, setStudents] = useState([])
    const [remarks, setRemarks] = useState("")
    const [weeklySchedule, setWeeklySchedule] = useState([{}])
    const params = useParams()

    const [courseType, setCourseType] = useState({ type: "None", status: "None" })

    console.log(course)
    console.log(room)
    console.log(faculty)
    console.log(students)

    const commonModalButtonStyle = {
        borderRadius: '50%',
        background: '#035C65',
        cursor: 'pointer',
        borderColor: 'transparent',
        marginTop: '12px',
    };

    return (
        <Modal isOpen={isOpen} size={'3xl'} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent style={{ border: '2px solid #035C65', borderColor: '#035C65' }}>
                <h1 className='text-5xl text-enamelled-jewel font-bold bg-placebo-turquoise border-b-4 mb-4 border-enamelled-jewel rounded-tl-md rounded-tr-md pl-5 py-2'>New Schedule:</h1>
                <ModalCloseButton size="sm" style={{ ...commonModalButtonStyle, marginRight: '30px', pointerEvents: 'none', color: '#035C65', }} />
                <ModalCloseButton size="sm" style={{ ...commonModalButtonStyle, marginRight: '60px', pointerEvents: 'none', color: '#035C65', }} />
                <ModalCloseButton size="sm" style={{ ...commonModalButtonStyle, color: 'white', }} />
                <ModalBody >
                    <div className='flex justify-center'>
                        <div className='flex flex-col space-y-5 w-full px-10'>
                            {/* Course */}
                            <CourseMaker semId={params.id} setMainCourse={setCourse} mainCourse={course} setCourseType={setCourseType} courseType={courseType.type} students={students} setStudents={setStudents} />

                            {/* Schedule */}
                            <div>
                                <p className='text-3xl font-bold'>Schedule</p>
                                <div className='flex flex-wrap flex-col space-y-4'>
                                    {
                                        weeklySchedule && weeklySchedule.map((time, index, self) => (
                                            <div className='flex flex-row' key={index}>
                                                <ScheduleMaker
                                                    key={index}
                                                    index={index}
                                                    weeklySchedule={time}
                                                    setWeeklySchedule={updatedSchedule => {
                                                        const newWeeklySchedule = [...weeklySchedule]; // Create a new reference
                                                        newWeeklySchedule[index] = updatedSchedule; // Update the specific index
                                                        setWeeklySchedule(newWeeklySchedule); // Set the updated array as state
                                                    }}
                                                />
                                                {
                                                    index > 0 &&
                                                    <div className="pl-2 pt-3">
                                                        <FaXmark
                                                            className="text-lg cursor-pointer hover:bg-red-300 hover:rounded-lg"
                                                            onMouseDown={() => {
                                                                const newWeeklySchedule = weeklySchedule.filter((_, i) => i !== index);

                                                                setWeeklySchedule(newWeeklySchedule);
                                                            }}
                                                        />
                                                    </div>
                                                }
                                            </div>
                                        ))
                                    }


                                </div>

                                {/* Add more section */}
                                <p className={`underline px-1 mt-2 opacity-30 max-w-max cursor-pointer ${weeklySchedule.length == 3 && "hidden"}`}
                                    onMouseDown={() => {
                                        setWeeklySchedule(prev => [...prev, {}])
                                    }}
                                >add schedule</p>
                            </div>

                            {/* Room */}
                            <RoomMaker semId={params.id} setMainRoom={setRoom} mainRoom={room} />

                            {/* Faculty & Students */}
                            <div className='flex flex-row justify-between'>
                                {/* Faculty */}
                                <FacultyMaker semId={params.id} setMainFaculty={setFaculty} mainFaculty={faculty} faculties={semesterFaculties}/>

                                {/* Students */}
                                <StudentMaker semId={params.id} setStudents={setStudents} students={students} courseType={courseType} degreePrograms={semesterDegreePrograms} blocs={semesterBlocs} />
                            </div>

                            {/* Remarks */}
                            <RemarksMaker mainRemarks={remarks} setMainRemarks={setRemarks} />

                            {/* Error Message */}
                            {
                                error &&
                                <div className='bg-red-300 p-3 border-2 border-black rounded-lg'>
                                    {error.error}
                                    <br />
                                    {error.emptyFields.map((field)=>{
                                        return <strong key={field}>{field + ", "}</strong>
                                    })}
                                </div>
                            }
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter justifyContent={"center"} alignItems={"center"}>
                    <div className="flex flex-row space-x-4 mt-6">
                        <button className='w-20 h-10 bg-placebo-turquoise border-2 border-enamelled-jewel'
                            onClick={async () => {
                                const res = await fetch(`http://localhost:4000/api/schedule/${params.id}`, {
                                    method: 'POST',
                                    credentials: 'include',
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        course: course._id,
                                        weeklySchedule: weeklySchedule,
                                        room: room._id,
                                        faculty: faculty._id,
                                        students: students.map((e) => { return e._id }),
                                        remarks: remarks
                                    })
                                })
                                const data = await res.json()
                                if (data.error) {
                                    setError(data)
                                } else {
                                    dispatch({type: 'CREATE_SCHEDULE', payload: data})
                                    onClose()
                                }

                            }}
                        >Save</button>
                        <button onClick={onClose} className='w-20 h-10 border-2 border-enamelled-jewel'>Cancel</button>
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddScheduleModal