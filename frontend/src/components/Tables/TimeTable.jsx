import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { convertToFacultyTimeTableData } from "../../utils/convertDataforTImeTable";
import { useFacultyContext } from "../../hooks/useFacultyContext";
const TimeTable = () => {
  // const { facultySchedules,filteredFacultySchedules, dispatch } = useFacultyContext()
  const [semScheds, setSemScheds] = useState({});
  const params = useParams();



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
      "07:00-07:30 AM", "07:30-08:00 AM", "08:00-08:30 AM", "08:30-09:00 AM", "09:00-09:30 AM",
      "09:30-10:00 AM", "10:00-10:30 AM", "10:30-11:00 AM", "11:00-11:30 AM", "11:30-12:00 PM",
      "12:00-12:30 PM", "12:30-01:00 PM", "01:00-01:30 PM", "01:30-02:00 PM", "02:00-02:30 PM",
      "02:30-03:00 PM", "03:00-03:30 PM", "03:30-04:00 PM", "04:00-04:30 PM", "04:30-05:00 PM",
      "05:00-05:30 PM", "05:30-06:00 PM", "06:00-06:30 PM", "06:30-07:00 PM"
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
                        return <p className="text-enamelled-jewel text-center font-extrabold">CONFLICT!</p>;
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
  }) ? (hasConflicts ? 'bg-pastel-red' : (conflictingSchedules && conflictingSchedules.length % 2 === 0 ? 'bg-veiling-waterfalls' : 'bg-placebo-turquoise')) : 'bg-white';
};

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

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