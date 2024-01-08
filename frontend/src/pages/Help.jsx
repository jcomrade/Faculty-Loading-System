import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import { AiFillHome } from "react-icons/ai";
import { TiExport } from "react-icons/ti";
import { LuClipboardList } from "react-icons/lu";
import { MdPerson2 } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaListUl } from "react-icons/fa";

const Help = () => {
    return (
        <div className='flex flex-col h-screen w-screen'> 
            <NavBar />
            <div className='p-5'>
                <div className='border-b-4 border-enamelled-jewel'>
                <h1 className='font-family:Sora font-extrabold text-enamelled-jewel'>Faculty Loading System</h1>
                <p className='py-3 font-regular text-justify text-xl text-black'>
                Welcome to the Faculty Loading System, your efficient solution for seamlessly managing subject schedules and teacher workloads.  
                This guide is your key to comprehending and optimizing the functionalities offered by this application.
                The Faculty Loading System is designed with the tools needed to efficiently create, modify, and organize subject schedules. 
                With an intuitive interface and powerful features, this app simplifies the process of handling faculty loads, schedules, and exportation of data.
                </p>
                <p className='font-bold text-justify text-xl text-black'>Key Features Overview:</p>
                <p className='py-3 font-regular text-justify text-xl text-black'>
                Subject Scheduling: The app allows users to create comprehensive schedules for their subjects. Easily input class timings, lecture slots, and seminar periods with a user-friendly interface. <br/>
                Load Management: Department heads can easily modify the workload assigned to faculty members, facilitating simple adjustments to different loads within their responsibilities.<br/>
                Export to Excel: Seamlessly export schedules and unit details to an Excel spreadsheet for further analysis, sharing, or printing. This export function ensures easy integration with other tools and provides a convenient way to work with the data. <br/>
                </p>
                </div>
                <div className='grid grid-cols-3 grid-row-2 justify-items-center p-10 px- gap-y-8'>
                    <button className='flex flex-col items-center justify-center py-5 font-family:Sora font-extrabold text-3xl border-enamelled-jewel rounded-lg bg-placebo-turquoise text-enamelled-jewel w-48'>
                        <AiFillHome size={80}/>
                        Home
                    </button>
                    <button className='flex flex-col items-center justify-center py-5 font-family:Sora font-extrabold text-3xl border-enamelled-jewel rounded-lg bg-placebo-turquoise text-enamelled-jewel w-48'>
                        <TiExport size={80}/>
                        Export
                    </button>
                    <button className='flex flex-col items-center justify-center py-5 font-family:Sora font-extrabold text-3xl border-enamelled-jewel rounded-lg bg-placebo-turquoise text-enamelled-jewel w-48'>
                        <LuClipboardList size={80} />
                        Summary
                    </button>
                    <button className='flex flex-col items-center justify-center py-5 font-family:Sora font-extrabold text-3xl border-enamelled-jewel rounded-lg bg-placebo-turquoise text-enamelled-jewel w-48'>
                        <MdPerson2 size={80}/>
                        Faculty
                    </button>
                    <button className='flex flex-col items-center justify-center py-5 font-family:Sora font-extrabold text-3xl border-enamelled-jewel rounded-lg bg-placebo-turquoise text-enamelled-jewel w-48'>
                        <FaPeopleGroup size={80} />
                        Bloc
                    </button>
                    <button className='flex flex-col items-center justify-center py-5 font-family:Sora font-extrabold text-3xl border-enamelled-jewel rounded-lg bg-placebo-turquoise text-enamelled-jewel w-48'>
                        <FaListUl size={80} />
                        Alpha List
                    </button> 
                </div>

            </div>
        </div>
    )
}

export default Help;