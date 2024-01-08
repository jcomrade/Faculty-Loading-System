import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { useFacultyContext } from "../../hooks/useFacultyContext"
import { useSemesterContext } from "../../hooks/useSemesterContext"

const FacultySearch = () => {

    const [queryParameters] = useSearchParams()
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const {semesterFaculties, dispatch} = useSemesterContext()
    console.log(semesterFaculties, "yes")
    return (
        <div className="relative inline-block">
            <div className="">
                <input className="w-full text-2xl p-1 pl-3 border-2 border-black rounded-lg" onFocus={() => { setDropdownVisible(true) }} onBlur={() => { setDropdownVisible(false) }} placeholder="Faculty" />
            </div>
            <div className={`absolute w-full bg-white border-2 border-enamelled-jewel rounded-xl ${!dropdownVisible && "hidden"}`}>
                {
                    semesterFaculties && semesterFaculties.length > 0 
                        ? semesterFaculties.map((faculty)=>{
                            return <p 
                                key={faculty._id} 
                                className="text-2xl text-black h-8 hover:bg-placebo-turquoise cursor-pointer rounded-xl px-2"
                                onMouseDown={()=>{
                                    dispatch({type: 'SELECT_FACULTY', payload: faculty, query: queryParameters.getAll("filter")})
                                }}
                                >
                                {faculty.firstName} {faculty.lastName}</p>
                        })
                        : <p>No faculty</p>
                }
            </div>
        </div>
    )

}

export default FacultySearch