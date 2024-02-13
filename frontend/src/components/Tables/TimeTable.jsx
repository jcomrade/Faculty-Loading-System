import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import { useSemesterContext } from "../../hooks/useSemesterContext";
import { convertToFacultyTimeTableData } from "../../utils/convertDataforTImeTable";

const TimeTable = () => {
  const {selectedFaculty, selectedFacultySchedules} = useSemesterContext()
  const [semScheds, setSemScheds] = useState({});
  const params = useParams();
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  // Sample data for demonstration
  const sampleData = [
    { day: 'Monday', subject: "CMSC 178", section: "1-DL", start: "7:00 AM", end: "8:30 AM", subjectRendered: false, sectionRendered: false },
    { day: 'Tuesday', subject: "CMSC 195", section: "M", start: "5:30 PM", end: "7:00 PM", subjectRendered: false, sectionRendered: false },
    { day: 'Tuesday', subject: "CMSC 195", section: "M", start: "10:00 AM", end: "1:00 PM", subjectRendered: false, sectionRendered: false },
    { day: 'Tuesday', subject: "CMSC 195", section: "M", start: "11:30 AM", end: "1:00 PM", subjectRendered: false, sectionRendered: false },
    { day: 'Wednesday', subject: "MATH 10", section: "A", start: "12:00 PM", end: "1:30 PM", subjectRendered: false, sectionRendered: false },
    { day: 'Thursday', subject: "MATH 28", section: "A", start: "10:00 AM", end: "11:30 AM", subjectRendered: false, sectionRendered: false },
    { day: 'Friday', subject: "CMSC 185", section: "2-BL", start: "2:00 PM", end: "3:30 PM", subjectRendered: false, sectionRendered: false },
  ];

  useEffect(() => {
    // Convert sample data to a dictionary format for easier manipulation
    const formattedData = convertToFacultyTimeTableData(selectedFacultySchedules, selectedFaculty?._id).reduce((acc, entry) => {
      const { day, ...rest } = entry;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(rest);
      return acc;
    }, {});
    console.log("formatted data", formattedData)
    setSemScheds(formattedData);
  }, [params.id, selectedFaculty]);

  // Function to generate schedule rows based on the data
  const generateScheduleRows = () => {
    const timeSlots = [
      "7:00 AM - 7:30 AM", "7:30 AM - 8:00 AM", "8:00 AM - 8:30 AM", "8:30 AM - 9:00 AM", "9:00 AM - 9:30 AM",
      "9:30 AM - 10:00 AM", "10:00 AM - 10:30 AM", "10:30 AM - 11:00 AM", "11:00 AM - 11:30 AM", "11:30 AM - 12:00 PM",
      "12:00 PM - 12:30 PM", "12:30 PM - 1:00 PM", "1:00 PM - 1:30 PM", "1:30 PM - 2:00 PM", "2:00 PM - 2:30 PM",
      "2:30 PM - 3:00 PM", "3:00 PM - 3:30 PM", "3:30 PM - 4:00 PM", "4:00 PM - 4:30 PM", "4:30 PM - 5:00 PM",
      "5:00 PM - 5:30 PM", "5:30 PM - 6:00 PM", "6:00 PM - 6:30 PM", "6:30 PM - 7:00 PM"
    ];

    return timeSlots.map((timeSlot, index) => (
      <tr key={index}>
        <td className="border border-black w-1/2">{timeSlot.replace(" AM", "").replace(" PM", "")}</td>
        {daysOfWeek.map((day, dayIndex) => (
          <td
            key={dayIndex}
            className={`w-7/8 ${semScheds[day] &&
              semScheds[day].some(schedule => {
                const startTime = schedule.start;
                const endTime = schedule.end;
                const timeString = timeSlot;
                const timeArray = timeString.split(" - ");

                const timeSlotStart = new Date(`January 1, 2000 ${timeArray[0]}`);
                const timeSlotEnd = new Date(`January 1, 2000 ${timeArray[1]}`);
                const start = new Date(`January 1, 2000 ${startTime}`);
                const end = new Date(`January 1, 2000 ${endTime}`);
                // Check if timeSlot falls within the range of start and end times
                return timeSlotStart >= start && timeSlotEnd <= end;
              })
              ? '' // No border when cell is not empty
              : 'border border-black' // Apply border when cell is empty
              } ${getShadeClass(day, timeSlot, dayIndex)}`}
          >
            {semScheds[day] &&
              (function () {
                const matchingSchedules = semScheds[day].filter(schedule => {
                  const startTime = schedule.start;
                  const endTime = schedule.end;
                  const timeString = timeSlot;
                  const timeArray = timeString.split(" - ");

                  const timeSlotStart = new Date(`January 1, 2000 ${timeArray[0]}`);
                  const timeSlotEnd = new Date(`January 1, 2000 ${timeArray[1]}`);
                  const start = new Date(`January 1, 2000 ${startTime}`);
                  const end = new Date(`January 1, 2000 ${endTime}`);
                  // Check if timeSlot falls within the range of start and end times
                  return timeSlotStart >= start && timeSlotEnd <= end;
                });

                return matchingSchedules.map((schedule, index, self) => (
                  <div key={index}>
                    {(() => {
                      if (self.length > 1 && index === 0) {
                        return <p className="flex flex-row items-center justify-center text-white text-center font-regular">CONFLICT <MdErrorOutline /></p>;
                      } else if (!schedule.subjectRendered && self.length === 1) {
                        schedule.subjectRendered = true;
                        return <p className="text-enamelled-jewel text-center font-extrabold">{schedule.subject}</p>;
                      } else if (!schedule.sectionRendered && self.length === 1) {
                        schedule.sectionRendered = true;
                        return <p className="text-enamelled-jewel text-center font-extrabold">{schedule.section}</p>;
                      }
                      return null;
                    })()}
                  </div>
                ));
              })()
            }

          </td>
        ))}
      </tr>

    ));
  };

  // Function to determine the shading class based on the schedule
  const getShadeClass = (day, timeSlot) => {
    const conflictingSchedules = semScheds[day] && semScheds[day].filter(schedule => {
      const startTime = schedule.start;
      const endTime = schedule.end;
      const timeString = timeSlot;
      const timeArray = timeString.split(" - ");

      const timeSlotStart = new Date(`January 1, 2000 ${timeArray[0]}`);
      const timeSlotEnd = new Date(`January 1, 2000 ${timeArray[1]}`);
      const start = new Date(`January 1, 2000 ${startTime}`);
      const end = new Date(`January 1, 2000 ${endTime}`);
      // Check if timeSlot falls within the range of start and end times
      return timeSlotStart >= start && timeSlotEnd <= end;
    });

    // Check for conflicting schedules
    const hasConflicts = conflictingSchedules && conflictingSchedules.length > 1;

    // Return 'bg-white' for empty cells, pastel-red if there are conflicts, else alternate between 'veiling-waterfalls' and 'placebo-turquoise'
    return semScheds[day] && semScheds[day].some(schedule => {
      const startTime = schedule.start;
      const endTime = schedule.end;
      const timeString = timeSlot;
      const timeArray = timeString.split(" - ");

      const timeSlotStart = new Date(`January 1, 2000 ${timeArray[0]}`);
      const timeSlotEnd = new Date(`January 1, 2000 ${timeArray[1]}`);
      const start = new Date(`January 1, 2000 ${startTime}`);
      const end = new Date(`January 1, 2000 ${endTime}`);
      // Check if timeSlot falls within the range of start and end times
      return timeSlotStart >= start && timeSlotEnd <= end;
    }) ? (hasConflicts ? 'bg-pastel-red border-r border-black' : (conflictingSchedules && conflictingSchedules.length % 2 === 0 ? 'bg-veiling-waterfalls' : 'bg-placebo-turquoise')) : 'bg-white';
  };



  return (
    <>
      <table className="bg-white text-black w-818 h-729 table-fixed border-b border-r border-black">
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