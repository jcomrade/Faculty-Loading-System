import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';

const Help = () => {
    return (
        <div className='flex flex-col h-screen w-screen'> 
            <NavBar />
            <div>
                <h1 className='text-enamelled-jewel'>Faculty Loading System</h1>
                <p className='text-enamelled-jewel'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Lorem ipsum dolor sit amet consectetur adipiscing. In metus vulputate eu scelerisque felis. Turpis massa sed elementum tempus 
                    egestas sed sed risus pretium. Turpis cursus in hac habitasse. Quam id leo in vitae. Etiam dignissim diam quis enim lobortis scelerisque. 
                    Non diam phasellus vestibulum lorem sed risus. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. 
                </p>
                <button className='flex items-center font-bold justify-center text-xl border-enamelled-jewel bg-placebo-turquoise text-enamelled-jewel w-40'>Home</button>
                <button className='flex items-center font-bold justify-center text-xl border-enamelled-jewel bg-placebo-turquoise text-enamelled-jewel w-40'>Export</button>
                <button className='flex items-center font-bold justify-center text-xl border-enamelled-jewel bg-placebo-turquoise text-enamelled-jewel w-40'>Summary</button>
                <button className='flex items-center font-bold justify-center text-xl border-enamelled-jewel bg-placebo-turquoise text-enamelled-jewel w-40'>Faculty</button>
                <button className='flex items-center font-bold justify-center text-xl border-enamelled-jewel bg-placebo-turquoise text-enamelled-jewel w-40'>Bloc</button>
                <button className='flex items-center font-bold justify-center text-xl border-enamelled-jewel bg-placebo-turquoise text-enamelled-jewel w-40'>Alpha List</button>
            </div>
        </div>
    )
}

export default Help;