const startPattern = (startTime, dayDigits, day) => {
    let output;
    switch (JSON.stringify(startTime)) {
        case '{"hour":"7","minutes":"00","type":"AM"}':
            output = { startTime, section: dayDigits[0], day }
            break;
        case '{"hour":"8","minutes":"30","type":"AM"}':
            output = { startTime, section: dayDigits[1], day }
            break;
        case '{"hour":"10","minutes":"00","type":"AM"}':
            output = { startTime, section: dayDigits[2], day }
            break;
        case '{"hour":"11","minutes":"30","type":"AM"}':
            output = { startTime, section: dayDigits[3], day }
            break;
        case '{"hour":"1","minutes":"00","type":"AM"}':
            output = { startTime, section: dayDigits[4], day }
            break;
        case '{"hour":"2","minutes":"30","type":"AM"}':
            output = { startTime, section: dayDigits[5], day }
            break;
        case '{"hour":"4","minutes":"00","type":"AM"}':
            output = { startTime, section: dayDigits[6], day }
            break;
        case '{"hour":"5","minutes":"30","type":"AM"}':
            output = { startTime, section: dayDigits[7], day }
            break;
        default:
            output = "error"
            break;
    }
    return output
}

const dayPattern = (day, startTime) => {
    switch (day) {
        case "TTH":
            console.log("2")
            return startPattern(startTime, "ABCDEFGH", ["Teusday", "Thursday"])
            break;
        case "WF":
            return startPattern(startTime, "IJKLMNOP", ["Wednesday", "Friday"])
            break;
        case "M":
            return startPattern(startTime, "QRSTUVWX", ["Monday"])
            break;
        default:
            return "error"
            break;
    }
}


const sectionPattern = (days) => {
    return days.map(element => {
        return dayPattern(element.day,element.startTime)
    })
}

// console.log(sectionPattern(
//     [
//         {
//             day: "TTH",
//             startTime: { "hour": "7", "minutes": "00", "type": "AM" },
//             endTime: { "hour": "8", "minutes": "00", "type": "PM" }
//         }, {
//             day: "WF",
//             startTime: { "hour": "10", "minutes": "00", "type": "AM" },
//             endTime: { "hour": "8", "minutes": "00", "type": "PM" }
//         }, {
//             day: "M",
//             startTime: { "hour": "10", "minutes": "00", "type": "AM" },
//             endTime: { "hour": "8", "minutes": "00", "type": "PM" }
//         }
//     ]
// ))