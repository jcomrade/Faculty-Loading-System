import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FacultyMaker = ({ semId, setMainFaculty, mainFaculty }) => {
    const [facultyList, setFacultyList] = useState([])
    const [facultyFilteredList, setFacultyFilteredList] = useState([])
    const [facultySearch, setFacultySearch] = useState('')
    const [facultyDisplay, setFacultyDisplay] = useState(mainFaculty)
    const [facultyDropdownVisible, setFacultyDropdownVisible] = useState(false)
    const params = useParams()
    useEffect(() => {
        (async function () {
            const res = await fetch(`http://localhost:4000/api/faculty/list/${params.id}`, {
                method: 'GET',
                credentials: "include"
            })
            const data = await res.json()
            setFacultyList(data)
            setFacultyFilteredList(data)
        }())
    }, [params.id])

    useEffect(() => {
        const facultyFilter = facultyList.filter((e) => {
            return (e.firstName && e.lastName && (e.firstName + " " + e.lastName).toLowerCase().includes(facultySearch.toLowerCase()))
        })
        setFacultyFilteredList(facultyFilter)
    }, [facultySearch])
    return (
        <div className='flex flex-col space-y-2' >
            <p className='text-3xl font-bold'>Faculty</p>
            <div className='relative inline-block'>
                <input
                    className='outline-none border-2 w-full h-9 text-lg rounded-md pl-2 border-black'
                    type="text"
                    placeholder="Faculty Name"
                    onFocus={(e) => { setFacultySearch(e.target.value);setFacultyDropdownVisible(true) }}
                    onBlur={() => { setFacultyDropdownVisible(false) }}
                    onChange={(e) => { setFacultySearch(e.target.value) }}
                    value={facultySearch}
                />
                <div className={`absolute w-full bg-white border-2 border-black rounded-md p-1 ${!facultyDropdownVisible && 'hidden'}`}>
                    {
                        facultyFilteredList.length > 0
                            ? facultyFilteredList.map((data) => {
                                return <p
                                    className="w-full max-w-full truncate text-lg hover:bg-placebo-turquoise cursor-pointer"
                                    key={data._id}
                                    onMouseDown={() => { setFacultyDisplay({firstName: data.firstName, lastName: data.lastName, employeeId: data.employeeId, department: data.department}); setMainFaculty(data) }}>
                                    {`(${data.employeeId}) | `}<strong>{data.firstName} {data.lastName}</strong>
                                </p>
                            })
                            : <p>None</p>
                    }
                </div>
            </div>
            {
                facultyDisplay && <>
                    <input className='outline-none border-2 h-9 text-lg pl-2 rounded-md bg-placebo-turquoise cursor-not-allowed border-black' value={facultyDisplay.firstName} readOnly />
                    <input className='outline-none border-2 h-9 text-lg pl-2 rounded-md bg-placebo-turquoise cursor-not-allowed border-black' value={facultyDisplay.lastName} readOnly />
                    <input className='outline-none border-2 h-9 text-lg pl-2 rounded-md bg-placebo-turquoise cursor-not-allowed border-black' value={facultyDisplay.employeeId} readOnly />
                    <input className='outline-none border-2 h-9 text-lg pl-2 rounded-md bg-placebo-turquoise cursor-not-allowed border-black' value={facultyDisplay.department} readOnly />
                </>
            }
        </div>
    )
}

export default FacultyMaker;