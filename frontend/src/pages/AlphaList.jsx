import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import SearchBar from "../components/SearchBar";
import { HiPlus } from "react-icons/hi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useDisclosure } from '@chakra-ui/react';
import SchedList from "../components/SchedList";
import AddScheduleModal from "../modals/AddScheduleModal";
import { ScheduleContextProvider } from "../context/scheduleContext";
const AlphaList = () => {
    // const [semScheds, setSemScheds] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [editing, setEditing] = useState(false)


    return (
        <ScheduleContextProvider>
            <div className="px-20 pt-10 text-center">
                <div className="flex flex-row space-x-20 mt-7">
                    <div className="flex flex-col space-y-6">
                        <SearchBar placeholder={"Course ID"} />
                        <button className='flex items-center font-bold justify-center text-xl border-2 border-enamelled-jewel bg-placebo-turquoise text-enamelled-jewel w-48 h-11' onClick={onOpen}>
                            <HiPlus />Add
                        </button>
                        <button className='flex items-center font-bold justify-center text-xl border-2 border-enamelled-jewel bg-placebo-turquoise text-enamelled-jewel w-48 h-11' onClick={() => setEditing(!editing)}>
                            <HiOutlinePencilSquare />Edit
                        </button>
                        <FilterBar />
                    </div>
                    <div className="w-full">
                        <SchedList editing={editing} />
                    </div>
                </div>
                <AddScheduleModal onClose={onClose} isOpen={isOpen} />
            </div>
        </ScheduleContextProvider>
    )
}

export default AlphaList;