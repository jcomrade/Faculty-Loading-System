import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
const SchedList = ({ editing, sched }) => {
    return (
        <table className="w-full border-separate border-spacing-0">
            <thead className="h-12">
                <tr>
                    <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel rounded-tl-2xl rounded-bl-2xl border-r-0">Course Code</th>
                    <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">Course Description</th>
                    <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">Class</th>
                    <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">Section</th>
                    <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">Time</th>
                    <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">Day</th>
                    <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">Room</th>
                    <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">Units</th>
                    <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">Students</th>
                    <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel border-x-0 ">FIC</th>
                    <th className={`bg-placebo-turquoise border border-collapse border-enamelled-jewel ${editing ? "border-x-0" : "rounded-tr-2xl rounded-br-2xl border-l-0"}`}>Remarks</th>
                    {editing && <th className="bg-placebo-turquoise border border-collapse border-enamelled-jewel rounded-tr-2xl rounded-br-2xl border-l-0">Delete</th>}
                </tr>
            </thead>
            <tbody>
                {sched && sched.map(({ course, faculty, room, schedule, section, remarks, students, _id }) => {
                    return (
                        <tr className="h-12 hover:bg-placebo-turquoise" key={_id}>
                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{course.code}</td>
                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{course.name}</td>
                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{course.type}</td>
                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{schedule.map(({section})=>{return section})}</td>
                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{schedule.map((time)=>{return Object.keys(time).length !== 0 && (<p>{time.startTime + " - " + time.endTime}</p>)})}</td>
                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{schedule.map((time, index)=>{return <p key={index}>{Object.keys(time).length !== 0 && (time.day.map((e)=>{return e}))}</p>})}</td>
                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{room.building + " " + room.name}</td>
                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{course.units}</td>
                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{students.map(({ name, bloc, yearLevel }, index) => { return (<p key={index} >{yearLevel + name + `${bloc ? (" - " + bloc) : ""}`}</p>) })}</td>
                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{faculty.lastName}</td>
                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{remarks}</td>
                            <td className="border border-collapse border-enamelled-jewel border-b-1 border-x-0 border-t-0">{editing && <IoTrashOutline />}</td>
                        </tr>
                    )
                })
                }
            </tbody>
        </table>
    )
}

export default SchedList;
