import { useEffect, useState } from "react"
import { FaXmark, FaAngleDown, FaEraser } from "react-icons/fa6";
import { getStartTime, getMatchingSection, generateTimeSlots } from "../utils/schedTimeUtils"

const ScheduleMaker = ({ edit, weeklySchedule, setWeeklySchedule }) => {
    const [SectionStartTime, setSectionStartTime] = useState(edit ? weeklySchedule.startTime : "")
    const [SectionEndTime, setSectionEndTime] = useState(edit ? weeklySchedule.endTime : "")
    const [SectionDays, setSectionDays] = useState(edit ? weeklySchedule.day : "")
    const [SectionDropdownVisible, setSectionDropdownVisible] = useState(false)
    const [StartTimeDropdownVisible, setStartTimeDropdownVisible] = useState(false)
    const [EndtimeDropdownVisible, setEndtimeDropdownVisible] = useState(false)
    const [Section, setSection] = useState(edit ? weeklySchedule.section : "")
    const startTimeSlots = [
        "7:00 AM", "8:30 AM", "10:00 AM", "11:30 AM",
        "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"
    ];

    const section = [
        "A", "B", "C", "D", "E", "F",
        "G", "H", "I", "J", "K", "L",
        "M", "N", "O", "P", "Q", "R",
        "S", "T", "U", "V", "W", "X"
    ]
    useEffect(()=>{setWeeklySchedule({section: Section, startTime: SectionStartTime, endTime: SectionEndTime, day: SectionDays})
    },[Section, SectionStartTime, SectionEndTime, SectionDays])

    return (
        <div className='flex flex-col space-y-1'>
            <div className='relative inline-block'>
                <div className='flex flex-row space-x-4'>
                    {/* Section Selector */}
                    <div className="realtive inline-block">
                        {/* Section Selection Box */}
                        <input type='text' placeholder='Section' className="outline-none border-2 border-black rounded-md w-20 h-9 text-lg cursor-pointer text-center" value={weeklySchedule.section ? weeklySchedule.section: Section} onFocus={() => setSectionDropdownVisible(true)} onBlur={() => setSectionDropdownVisible(false)} readOnly />

                        {/* Section Dropdown Choices */}
                        <div className={`absolute flex flex-col h-40 overflow-scroll w-20 border-2 border-black rounded-lg z-10 ${!SectionDropdownVisible ? 'hidden' : ''}`}>
                            {section.map((letter) => {
                                return <p key={letter} className='w-full text-center bg-white hover:bg-placebo-turquoise cursor-pointer' onMouseDown={() => (setSection(letter), setSectionStartTime(getStartTime(letter).time), setSectionEndTime(""), setSectionDays(getStartTime(letter).day))}>{letter}</p>
                            })
                            }
                        </div>
                    </div>

                    <div>
                        <p>:</p>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <div className='flex flex-row space-x-2 items-center'>
                            {/* Start Time: */}
                            <div className='relative inline-block w-32'>
                                {/* Start Time Box */}
                                <div className='flex flex-row items-center w-full border-2 border-black rounded-md px-1'>
                                    <input className='outline-none rounded-md text-center w-full h-9 text-lg cursor-pointer' placeholder='Start Time' onFocus={() => setStartTimeDropdownVisible(true)} onBlur={() => setStartTimeDropdownVisible(false)} value={weeklySchedule.startTime ? weeklySchedule.startTime: Section ? getStartTime(Section).time : SectionStartTime} readOnly />
                                    <FaAngleDown />
                                </div>

                                {/* Start Time Dropdown Choices */}
                                <div className={`absolute flex flex-col max-h-40 overflow-scroll w-full border-2 border-black rounded-lg z-10 ${!StartTimeDropdownVisible ? 'hidden' : ''}`}>
                                    {
                                        startTimeSlots.map((time) => {
                                            return <p className='bg-white cursor-pointer'
                                                key={time}
                                                onMouseDown={() => {
                                                    SectionDays ? setSection(getMatchingSection({ time: time, day: SectionDays })) : setSection("");
                                                    setSectionStartTime(time);
                                                    setSectionEndTime("")
                                                }}>
                                                {time}
                                            </p>
                                        })
                                    }
                                </div>
                            </div>

                            {/* End Time: */}
                            <div className='relative inline-block w-32'>
                                {/* End Time Box */}
                                <div className='flex flex-row items-center w-full border-2 border-black rounded-md px-1'>
                                    <input className='outline-none rounded-md text-center w-full h-9 text-lg cursor-pointer' onFocus={() => setEndtimeDropdownVisible(true)} onBlur={() => setEndtimeDropdownVisible(false)} placeholder="End Time" value={weeklySchedule.endTime ? weeklySchedule.endTime : SectionEndTime} readOnly />
                                    <FaAngleDown />
                                </div>

                                {/* End Time Dropdown Choices */}
                                <div className={`absolute flex flex-col max-h-40 overflow-scroll w-full border-2 border-black rounded-lg z-10 ${!EndtimeDropdownVisible ? 'hidden' : ''}`}>
                                    {
                                        (Section || SectionStartTime)
                                            ? generateTimeSlots(
                                                Section
                                                    ? getStartTime(Section).time
                                                    : SectionStartTime).map((time) => { return <p className='bg-white cursor-pointer' key={time} onMouseDown={() => (setSectionEndTime(time))}>{time}</p> })
                                            : <p className='bg-white cursor-pointer text-center '>-No Start Time-</p>
                                    }
                                </div>
                            </div>

                            {/* Clear Button*/}
                            <div className="pl-2">
                                <FaEraser
                                    className="cursor-pointer text-lg hover:bg-gray-300 hover:rounded-lg"
                                    onMouseDown={() => {
                                        setSection("")
                                        setSectionDays([])
                                        setSectionStartTime("")
                                        setSectionEndTime("")
                                    }}
                                />
                            </div>

                        </div>

                        {/* WeekDays Buttons */}
                        <div className='flex flex-row w-full justify-start space-x-3'>

                            {/* Monday Button */}
                            <input className={`border-2 w-16 h-9 text-lg flex justify-center border-black px-1 rounded-lg text-center cursor-pointer hover:bg-placebo-turquoise ${weeklySchedule.day && weeklySchedule.day.includes("Monday") ? "bg-placebo-turquoise drop-shadow-md" : "opacity-30"}`}
                                onMouseDown={() => {
                                    setSectionDays(["Monday"]);
                                    SectionStartTime
                                        ? setSection(getMatchingSection({ time: SectionStartTime, day: ["Monday"] }))
                                        : setSection('');
                                }
                                }
                                type='button'
                                value="M"
                                readOnly
                            />

                            {/* Tuesday and Thursday Button */}
                            <input className={`border-2 w-16 h-9 text-lg flex justify-center border-black px-1 rounded-lg text-center cursor-pointer hover:bg-placebo-turquoise ${weeklySchedule.day && (weeklySchedule.day.includes("Tuesday") || weeklySchedule.day.includes("Thursday")) ? "bg-placebo-turquoise drop-shadow-md" : "opacity-30"}`}
                                onMouseDown={() => {
                                    setSectionDays(["Tuesday", "Thursday"]);
                                    SectionStartTime
                                        ? setSection(getMatchingSection({ time: SectionStartTime, day: ["Tuesday", "Thursday"] }))
                                        : setSection('');
                                }
                                }
                                type='button'
                                value="TTh"
                                readOnly
                            />

                            {/* Wednesday and Friday Button */}
                            <input className={`border-2 w-16 h-9 text-lg flex justify-center border-black px-1 rounded-lg text-center cursor-pointer hover:bg-placebo-turquoise ${weeklySchedule.day && (weeklySchedule.day.includes("Wednesday") || weeklySchedule.day.includes("Friday")) ? "bg-placebo-turquoise drop-shadow-md" : "opacity-30"}`}
                                onMouseDown={() => {
                                    setSectionDays(["Wednesday", "Friday"]);
                                    SectionStartTime
                                        ? setSection(getMatchingSection({ time: SectionStartTime, day: ["Wednesday", "Friday"] }))
                                        : setSection('');
                                }
                                }
                                type='button'
                                value="WF"
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ScheduleMaker;