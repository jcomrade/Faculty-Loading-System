import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav>
            <div className='flex'>
                <button className="bg-white text-enamelled-jewel" onClick={()=>navigate('/home')}>Home</button>
                <button className="bg-white text-enamelled-jewel" onClick={()=>navigate('/export')}>Export</button>
                <button className="bg-white text-enamelled-jewel" onClick={()=>navigate('/help')}>Help</button>
                <button className="bg-white text-enamelled-jewel" onClick={()=>navigate('/')}>Sign Out</button>
            </div>
        </nav>
    );
};

export default NavBar;
