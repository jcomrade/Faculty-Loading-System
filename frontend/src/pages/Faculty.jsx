import React from 'react';
<<<<<<< HEAD
import TimeTableTest from '../components/TimeTable_test';
import TimeTable from '../components/TimeTable';
import SemNavbar from '../components/SemNavBar';

function Faculty() {
  return (
    <div className='w-screen'>
      <TimeTableTest />
      {/* <TimeTable /> */}
    </div>
=======
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
>>>>>>> 2fcc03713046f6ce830ebe28b6fcc8e66f294fe6
  );
}

export default Faculty;