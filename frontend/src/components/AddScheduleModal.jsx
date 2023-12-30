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
import { IoMdSearch } from "react-icons/io";
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

const filterRepeatedRooms = (arr) => {
    const roomsMap = {}; // Map to track unique colors

    // Filter the input array
    const filteredArray = arr.filter((obj) => {
        if (!roomsMap[obj.room.name]) {
            roomsMap[obj.room.name] = true; // Mark color as seen
            return true; // Include the object in the filtered array
        }
        return false; // Exclude the object if color is already seen
    });
    return filteredArray;
};

const getStartTime = (section) => {
    switch (section) {
        case "A":
            return { time: "7:00 AM", day: ["Tue", "Thu"] };
        case "I":
            return { time: "7:00 AM", day: ["Wed", "Fri"] };
        case "Q":
            return { time: "7:00 AM", day: ["Monday"] };
        case "B":
            return { time: "8:30 AM", day: ["Tue", "Thu"] };
        case "J":
            return { time: "8:30 AM", day: ["Wed", "Fri"] };
        case "R":
            return { time: "8:30 AM", day: ["Monday"] };
        case "C":
            return { time: "10:00 AM", day: ["Tue", "Thu"] };
        case "K":
            return { time: "10:00 AM", day: ["Wed", "Fri"] };
        case "S":
            return { time: "10:00 AM", day: ["Monday"] };
        case "D":
            return { time: "11:30 AM", day: ["Tue", "Thu"] };
        case "L":
            return { time: "11:30 AM", day: ["Wed", "Fri"] };
        case "T":
            return { time: "11:30 AM", day: ["Monday"] };
        case "E":
            return { time: "1:00 PM", day: ["Tue", "Thu"] };
        case "M":
            return { time: "1:00 PM", day: ["Wed", "Fri"] };
        case "U":
            return { time: "1:00 PM", day: ["Monday"] };
        case "F":
            return { time: "2:30 PM", day: ["Tue", "Thu"] };
        case "N":
            return { time: "2:30 PM", day: ["Wed", "Fri"] };
        case "V":
            return { time: "2:30 PM", day: ["Monday"] };
        case "G":
            return { time: "4:00 PM", day: ["Tue", "Thu"] };
        case "O":
            return { time: "4:00 PM", day: ["Wed", "Fri"] };
        case "W":
            return { time: "4:00 PM", day: ["Monday"] };
        case "H":
            return { time: "5:30 PM", day: ["Tue", "Thu"] };
        case "P":
            return { time: "5:30 PM", day: ["Wed", "Fri"] };
        case "X":
            return { time: "5:30 PM", day: ["Monday"] };
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
    const [firstEndtimeDropdownVisible, setFirstEndtimeDropdownVisible] = useState(false)
    const [firstSection, setFirstSection] = useState(null)

    const [showSecondSection, setShowSecondSection] = useState(false)
    const [secondSectionEndTime, setSecondSectionEndTime] = useState("")
    const [secondSectionDropdownVisible, setSecondSectionDropdownVisible] = useState(false)
    const [secondEndtimeDropdownVisible, setSecondEndtimeDropdownVisible] = useState(false)
    const [secondSection, setSecondSection] = useState(null)

    const [showThirdSection, setShowThirdSection] = useState(false)
    const [thirdSectionEndTime, setThirdSectionEndTime] = useState("")
    const [thirdSectionDropdownVisible, setThirdSectionDropdownVisible] = useState(false)
    const [thirdEndtimeDropdownVisible, setThirdEndtimeDropdownVisible] = useState(false)
    const [thirdSection, setThirdSection] = useState(null)

    // const [showThirdSection, setShowThirdSection] = useState(false)
    // const [thirdSectionEndTime, setThirdSectionEndTime] = useState("")
    // const [thirdSectionDropdownVisible, setThirdSectionDropdownVisible] = useState(false)
    const [roomDisplay, setRoomDisplay] = useState(null)
    const [roomDropdownVisible, setRoomDropdownVisible] = useState(false)
    // const [thirdSection, setThirdSection] = useState(null)

    const [courseDisplay, setCourseDisplay] = useState(null)
    const [courseDropdownVisible, setcourseDropdownVisible] = useState(false)
    const [sectionDropdownVisible, setSectionDropdownVisible] = useState(false)
    const [filteredCourse, setFilteredCourse] = useState(sched)
    const [filteredRoom, setFilteredRoom] = useState([])
    const [courseSearch, setCourseSearch] = useState('')
    const [roomSearch, setRoomSearch] = useState("")
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

    useEffect(() => {
        const roomFilter = filterRepeatedRooms(sched).filter((e) => {
            return e.room.name && e.room.name.toLowerCase().includes(roomSearch.toLowerCase())
        })
        setFilteredRoom(roomFilter)
    }, [roomSearch])


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
                    <div className='flex flex-col space-y-5 pl-10'>
                        {/* Course */}
                        <div>
                            <p className='text-3xl font-bold'>Course</p>
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
                        </div>


                        {/* Schedule */}
                        <div>
                            <p className='text-3xl font-bold'>Schedule</p>
                            <div className='flex flex-wrap flex-col space-y-4'>

                                {/* First Section Details */}
                                <div className='relative inline-block'>
                                    <div className='flex flex-row space-x-4'>
                                        {/* Section Selector */}
                                        <input type='text' placeholder='Section' className="border border-black rounded-xl w-20 cursor-pointer text-center" value={firstSection} onFocus={() => setFirstSectionDropdownVisible(true)} onBlur={() => setFirstSectionDropdownVisible(false)} readOnly />
                                        {
                                            firstSection &&
                                            (
                                                <div className='flex flex-row space-x-2'>
                                                    {/* Start Time: Default value based on Section Letter */}
                                                    <p>Start Time:</p>
                                                    <input className='border border-black rounded-xl text-center w-20 hover:cursor-not-allowed' value={getStartTime(firstSection).time} readOnly />

                                                    {/* End Time: user's input*/}
                                                    <p>End Time:</p>
                                                    <div className='relative inline-block'>
                                                        <div className='flex flex-row'>
                                                            <input className='border border-black rounded-xl text-center w-20 cursor-pointer' onFocus={() => setFirstEndtimeDropdownVisible(true)} onBlur={() => setFirstEndtimeDropdownVisible(false)} placeholder="End Time" value={firstSectionEndTime} readOnly />
                                                        </div>

                                                        {/* End Time Choices */}
                                                        <div className={`absolute flex flex-col h-40 overflow-scroll w-20 border border-black rounded-lg z-10 ${!firstEndtimeDropdownVisible ? 'hidden' : ''}`}>
                                                            {
                                                                generateTimeSlots(getStartTime(firstSection).time).map((time) => {
                                                                    return <p className='bg-white cursor-pointer' key={time} onMouseDown={() => (setFirstSectionEndTime(time))}>{time}</p>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        {
                                            firstSection && getStartTime(firstSection).day.map((day) => {
                                                return <div className='border border-enamelled-jewel bg-placebo-turquoise px-1 rounded-lg' key={day}>
                                                    {day}
                                                </div>
                                            })
                                        }
                                    </div>

                                    {/* Section Dropdown Choices */}
                                    <div className={`absolute flex flex-col h-40 overflow-scroll w-20 border border-black rounded-lg z-10 ${!firstSectionDropdownVisible ? 'hidden' : ''}`}>
                                        {section.map((letter) => {
                                            return <p key={letter} className='w-full text-center bg-white hover:bg-placebo-turquoise cursor-pointer' onMouseDown={() => (setFirstSection(letter), setFirstSectionEndTime(""))}>{letter}</p>
                                        })
                                        }
                                    </div>
                                </div>

                                {/* Second Section Details */}
                                {
                                    showSecondSection &&
                                    <div className='relative inline-block'>
                                        <div className='flex flex-row space-x-4'>
                                            {/* Section Selector */}
                                            <input type='text' placeholder='Section' className="border border-black rounded-xl w-20 cursor-pointer text-center" value={secondSection} onFocus={() => setSecondSectionDropdownVisible(true)} onBlur={() => setSecondSectionDropdownVisible(false)} readOnly />
                                            {
                                                secondSection &&
                                                (
                                                    <div className='flex flex-row space-x-2'>
                                                        {/* Start Time: Default value based on Section Letter */}
                                                        <p>Start Time:</p>
                                                        <input className='border border-black rounded-xl text-center w-20 hover:cursor-not-allowed' value={getStartTime(secondSection).time} readOnly />

                                                        {/* End Time: user's input*/}
                                                        <p>End Time:</p>
                                                        <div className='relative inline-block'>
                                                            <div className='flex flex-row'>
                                                                <input className='border border-black rounded-xl text-center w-20 cursor-pointer' onFocus={() => setSecondEndtimeDropdownVisible(true)} onBlur={() => setSecondEndtimeDropdownVisible(false)} placeholder="End Time" value={secondSectionEndTime} readOnly />
                                                            </div>

                                                            {/* End Time Choices */}
                                                            <div className={`absolute flex flex-col h-40 overflow-scroll w-20 border border-black rounded-lg z-10 ${!secondEndtimeDropdownVisible ? 'hidden' : ''}`}>
                                                                {
                                                                    generateTimeSlots(getStartTime(secondSection).time).map((time) => {
                                                                        return <p className='bg-white cursor-pointer' key={time} onMouseDown={() => (setSecondSectionEndTime(time))}>{time}</p>
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            {
                                                secondSection && getStartTime(secondSection).day.map((day) => {
                                                    return <div className='border border-enamelled-jewel bg-placebo-turquoise px-1 rounded-lg' key={day}>
                                                        {day}
                                                    </div>
                                                })
                                            }
                                            {/* Remove Second Section */}
                                            <div>
                                                <FaXmark className="cursor-pointer" onMouseDown={() => { setShowSecondSection(false) }} />
                                            </div>
                                        </div>

                                        {/* Section Dropdown Choices */}
                                        <div className={`absolute flex flex-col h-40 overflow-scroll w-20 border border-black rounded-lg z-10 ${!secondSectionDropdownVisible ? 'hidden' : ''}`}>
                                            {section.map((letter) => {
                                                return <p key={letter} className='w-full text-center bg-white hover:bg-placebo-turquoise cursor-pointer' onMouseDown={() => (setSecondSection(letter), setSecondSectionEndTime(""))}>{letter}</p>
                                            })
                                            }
                                        </div>

                                    </div>
                                }

                                {/* Third Section Details */}
                                {
                                    showThirdSection &&
                                    <div className='relative inline-block'>
                                        <div className='flex flex-row space-x-4'>
                                            {/* Section Selector */}
                                            <input type='text' placeholder='Section' className="border border-black rounded-xl w-20 cursor-pointer text-center" value={thirdSection} onFocus={() => setThirdSectionDropdownVisible(true)} onBlur={() => setThirdSectionDropdownVisible(false)} readOnly />
                                            {
                                                thirdSection &&
                                                (
                                                    <div className='flex flex-row space-x-2'>
                                                        {/* Start Time: Default value based on Section Letter */}
                                                        <p>Start Time:</p>
                                                        <input className='border border-black rounded-xl text-center w-20 hover:cursor-not-allowed' value={getStartTime(thirdSection).time} readOnly />

                                                        {/* End Time: user's input*/}
                                                        <p>End Time:</p>
                                                        <div className='relative inline-block'>
                                                            <div className='flex flex-row'>
                                                                <input className='border border-black rounded-xl text-center w-20 cursor-pointer' onFocus={() => setThirdEndtimeDropdownVisible(true)} onBlur={() => setThirdEndtimeDropdownVisible(false)} placeholder="End Time" value={thirdSectionEndTime} readOnly />
                                                            </div>

                                                            {/* End Time Choices */}
                                                            <div className={`absolute flex flex-col h-40 overflow-scroll w-20 border border-black rounded-lg z-10 ${!thirdEndtimeDropdownVisible ? 'hidden' : ''}`}>
                                                                {
                                                                    generateTimeSlots(getStartTime(thirdSection).time).map((time) => {
                                                                        return <p className='bg-white cursor-pointer' key={time} onMouseDown={() => (setThirdSectionEndTime(time))}>{time}</p>
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            {
                                                thirdSection && getStartTime(thirdSection).day.map((day) => {
                                                    return <div className='border border-enamelled-jewel bg-placebo-turquoise px-1 rounded-lg' key={day}>
                                                        {day}
                                                    </div>
                                                })
                                            }
                                            {/* Remove Third Section */}
                                            <div>
                                                <FaXmark className="cursor-pointer" onMouseDown={() => { setShowThirdSection(false) }} />
                                            </div>
                                        </div>

                                        {/* Section Dropdown Choices */}
                                        <div className={`absolute flex flex-col h-40 overflow-scroll w-20 border border-black rounded-lg z-10 ${!thirdSectionDropdownVisible ? 'hidden' : ''}`}>
                                            {section.map((letter) => {
                                                return <p key={letter} className='w-full text-center bg-white hover:bg-placebo-turquoise cursor-pointer' onMouseDown={() => (setThirdSection(letter), setThirdSectionEndTime(""))}>{letter}</p>
                                            })
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                            {
                                ((firstSection || showSecondSection) && !showThirdSection) && <p className='underline opacity-30 cursor-pointer' onMouseDown={() => { !showSecondSection ? setShowSecondSection(true) : !showThirdSection ? setShowThirdSection(true) : "" }}>add more schedule</p>
                            }
                        </div>

                        {/* Room */}
                        <div>
                            <p className='text-3xl font-bold'>Room</p>
                            <div className='flex flex-row space-x-2'>
                                <div className='relative inline-block'>
                                    <input className='border border-black rounded-xl w-20 text-center' onFocus={() => setRoomDropdownVisible(true)} onBlur={() => setRoomDropdownVisible(false)} onChange={(e) => { setRoomSearch(e.target.value); setRoomDisplay(null) }} value={roomSearch} />
                                    <div className={`absolute flex flex-col w-20 bg-white border border-black z-10 ${!roomDropdownVisible && 'hidden'}`}>
                                        {
                                            filteredRoom.length > 0
                                                ? filteredRoom.map((data, index) => {
                                                    return <p className="w-full text-center hover:bg-placebo-turquoise cursor-pointer" onMouseDown={() => { setRoomSearch(data.room.name); setRoomDisplay(data.room) }} key={index}>{data.room.building} | {data.room.name}</p>

                                                })
                                                : <p>Loading ...</p>
                                        }
                                    </div>
                                </div>

                                {
                                    roomDisplay
                                        ? (
                                            <>
                                                <p>Building:</p>
                                                <div className='border border-enamelled-jewel bg-placebo-turquoise px-2 rounded-xl'>{roomDisplay.building}</div>
                                            </>
                                        )
                                        : <></>
                                }
                            </div>
                            <p className='underline opacity-30'>create new room</p>
                        </div>

                        {/* Faculty & Students */}
                        <div className='flex flex-row space-x-24'>
                            {/* Faculty */}
                            <div className='flex flex-col space-y-2'>
                                <p className='text-3xl font-bold'>Faculty</p>
                                <input className='border border-black' />
                                <input className='border border-black' />
                                <input className='border border-black' />
                                <input className='border border-black' />
                                <input className='border border-black' />


                            </div>

                            {/* Students */}
                            <div className='flex flex-col space-y-2'>
                                <p className='text-3xl font-bold'>Students</p>
                                <input className='border border-black' />
                                <input className='border border-black' />
                                <input className='border border-black' />
                                <input className='border border-black' />
                                <input className='border border-black' />
                            </div>
                        </div>

                        <div className='w-1/2'>
                            <p className='text-3xl font-bold'>Remarks</p>
                            <textarea className='w-full border border-black'></textarea>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter justifyContent={"center"} alignItems={"center"}>
                    <div className="flex flex-row space-x-4 mt-6">
                        <button className='w-20 h-10 bg-placebo-turquoise border-2 border-enamelled-jewel'>Save</button>
                        <button className='w-20 h-10 border-2 border-enamelled-jewel'>Cancel</button>
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddScheduleModal