import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useParams } from "react-router-dom";

const StudentMaker = ({ courseType, setStudents, students }) => {
    const [chosenStudents, setChosenStudents] = useState([])

    const [semBlocs, setSemBlocs] = useState([])
    const [semFilteredBlocs, setSemFilteredBlocs] = useState([])

    const [semDegreePrograms, setSemDegreePrograms] = useState([])
    const [semFilteredDegreePrograms, setSemFilteredDegreePrograms] = useState([])

    const [dropdown, setDropdown] = useState([])
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [studentSearch, setStudentSearch] = useState([])
    const params = useParams()

    useEffect(() => {
        (async function () {
            const res = await fetch(`http://localhost:4000/api/degreeprogram/${params.id}`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await res.json()
            setSemDegreePrograms(data)
            setSemFilteredDegreePrograms(data)
        }())
    }, [params.id])

    useEffect(() => {
        (async function () {
            const res = await fetch(`http://localhost:4000/api/bloc/${params.id}`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await res.json()
            setSemBlocs(data)
            setSemFilteredBlocs(data)
        }())
    }, [params.id])

    useEffect(() => {
        if (courseType.type == "LEC") {
            setDropdown(semFilteredDegreePrograms)
        }
        else if (courseType.type == "LAB") {
            setDropdown(semFilteredBlocs)
        } else {
            setDropdown([])
        }

    }, [courseType])

    useEffect(() => {
        const studentFilter = (
            courseType.type == "LEC"
                ? semDegreePrograms
                : courseType.type == "LAB"
                    ? semBlocs
                    : [])
            .filter((data) => {
                return (
                    data.name &&
                    ((data.yearLevel + data.name + `${data.bloc && "Bloc " + data.bloc}`)
                        .toLowerCase()
                        .includes(studentSearch.toLowerCase()))
                )
            })
        setDropdown(studentFilter)
    }, [studentSearch])

    return (
        <div className='flex flex-col space-y-2 relative'>
            <p className='text-3xl font-bold'>Students</p>
            <div className="relative inline-block">
                <input
                    className='outline-none border-2 h-9 text-lg pl-2 border-black rounded-md'
                    placeholder={courseType ? courseType.type == "LEC" ? "Degree Program" : "Bloc" : "Choose a Course First"}
                    onFocus={(e) => { setDropdownVisible(true); setStudentSearch(e.target.value)}}
                    onBlur={() => { setDropdownVisible(false) }}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    value={studentSearch}
                />
                <div className={`absolute w-full bg-white border-2 border-black ${!dropdownVisible && 'hidden'}`}>
                    {
                        dropdown.length > 0
                            ? dropdown.map((course, index, self) => {
                                return (
                                    <p
                                        key={course._id}
                                        className="h-9 text-lg pl-2 pt-1 hover:bg-placebo-turquoise cursor-pointer"
                                        onMouseDown={() => {
                                            setChosenStudents([...chosenStudents, course]);
                                            setStudents([...students, course])
                                            self.splice(index, 1)
                                            setDropdown(self)
                                        }
                                        }
                                    >
                                        {course.yearLevel}{course.name}{course.bloc && ` Bloc ${course.bloc}`}
                                    </p>
                                )
                            })
                            : <p className="h-9 text-lg pl-2 pt-1 cursor-pointer">None</p>
                    }
                </div>
            </div>
            <div className="flex flex-wrap flex-col space-y-2">
                {
                    students.length > 0 &&
                    students.map((student, index, self) => {
                        return (
                            <div key={student._id} className="w-full border-2 border-black bg-placebo-turquoise h-9 rounded-md flex flex-row justify-between items-center">
                                <div
                                    className="text-center text-lg pl-3 pt-1">
                                    {student.yearLevel + student.name + `${student.bloc ? " Bloc " + student.bloc : ""}`}
                                </div>
                                <FaXmark 
                                    onMouseDown={()=>{
                                        setDropdown([...dropdown, student])
                                        self.splice(index,1)
                                        setStudents(self)
                                    }}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default StudentMaker;