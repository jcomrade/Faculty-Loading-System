import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdError } from "react-icons/md";
import { MdOutlineErrorOutline } from "react-icons/md";


const TimeTable = () => {
  const [semScheds, setSemScheds] = useState({});
  const params = useParams();

  // Sample data for demonstration
  const sampleData = [
    { day: 'Monday', subject: "CMSC 178", section: "1-DL", start: "7:00", end: "8:30", subjectRendered: false, sectionRendered: false },
    { day: 'Tuesday', subject: "CMSC 195", section: "M", start: "9:00", end: "11:00", subjectRendered: false, sectionRendered: false },
    { day: 'Wednesday', subject: "MATH 10", section: "A", start: "12:00", end: "1:30", subjectRendered: false, sectionRendered: false },
    { day: 'Wednesday', subject: "SCI 10", section: "1-BL", start: "2:00", end: "3:30", subjectRendered: false, sectionRendered: false },
    { day: 'Thursday', subject: "MATH 28", section: "A", start: "10:00", end: "11:30", subjectRendered: false, sectionRendered: false },
    { day: 'Friday', subject: "CMSC 185", section: "2-BL", start: "2:00", end: "3:30", subjectRendered: false, sectionRendered: false },
    { day: 'Friday', subject: "CMSC 199", section: "2-1F", start: "2:30", end: "4:00", subjectRendered: false, sectionRendered: false },
    { day: 'Friday', subject: "CMSC 128", section: "A", start: "5:00", end: "6:30", subjectRendered: false, sectionRendered: false }
  ];


  useEffect(() => {
    // Convert sample data to a dictionary format for easier manipulation
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
      "7:00 - 7:30 AM", "7:30 - 8:00 AM", "8:00 - 8:30 AM", "8:30 - 9:00 AM", "9:00 - 9:30 AM",
      "9:30 - 10:00 AM", "10:00 - 10:30 AM", "10:30 - 11:00 AM", "11:00 - 11:30 AM", "11:30 - 12:00 PM",
      "12:00 - 12:30 PM", "12:30 - 1:00 PM", "1:00 - 1:30 PM", "1:30 - 2:00 PM", "2:00 - 2:30 PM",
      "2:30 - 3:00 PM", "3:00 - 3:30 PM", "3:30 - 4:00 PM", "4:00 - 4:30 PM", "4:30 - 5:00 PM",
      "5:00 - 5:30 PM", "5:30 - 6:00 PM", "6:00 - 6:30 PM", "6:30 - 7:00 PM"
    ];

    return timeSlots.map((timeSlot, index) => (
      // Create a table row for each time slot
      <tr key={index}>
        {/* Display the time slot in the first column */}
        <td className="border border-black w-1/8">{timeSlot}</td>

        {/* Iterate over days of the week to create columns */}
        {daysOfWeek.map((day, dayIndex) => (
          <td
            key={dayIndex}
            // Apply dynamic styling based on schedule data and time slot
            className={`w-7/8 ${semScheds[day] &&
              semScheds[day].some(schedule => {
                const startTime = schedule.start;
                const endTime = schedule.end;

                // Check if the time slot falls within the range of start and end times
                return timeSlot >= startTime && timeSlot <= endTime;
              })
              ? 'border-r border-black'
              : 'border border-black' // Apply border when cell is empty
              } ${getShadeClass(day, timeSlot, dayIndex)}`}
          >
            {/* Display schedule information for the current day and time slot */}
            {semScheds[day] &&
              semScheds[day].some(schedule => {
                const startTime = schedule.start;
                const endTime = schedule.end;
                // Check if the time slot falls within the range of start and end times
                return timeSlot >= startTime && timeSlot <= endTime;
              }) ? (
              semScheds[day]
                .filter(schedule => {
                  const startTime = schedule.start;
                  const endTime = schedule.end;

                  // Check if the time slot falls within the range of start and end times
                  return timeSlot >= startTime && timeSlot <= endTime;
                })
                .map((schedule, index, self) => (
                  // Render schedule information within a div
                  <div key={index}>
                    {(() => {
                      // Check for time conflicts and render appropriate message
                      if (self.length > 1 && index === 0) {
                        return <p className="flex items-center justify-center text-blizzard font-normal">Time Conflict<MdOutlineErrorOutline /></p>;
                      } else if (!schedule.subjectRendered && self.length === 1) {
                        // Render subject information if not already rendered
                        schedule.subjectRendered = true;
                        return <p className="text-enamelled-jewel text-center font-extrabold">{schedule.subject}</p>;
                      } else if (!schedule.sectionRendered && self.length === 1) {
                        // Render section information if not already rendered
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
            <th className="border-b-2 border-enamelled-jewel text -enamelled-jewel font-extrabold font-sora w-32">Time</th>
            {daysOfWeek.map((day, index) => (
              <th key={index} className="border-b-2 border-enamelled-jewel text-enamelled-jewel font-sora font-extrabold">{day}</th>
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