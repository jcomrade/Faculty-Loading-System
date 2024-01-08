import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
<<<<<<< HEAD:frontend/src/components/TimeTable.jsx
import { MdErrorOutline } from "react-icons/md";

=======
import { convertToFacultyTimeTableData } from "../../utils/convertDataforTImeTable";
import { useFacultyContext } from "../../hooks/useFacultyContext";
>>>>>>> 2fcc03713046f6ce830ebe28b6fcc8e66f294fe6:frontend/src/components/Tables/TimeTable.jsx
const TimeTable = () => {
  // const { facultySchedules,filteredFacultySchedules, dispatch } = useFacultyContext()
  const [semScheds, setSemScheds] = useState({});
  const params = useParams();
<<<<<<< HEAD:frontend/src/components/TimeTable.jsx
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  // Sample data for demonstration
  const sampleData = [
    { day: 'Monday', subject: "CMSC 178", section: "1-DL", start: "7:00", end: "8:30", subjectRendered: false, sectionRendered: false },
    { day: 'Tuesday', subject: "CMSC 195", section: "M", start: "7:00", end: "11:30", subjectRendered: false, sectionRendered: false },
    { day: 'Wednesday', subject: "MATH 10", section: "A", start: "12:00", end: "1:30", subjectRendered: false, sectionRendered: false },
    { day: 'Thursday', subject: "MATH 28", section: "A", start: "10:00", end: "11:30", subjectRendered: false, sectionRendered: false },
    { day: 'Friday', subject: "CMSC 185", section: "2-BL", start: "2:00", end: "3:30", subjectRendered: false, sectionRendered: false },
=======



  // Sample data for demonstration
  const sampleData = [
    { day: 'Monday', subject: "CMSC 178", section: "DL", start: "07:00", end: "09:30", subjectRendered: false, sectionRendered: false },
    { day: 'Tuesday', subject: "CMSC 115", section: "M", start: "09:00", end: "10:30", subjectRendered: false, sectionRendered: false },
    { day: 'Tuesday', subject: "CMSC 125", section: "M", start: "12:00", end: "01:30", subjectRendered: false, sectionRendered: false },
    { day: 'Tuesday', subject: "CMSC 195", section: "M", start: "12:00", end: "01:30", subjectRendered: false, sectionRendered: false },
    { day: 'Wednesday', subject: "MATH 10", section: "A", start: "12:00", end: "01:30", subjectRendered: false, sectionRendered: false },
    { day: 'Wednesday', subject: "SCI 10", section: "BL", start: "02:00", end: "03:30", subjectRendered: false, sectionRendered: false },
    { day: 'Thursday', subject: "MATH 28", section: "A", start: "10:00", end: "11:30", subjectRendered: false, sectionRendered: false },
    { day: 'Friday', subject: "CMSC 185", section: "BL", start: "02:00", end: "03:30", subjectRendered: false, sectionRendered: false },
    { day: 'Friday', subject: "CMSC 128", section: "A", start: "05:00", end: "06:30", subjectRendered: false, sectionRendered: false },
    { day: 'Friday', subject: "CMSC 199", section: "F", start: "02:30", end: "04:00", subjectRendered: false, sectionRendered: false }
>>>>>>> 2fcc03713046f6ce830ebe28b6fcc8e66f294fe6:frontend/src/components/Tables/TimeTable.jsx
  ];

  useEffect(() => {
    // Convert sample data to a dictionary format for easier manipulation
    console.log()
    console.log(sampleData)
    const formattedData = sampleData.reduce((acc, entry) => {
      const { day, ...rest } = entry;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(rest);
      return acc;
    }, {});

    setSemScheds(formattedData);
  }, [params.id]);

  // Function to generate schedule rows based on the data
  const generateScheduleRows = () => {
    const timeSlots = [
<<<<<<< HEAD:frontend/src/components/TimeTable.jsx
      "7:00 - 7:30 AM", "7:30 - 8:00 AM", "8:00 - 8:30 AM", "8:30 - 9:00 AM", "9:00 - 9:30 AM",
      "9:30 - 10:00 AM", "10:00 - 10:30 AM", "10:30 - 11:00 AM", "11:00 - 11:30 AM", "11:30 - 12:00 PM",
      "12:00 - 12:30 PM", "12:30 - 1:00 PM", "1:00 - 1:30 PM", "1:30 - 2:00 PM", "2:00 - 2:30 PM",
      "2:30 - 3:00 PM", "3:00 - 3:30 PM", "3:30 - 4:00 PM", "4:00 - 4:30 PM", "4:30 - 5:00 PM",
      "5:00 - 5:30 PM", "5:30 - 6:00 PM", "6:00 - 6:30 PM", "6:30 - 7:00 PM"
=======
      "07:00-07:30 AM", "07:30-08:00 AM", "08:00-08:30 AM", "08:30-09:00 AM", "09:00-09:30 AM",
      "09:30-10:00 AM", "10:00-10:30 AM", "10:30-11:00 AM", "11:00-11:30 AM", "11:30-12:00 PM",
      "12:00-12:30 PM", "12:30-01:00 PM", "01:00-01:30 PM", "01:30-02:00 PM", "02:00-02:30 PM",
      "02:30-03:00 PM", "03:00-03:30 PM", "03:30-04:00 PM", "04:00-04:30 PM", "04:30-05:00 PM",
      "05:00-05:30 PM", "05:30-06:00 PM", "06:00-06:30 PM", "06:30-07:00 PM"
>>>>>>> 2fcc03713046f6ce830ebe28b6fcc8e66f294fe6:frontend/src/components/Tables/TimeTable.jsx
    ];
    
    return timeSlots.map((timeSlot, index) => (
      <tr key={index}>
        <td className="border border-black w-1/8">{timeSlot}</td>
        {daysOfWeek.map((day, dayIndex) => (
          <td
            key={dayIndex}
            className={`w-7/8 ${semScheds[day] &&
              semScheds[day].some(schedule => {
                const startTime = schedule.start;
                const endTime = schedule.end;

                // Check if timeSlot falls within the range of start and end times
                return timeSlot >= startTime && timeSlot <= endTime;
              })
              ? '' // No border when cell is not empty
              : 'border border-black' // Apply border when cell is empty
              } ${getShadeClass(day, timeSlot, dayIndex)}`}
          >
            {semScheds[day] &&
              semScheds[day].some(schedule => {
                const startTime = schedule.start;
                const endTime = schedule.end;

                // Check if timeSlot falls within the range of start and end times
                return timeSlot >= startTime && timeSlot <= endTime;
              }) ? (
              semScheds[day]
                .filter(schedule => {
                  const startTime = schedule.start;
                  const endTime = schedule.end;

                  // Check if timeSlot falls within the range of start and end times
                  return timeSlot >= startTime && timeSlot <= endTime;
                })
                .map((schedule, index, self) => (
                  <div key={index}>
                    {(() => {
                      if(self.length > 1 && index == 0){
                        return <p className="flex flex-row items-center justify-center text-white text-center font-regular">CONFLICT <MdErrorOutline /></p>;
                      }else if (!schedule.subjectRendered && self.length == 1) {
                        schedule.subjectRendered = true;
                        return <p className="text-enamelled-jewel text-center font-extrabold">{schedule.subject}</p>;
                      } else if (!schedule.sectionRendered && self.length == 1) {
                        schedule.sectionRendered = true;
                        return <p className="text-enamelled-jewel text-center font-extrabold">{schedule.section}</p>;
                      }
                      return null;
                    })()}
                  </div>
                ))
            ) : ''}
          </td>
        ))}
      </tr>

    ));
  };

  // Function to determine the shading class based on the schedule
  // Function to determine the shading class based on the schedule
const getShadeClass = (day, timeSlot) => {
  const conflictingSchedules = semScheds[day] && semScheds[day].filter(schedule => {
    const startTime = schedule.start;
    const endTime = schedule.end;

    // Check if timeSlot falls within the range of start and end times
    return timeSlot >= startTime && timeSlot <= endTime;
  });

  // Check for conflicting schedules
  const hasConflicts = conflictingSchedules && conflictingSchedules.length > 1;

  // Return 'bg-white' for empty cells, pastel-red if there are conflicts, else alternate between 'veiling-waterfalls' and 'placebo-turquoise'
  return semScheds[day] && semScheds[day].some(schedule => {
    const startTime = schedule.start;
    const endTime = schedule.end;

    // Check if timeSlot falls within the range of start and end times
    return timeSlot >= startTime && timeSlot <= endTime;
  }) ? (hasConflicts ? 'bg-pastel-red border-r border-black' : (conflictingSchedules && conflictingSchedules.length % 2 === 0 ? 'bg-veiling-waterfalls border-r border-black' : 'bg-placebo-turquoise border-r border-black')) : 'bg-white';
};



  return (
    <>
      <table className="bg-white text-black w-818 h-729 table-fixed">
        <colgroup>
          <col className="w-1/8" />
          {daysOfWeek.map((day, index) => (
            <col key={index} className="w-7/8" />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th className="border-b-2 border-enamelled-jewel text-enamelled-jewel font-extrabold w-32">Time</th>
            {daysOfWeek.map((day, index) => (
              <th key={index} className="border-b-2 border-enamelled-jewel text-enamelled-jewel font-extrabold">{day}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {generateScheduleRows()}
        </tbody>
      </table>
    </>
  );
};

export default TimeTable;