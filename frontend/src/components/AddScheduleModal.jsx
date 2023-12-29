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
import { useEffect, useMemo, useState } from 'react';

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

const getStartTime = (section) => {
    switch (section) {
        case "A":
        case "I":
        case "Q":
            return "7:00 AM";
        case "B":
        case "J":
        case "R":
            return "8:30 AM";
        case "C":
        case "K":
        case "S":
            return "10:00 AM";
        case "D":
        case "L":
        case "T":
            return "11:30 AM";
        case "E":
        case "M":
        case "U":
            return "1:00 PM";
        case "F":
        case "N":
        case "V":
            return "2:30 PM";
        case "G":
        case "O":
        case "W":
            return "4:00 PM";
        case "H":
        case "P":
        case "X":
            return "5:30 PM";
        default:
            break;
    }
}

const generateTimeSlots = (startTime) => {
    const times = [];
    const start = new Date(`2000-01-01 ${startTime}`);
    let currentTime = new Date(start.getTime() + 60 * 60 * 1000); // Adding one hour

    const endTime = new Date(`2000-01-01 7:30 PM`);

    while (currentTime <= endTime) {
        const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        times.push(formattedTime);
        currentTime = new Date(currentTime.getTime() + 30 * 60 * 1000); // Adding 30 minutes
    }
    console.log(times)
    return times;
}


const AddScheduleModal = ({ semester, onClose, isOpen, sched }) => {
    const [firstSectionEndTime, setFirstSectionEndTime] = useState("")
    const [firstSectionDropdownVisible, setFirstSectionDropdownVisible] = useState(false)
    const [firstSection, setFirstSection] = useState(null)

    const [secondSectionEndTime, setSecondSectionEndTime] = useState("")
    const [secondSectionDropdownVisible, setSecondSectionDropdownVisible] = useState(false)
    const [secondSection, setSecondSection] = useState(null)

    const [thirdSectionEndTime, setThirdSectionEndTime] = useState("")
    const [thirdSectionDropdownVisible, setThirdSectionDropdownVisible] = useState(false)
    const [thirdSection, setThirdSection] = useState(null)

    const [courseDisplay, setCourseDisplay] = useState(null)
    const [courseDropdownVisible, setcourseDropdownVisible] = useState(false)
    const [sectionDropdownVisible, setSectionDropdownVisible] = useState(false)
    const [filteredCourse, setFilteredCourse] = useState(sched)
    const [courseSearch, setCourseSearch] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const section = [
        "A", "B", "C", "D", "E", "F",
        "G", "H", "I", "J", "K", "L",
        "M", "N", "O", "P", "Q", "R",
        "S", "T", "U", "V", "W", "X"
    ]
    useEffect(() => {
        const courseFilter = filterRepeatedCourses(sched).filter((e) => {
            return e.course.code && e.course.code.toLowerCase().includes(courseSearch.toLowerCase())
        })
        setFilteredCourse(courseFilter)
    }, [courseSearch])


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
                <ModalBody>
                    <div className='flex flex-col'>
                        <div className='flex flex-col'>
                            <p>Course</p>
                            <div className='flex flex-wrap flex-row space-x-4'>
                                <div className='w-1/5 relative inline-block'>
                                    <input className="border border-black rounded-xl pl-2 w-full" onFocus={() => setcourseDropdownVisible(true)} onBlur={() => setcourseDropdownVisible(false)} onChange={(e) => (setCourseDisplay(null), setCourseSearch(e.target.value))} placeholder="Course Code" type='text' value={courseSearch} />
                                    <div className={`absolute flex flex-col w-max max-w-max bg-white border border-black z-10 ${!courseDropdownVisible && 'hidden'}`}>
                                        {filteredCourse.length > 0
                                            ? filteredCourse.map((data, index) => {
                                                return <p key={index} onMouseDown={() => { setCourseSearch(data.course.code); setCourseDisplay({ type: data.course.type, units: data.course.units, department: data.course.department }) }} className='hover:bg-placebo-turquoise hover:cursor-pointer'>{data.course.type} | <strong>{data.course.code}</strong> - {data.course.name}</p>
                                            })
                                            : <a>Loading ...</a>
                                        }
                                    </div>
                                </div>
                                <div className='w-20'><input className="border border-black rounded-xl w-full hover:cursor-not-allowed bg-placebo-turquoise text-center" placeholder="Type" type='text' value={courseDisplay ? courseDisplay.type : ""} readOnly /></div>
                                <div className='w-20'><input className="border border-black rounded-xl w-full hover:cursor-not-allowed bg-placebo-turquoise text-center" placeholder="Units" type='text' value={courseDisplay ? courseDisplay.units : ""} readOnly /></div>
                                <div className='w-20'><input className="border border-black rounded-xl w-full hover:cursor-not-allowed bg-placebo-turquoise text-center" placeholder="Dept." type='text' value={courseDisplay ? courseDisplay.department : ""} readOnly /></div>
                            </div>
                            <div>
                                <p className='underline opacity-30'>create new course</p>
                            </div>
                            <div>
                                <p>Schedule</p>
                                <div className='flex flex-wrap flex-col'>
                                    <div className='relative inline-block'>
                                        <div className='flex flex-row space-x-4'>
                                            <input type='text' placeholder='Section' className="border border-black rounded-xl w-20 cursor-pointer text-center" value={firstSection} onFocus={() => setSectionDropdownVisible(true)} onBlur={() => setSectionDropdownVisible(false)} readOnly />
                                            {
                                                firstSection &&
                                                (
                                                    <div className='flex flex-row space-x-2'>
                                                        <p>Start Time:</p>
                                                        <input className='border border-black rounded-xl text-center w-20 hover:cursor-not-allowed' value={getStartTime(firstSection)} readOnly />
                                                        <p>End Time:</p>
                                                        <div className='relative inline-block'>
                                                            <div className='flex flex-row'>
                                                                <input className='border border-black rounded-xl text-center w-20 cursor-pointer' onFocus={() => setFirstSectionDropdownVisible(true)} onBlur={() => setFirstSectionDropdownVisible(false)} placeholder="End Time" value={firstSectionEndTime} readOnly />
                                                            </div>
                                                            <div className={`absolute flex flex-col h-40 overflow-scroll w-20 border border-black rounded-lg ${!firstSectionDropdownVisible ? 'hidden' : ''}`}>
                                                                {
                                                                    generateTimeSlots(getStartTime(firstSection)).map((time) => {
                                                                        return <p className='bg-white cursor-pointer' key={time} onMouseDown={() => (setFirstSectionEndTime(time))}>{time}</p>
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className={`absolute flex flex-col h-40 overflow-scroll w-20 border border-black rounded-lg ${!sectionDropdownVisible ? 'hidden' : ''}`}>
                                            {section.map((letter) => {
                                                return <p key={letter} className='w-full text-center bg-white hover:bg-placebo-turquoise cursor-pointer' onMouseDown={() => (setFirstSection(letter), setFirstSectionEndTime(""))}>{letter}</p>
                                            })
                                            }
                                        </div>
                                    </div>
                                </div>
                                {
                                    (firstSection && secondSection && thirdSection)
                                }
                            </div>
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter justifyContent={"center"} alignItems={"center"}>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddScheduleModal