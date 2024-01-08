import React from 'react';
import TimeTable from '../components/Tables/TimeTable';
import HorizontalFilterBar from '../components/Filters/HorizontalFilterBar';
import FacultySearch from '../components/Filters/FacultySearch';
import FacultyDetails from '../components/Tables/FacultyDetails';
import FacultySchedList from '../components/Tables/FacultySchedList';

function Faculty() {
  return (
      <div className='flex flex-col w-full px-48 space-y-10 justify-center items-center mt-10'>
        <div className='flex flex-row w-full justify-evenly'>
          <TimeTable/>
          <div className='flex flex-col space-y-5'>
            <HorizontalFilterBar />
            <FacultySearch />
            <FacultyDetails />
          </div>
        </div>
        <FacultySchedList />
      </div>
  );
}

export default Faculty;