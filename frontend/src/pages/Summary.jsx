import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";


//Assume that no "Create new" Button is clicked.. 
//Only use ID's for the value of variables  
const data = {
    "semester": "657ab2c74f17cfbe4a75e678",
    "course": "65802f20b60f36f063d1559e",
    "room": "65801e15b3c374f68e544ce5",
    "faculty": "65801e15b3c374f68e544ce3",
    "students": ["65801e15b3c374f68e544cde", "65802f20b60f36f063d155a0"]
}


//If a "Create new" Button is clicked for all fields..
const newData = {
    "semester": "657ab2c74f17cfbe4a75e678",
    "newRoom": {
        "name": "224",
        "building": "CSM"
    },
    "newBloc": {
        "name": "BSCS",
        "yearLevel": 1,
        "bloc": "1",
        "department": "CSM"
    },
    "newFaculty": {
        "firstName": "Juan",
        "lastName": "Cruz",
        "employeeId": "2021-06005"
    },
    "newCourse": {
        "name": "Intro to Statistics",
        "code": "AMAT 101",
        "type": "LEC",
        "units": 3
    }
}


const Summary = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [facultyList, setFacultyList] = useState([]);
    const [queries, setQueries] = useState([])
    const [checked, setChecked] = useState(false)
    const params = useParams()
    console.log(params.id)
    useEffect(() => {
        (async function () {
            const res = await fetch(`http://localhost:4000/api/summary/${params.id}`, {
                method: 'GET',
                credentials: 'include',
            })
            const data = await res.json()
            setFacultyList(data)
        }())
    }, [params.id])

    useEffect(() => {
        setSearchParams({ filter: queries })
    }, [queries])

    function handleCheck(event) {
        if (event.target.checked) {
            setQueries([event.target.value, ...queries])
        } else if (!event.target.checked) {
            const temp = queries
            const index = temp.indexOf(event.target.value);
            temp.splice(index, 1);
            setQueries([...temp])
        }
    }

    return (
        <div className="px-20 pt-10 text-center">
            <h1 className="text-enamelled-jewel-text">Summary of units per Faculty</h1>
            <div className="flex flex-row space-x-20 mt-7">
                {/* Filter Div */}
                <div className="flex flex-col w-48 border border-enamelled-jewel rounded-2xl">
                    <div className="flex items-center justify-center w-full h-20 bg-placebo-turquoise border border-b-enamelled-jewel rounded-t-2xl">
                        <p className="text-4xl text-enamelled-jewel underline font-bold">Filter:</p>
                    </div>
                    <div className="flex flex-col items-start pl-10 py-5 space-y-5">
                        <div className="flex flex-col items-start">
                            <p className="text-2xl text-enamelled-jewel-text font-bold">CSM</p>
                            <div className="text-enamelled-jewel-text font-bold"><input type="checkbox" onChange={(e) => { handleCheck(e) }} value="DMPCS" /> DMPCS </div>
                            <div className="text-enamelled-jewel-text font-bold"><input type="checkbox" onChange={(e) => { handleCheck(e) }} value="DFSC" /> DFSC  </div>
                            <div className="text-enamelled-jewel-text font-bold"><input type="checkbox" onChange={(e) => { handleCheck(e) }} value="DBSES" /> DBSES </div>
                        </div>
                        <div className="flex flex-col items-start">
                            <p className="text-2xl text-enamelled-jewel-text font-bold">CHSS</p>
                            <div className="text-enamelled-jewel-text font-bold"><input type="checkbox" onChange={(e) => { handleCheck(e) }} value="HSS" /> HSS </div>
                        </div>
                        <div className="flex flex-col items-start">
                            <p className="text-2xl text-enamelled-jewel-text font-bold">SOM</p>
                            <div className="text-enamelled-jewel-text font-bold"><input type="checkbox" onChange={(e) => { handleCheck(e) }} value="SOM" /> SOM </div>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <table className="w-full border-separate border-spacing-0">
                        <thead className="h-12">
                            <tr>
                                <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel rounded-tl-2xl rounded-bl-2xl border-r-0">Faculty</th>
                                <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">TLC</th>
                                <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">ALC</th>
                                <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">SLC</th>
                                <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">RLC</th>
                                <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel rounded-tr-2xl rounded-br-2xl border-l-0">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                facultyList.length > 0 && facultyList.map((faculty) => {
                                    return (
                                        <tr key={faculty._id} className="h-12 hover:bg-placebo-turquoise">
                                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{faculty.lastName}</td>
                                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{faculty.TLC}</td>
                                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{faculty.ALC}</td>
                                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{faculty.SLC}</td>
                                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{faculty.RLC}</td>
                                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{faculty.TLC + faculty.ALC + faculty.SLC + faculty.RLC}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className="w-full h-full flex items-center justify-center">
                        {
                            facultyList.length == 0 &&
                            <div>
                            <p className="text-8xl font-bold">Start adding the list</p>
                            <p className="text-3xl bold">or</p>
                            <button className="w-96 h-20 border border-enamelled-jewel hover:border-enamelled-jewel rounded-lg hover:bg-placebo-turquoise">Copy Alpha List</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Summary;