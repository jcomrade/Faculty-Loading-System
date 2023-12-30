import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import SearchBar from "../components/SearchBar";
import { HiPlus } from "react-icons/hi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import SchedList from "../components/SchedList";
const AlphaList = () => {
    const [semScheds, setSemScheds] = useState([])
    const [filteredScheds, setFilteredScheds] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [editing, setEditing] = useState(false)
    const [queryParameters] = useSearchParams()

    const params = useParams()
    useMemo(() => {
        (async function () {
            setIsLoading(true)
            const res = await fetch(`http://localhost:4000/api/semester/${params.id}/`, {
                method: 'GET',
                credentials: 'include',
            })
            const data = await res.json()
            setSemScheds(data)
            setFilteredScheds(data)
            setIsLoading(false)
        }())
    }, [params.id])

    useEffect(()=>{
        (function (){
            setIsLoading(true)
            queryParameters.getAll("filter").length > 0 
                ? setFilteredScheds(semScheds.filter((sched)=>queryParameters.getAll("filter").includes(sched.course.department)))
                : setFilteredScheds(semScheds)
            setIsLoading(false)
        }())
    },[queryParameters])

    return (
        <div className="px-20 pt-10 text-center">
            <div className="flex flex-row space-x-20 mt-7">
                <div className="flex flex-col space-y-6">
                    <SearchBar placeholder={"Course ID"} />
                    <button className='flex items-center font-bold justify-center text-xl border-2 border-enamelled-jewel bg-placebo-turquoise text-enamelled-jewel w-48 h-11'>
                        <HiPlus />Add
                    </button>
                    <button className='flex items-center font-bold justify-center text-xl border-2 border-enamelled-jewel bg-placebo-turquoise text-enamelled-jewel w-48 h-11' onClick={() => setEditing(!editing)}>
                        <HiOutlinePencilSquare />Edit
                    </button>
                    <FilterBar />
                </div>
                <div className="w-full">
                    <SchedList editing={editing} sched={filteredScheds} />
                    {
                        isLoading &&
                        <div className="mt-24">
                            <p className="text-8xl font-bold">Loading ...</p>
                        </div>
                    }
                    {
                        !semScheds.length > 0 && !isLoading &&
                        <div className="mt-24">
                            <p className="text-8xl font-bold">Start adding the list</p>
                            <p className="text-3xl bold">or</p>
                            <button className="w-96 h-20 border border-enamelled-jewel hover:border-enamelled-jewel rounded-lg hover:bg-placebo-turquoise">Copy Alpha List</button>
                        </div>
                    }
                    {
                        filteredScheds.length == 0 && !isLoading &&
                        <div className="mt-24 flex-col space-y-10">
                            <p className="text-8xl font-bold">No Schedule Found</p>
                            <p className="text-4xl font-bold">Start adding the list</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default AlphaList;