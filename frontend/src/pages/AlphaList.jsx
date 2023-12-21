import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import SearchBar from "../components/SearchBar";
import { HiPlus } from "react-icons/hi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import SchedList from "../components/SchedList";
const AlphaList = () => {
    const [semScheds, setSemScheds] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [editing, setEditing] = useState(false)
    const params = useParams()
    useEffect(() => {
        (async function () {
            setIsLoading(true)
            const res = await fetch(`http://localhost:4000/api/semester/${params.id}/`, {
                method: 'GET',
                credentials: 'include',
            })
            const data = await res.json()
            console.log(data)
            setSemScheds(data)
            setIsLoading(false)
        }())
    }, [params.id])

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
                    <SchedList editing={editing} sched={semScheds} />
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
                </div>
            </div>
        </div>
    )
}

export default AlphaList;