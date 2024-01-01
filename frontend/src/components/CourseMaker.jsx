import { useDisclosure } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { useEffect, useState } from "react";
const filterRepeatedCourses = (arr) => {
    const coursesMap = {}; // Map to track unique colors

    // Filter the input array
    const filteredArray = arr.filter((obj) => {
        if (!coursesMap[`${obj.course.code}-${obj.course.type}`]) {
            coursesMap[`${obj.course.code}-${obj.course.type}`] = true; // Mark color as seen
            return true; // Include the object in the filtered array
        }
        return false; // Exclude the object if color is already seen
    });
    return filteredArray;
};

const CourseMaker = ({ semId, setMainCourse, mainCourse, setCourseType, courseType, students, setStudents }) => {
    const [initialCourse, setInitialCourse] = useState(null)

    const [courseDisplay, setCourseDisplay] = useState(mainCourse)
    const [courseDropdownVisible, setcourseDropdownVisible] = useState(false)

    const [courseList, setCourseList] = useState([])
    const [filteredCourse, setFilteredCourse] = useState([])

    // Search Box Input
    const [courseSearch, setCourseSearch] = useState('')

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        (async function () {
            const res = await fetch(`http://localhost:4000/api/course/${semId}`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await res.json()
            setCourseList(data)
            setFilteredCourse(data)
        }())
    }, [semId])

    useEffect(() => {
        const courseFilter = courseList.filter((course) => {
            return (course.code && course.name && ((course.type + " " + course.code + " - " + course.name).toLowerCase().includes(courseSearch.toLowerCase())))
        })
        setFilteredCourse(courseFilter)
    }, [courseSearch])
    return (
        <div className="w-full">
            <p className='text-3xl font-bold cursor-pointer'>Course</p>
            <div className='flex flex-wrap flex-row space-x-4'>
                <div className='w-3/6 relative inline-block'>
                    {/* Course Search Box */}
                    <input className="outline-none border-2 h-9 text-lg border-black rounded-md pl-2 w-full" onFocus={(e) => { setcourseDropdownVisible(true); setCourseSearch(e.target.value) }} onBlur={() => setcourseDropdownVisible(false)} onChange={(e) => (setCourseType({ type: courseType, status: "Unchanged" }), setCourseSearch(e.target.value))} placeholder="Course Code" type='text' value={courseSearch} />

                    {/* Course Dropdown */}
                    <div className={`absolute flex flex-col w-full bg-white border-2 border-black z-10 ${!courseDropdownVisible && 'hidden'}`}>
                        {filteredCourse.length > 0
                            ? filteredCourse.map((course, index, self) => {
                                return (
                                    <p
                                        className='hover:bg-placebo-turquoise hover:cursor-pointer truncate'
                                        key={index}
                                        onMouseDown={() => {
                                            if (courseDisplay && students.length > 0 && course.type.toString() !== courseDisplay.type.toString()) {
                                                setInitialCourse(course);
                                                return onOpen()
                                            }
                                            else {
                                                setCourseSearch("");
                                                setCourseDisplay(course);
                                                setMainCourse(course)
                                                setCourseType({ type: course.type, status: courseType == course.type ? "Unchanged" : "Changed" })
                                            }
                                        }}>
                                        <strong className="text-enamelled-jewel">{course.type}</strong> <strong>{course.code}</strong> - {course.name}
                                    </p>
                                )
                            })
                            : <a>Loading ...</a>
                        }
                    </div>
                </div>
                <div className="flex flex-col w-72 space-y-4">
                    <div className="flex flex-row justify-between w-full">
                        {/* Dispaly Course Type */}
                        <div className='w-20'><input className={`outline-none border-2 border-black rounded-md w-full h-9 text-lg hover:cursor-not-allowed bg-placebo-turquoise text-center ${!courseDisplay && "opacity-30 bg-white"}`} placeholder="Type" type='text' value={courseDisplay ? courseDisplay.type : ""} readOnly /></div>

                        {/* Display Course Units */}
                        <div className='w-20'><input className={`outline-none border-2 border-black rounded-md w-full h-9 text-lg hover:cursor-not-allowed bg-placebo-turquoise text-center ${!courseDisplay && "opacity-30 bg-white"}`} placeholder="Units" type='text' value={courseDisplay ? courseDisplay.units : ""} readOnly /></div>

                        {/* Display Course Department */}
                        <div className='w-20'><input className={`outline-none border-2 border-black rounded-md w-full h-9 text-lg hover:cursor-not-allowed bg-placebo-turquoise text-center ${!courseDisplay && "opacity-30 bg-white"}`} placeholder="Dept." type='text' value={courseDisplay ? courseDisplay.department : ""} readOnly /></div>
                    </div>
                    <div>
                        <textarea className={`outline-none border-2 border-black rounded-md w-full h-16 resize-none text-lg hover:cursor-not-allowed bg-placebo-turquoise text-center ${!courseDisplay && "opacity-30 bg-white"}`} placeholder="Course Description" type='text' value={courseDisplay ? courseDisplay.name : ""} readOnly />
                    </div>
                </div>
            </div>

            {/* Create New Non-Existing Course */}
            <div>
                <p className='underline opacity-30'>create new course</p>
            </div>
            <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
                <ModalContent style={{ border: '2px solid #035C65', borderColor: '#035C65' }}>
                    <ModalBody>
                        <p className="text-2xl text-red-600"><strong>Warning!</strong></p>
                        <p className="text-black">Changing a course from <strong>LEC</strong> to <strong>LAB</strong> or <strong>LAB</strong> to <strong>LEC</strong> will reset the Students List that you inputted (if there's any) for this schedule</p>
                        <br />
                        <p>Reason: </p>
                        <p><strong>LEC</strong> only accepts specific degree program</p>
                        <p><strong>LAB</strong> only accepts specific blocs</p>
                    </ModalBody>
                    <ModalFooter justifyContent={"center"} alignItems={"center"}>
                        <div>
                            <p>Do you wish to proceed?</p>
                            <div className="flex flex-row space-x-4">
                                <button
                                    className='w-20 h-10 bg-placebo-turquoise border-2 border-enamelled-jewel'
                                    onClick={
                                        () => {
                                            setStudents([])
                                            setCourseSearch("");
                                            setCourseDisplay(initialCourse)
                                            setMainCourse(initialCourse)
                                            setCourseType({ type: initialCourse.type, status: "Changed" })
                                            setcourseDropdownVisible(true)
                                            return onClose()
                                        }}
                                >
                                    Yes
                                </button>
                                <button onClick={()=>{
                                    setcourseDropdownVisible(true)
                                    return onClose()
                                    }} className='w-20 h-10 border-2 border-enamelled-jewel'>No</button>
                            </div>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default CourseMaker