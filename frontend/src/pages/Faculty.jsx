import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Faculty = () => {
  const [semScheds, setSemScheds] = useState({});
  const params = useParams();

  // Sample data for demonstration
  const sampleData = [
    { day: 'Monday', subject: "Math", section: "A", start: "7:00", end: "8:30" },
    { day: 'Tuesday', subject: "Chemistry", section: "B", start: "9:00", end: "10:30" },
    { day: 'Wednesday', subject: "Biology", section: "A", start: "12:00", end: "1:30" },
    { day: 'Wednesday', subject: "History", section: "B", start: "2:00", end: "3:30" },
    { day: 'Thursday', subject: "English", section: "A", start: "10:00", end: "11:30" },
    { day: 'Friday', subject: "Computer Science", section: "B", start: "2:00", end: "3:30" },
    { day: 'Friday', subject: "Physical Education", section: "A", start: "5:00", end: "6:30" }
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
      "7:00 - 7:30", "7:30 - 8:00", "8:00 - 8:30", "8:30 - 9:00", "9:00 - 9:30",
      "9:30 - 10:00", "10:00 - 10:30", "10:30 - 11:00", "11:00 - 11:30", "11:30 - 12:00",
      "12:00 - 12:30", "12:30 - 1:00", "1:00 - 1:30", "1:30 - 2:00", "2:00 - 2:30",
      "2:30 - 3:00", "3:00 - 3:30", "3:30 - 4:00", "4:00 - 4:30", "4:30 - 5:00",
      "5:00 - 5:30", "5:30 - 6:00", "6:00 - 6:30", "6:30 - 7:00"
    ];

    return timeSlots.map((timeSlot, index) => (
      <tr key={index} className="border border-enamelled-jewel">
        <td className="border border-enamelled-jewel">{timeSlot}</td>
        {daysOfWeek.map((day, dayIndex) => (
          <td
            key={dayIndex}
            className={`border border-enamelled-jewel ${getShadeClass(day, timeSlot)}`}
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
                  .map((schedule, index) => (
                    <div key={index}>
                      <strong className="text-white">{schedule.subject}</strong>
                      <br />
                      <span className="text-white">{schedule.section}</span>   
                    </div>
                  ))
              ) : ''}
          </td>
        ))}
      </tr>
    ));
  };

  // Function to determine the shading class based on the schedule
  const getShadeClass = (day, timeSlot) => {
    const isScheduled = semScheds[day] && semScheds[day].some(schedule => {
      const startTime = schedule.start;
      const endTime = schedule.end;

      // Check if timeSlot falls within the range of start and end times
      return timeSlot >= startTime && timeSlot <= endTime;
    });

    return isScheduled ? 'bg-enamelled-jewel' : ''; // Change the background color class as needed
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <>
      <table className="bg-white text-black">
        <thead>
          <tr>
            <th>Time</th>
            {daysOfWeek.map((day, index) => (
              <th key={index}>{day}</th>
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

export default Faculty;