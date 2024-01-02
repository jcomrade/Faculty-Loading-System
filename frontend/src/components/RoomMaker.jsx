import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";



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


const RoomMaker = ({semId, setMainRoom, mainRoom}) => {
    const [roomDisplay, setRoomDisplay] = useState(mainRoom)
    const [roomDropdownVisible, setRoomDropdownVisible] = useState(false)
    const [roomSearch, setRoomSearch] = useState("")
    const [filteredRoom, setFilteredRoom] = useState([])
    const params = useParams()

    useEffect(() => {
        (async function () {
            const res = await fetch(`http://localhost:4000/api/room/${params.id}`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await res.json()
            setFilteredRoom(data)
        }())
    }, [params.id])

    useEffect(() => {
        const roomFilter = filteredRoom.filter((room) => {
            return room.name && room.name.toLowerCase().includes(roomSearch.toLowerCase())
        })
        setFilteredRoom(roomFilter)
    }, [roomSearch])
    
    return (
        <div>
            <p className='text-3xl font-bold'>Room</p>
            <div className='flex flex-row space-x-2'>
                <div className='relative inline-block'>

                    {/* Room Search Box */}
                    <input className='outline-none border-2 border-black rounded-md w-24 h-9 text-lg text-center' placeholder={"Room No."}onFocus={() => setRoomDropdownVisible(true)} onBlur={() => setRoomDropdownVisible(false)} onChange={(e) => { setRoomSearch(e.target.value); setRoomDisplay(null) }} value={roomSearch} />
                    
                    {/* Room Dropdown contents */}
                    <div className={`absolute flex flex-col w-24 bg-white border-2 border-black z-10 ${!roomDropdownVisible && 'hidden'}`}>
                        {
                            filteredRoom.length > 0
                                ? filteredRoom.map((room, index) => {
                                    return <p className="w-full text-center hover:bg-placebo-turquoise cursor-pointer" onMouseDown={() => { setRoomSearch(room.name); setRoomDisplay(room); setMainRoom(room) }} key={index}>{room.building} | {room.name}</p>

                                })
                                : <p>Loading ...</p>
                        }
                    </div>
                </div>
                
                {/* Room Location */}
                {
                    roomDisplay
                        ? (
                            <div className="flex flex-row items-center space-x-2">
                                <p className="text-lg">Building:</p>
                                <div className='flex items-center border-2 text-lg border-enamelled-jewel bg-placebo-turquoise px-2 rounded-md'>{roomDisplay.building}</div>
                            </div>
                        )
                        : <></>
                }
            </div>
            <p className='underline opacity-30'>create new room</p>
        </div>
    )
}

export default RoomMaker;