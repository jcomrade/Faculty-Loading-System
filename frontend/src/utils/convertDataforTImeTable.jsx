export const convertToFacultyTimeTableData = (semesterSchedules) => {



    // Specific faculty _id to filter for
    const specificFacultyId = "658bb81046e06343b984849f"; // Change this to the desired _id

    // Filter inputData for the specific faculty using _id
    const filteredData = semesterSchedules.filter(item => item.faculty._id === specificFacultyId);

    // Initialize an empty array to store the converted format
    let convertedData = [];

    // Function to remove "AM" and "PM" from time strings and format the time
    const formatTime = (timeString) => {
        // Remove "AM" or "PM"
        const withoutAMPM = timeString.replace(/( AM| PM)/g, '');

        // Split hours and minutes
        const [hours, minutes] = withoutAMPM.split(':');

        // Remove leading zero from hours if it exists
        const formattedHours = parseInt(hours, 10).toString();

        // Return the formatted time
        return `${formattedHours}:${minutes}`;
    };

    // Iterate through the filteredData array
    filteredData.forEach(item => {
        // Iterate through the schedule array in each item
        item.schedule.forEach(schedule => {
            // Extract necessary information from the schedule object
            const { day, section, startTime, endTime } = schedule;

            // If the schedule day is an array, split it into separate objects
            if (Array.isArray(day)) {
                // Iterate through each day in the array
                day.forEach(singleDay => {
                    // Construct the object for each single day
                    const convertedItem = {
                        day: singleDay,
                        subject: item.course.code, // Assuming course code represents the subject
                        section,
                        start: formatTime(startTime),
                        end: formatTime(endTime),
                        subjectRendered: false,
                        sectionRendered: false,
                    };

                    // Push the converted item to the convertedData array
                    convertedData.push(convertedItem);
                });
            } else {
                // If the schedule day is not an array, construct the object normally
                const convertedItem = {
                    day,
                    subject: item.course.code, // Assuming course code represents the subject
                    section,
                    start: formatTime(startTime),
                    end: formatTime(endTime),
                    subjectRendered: false,
                    sectionRendered: false,
                };

                // Push the converted item to the convertedData array
                convertedData.push(convertedItem);
            }
        });
    });

    // Flatten the array of arrays into a single array of objects
    convertedData = convertedData.flat();

    // Output the converted data
    console.log(convertedData);
    return convertedData
}