const transferAvailableData = (data) => {
    let availableData = Object.keys(data)
    let 
    for (const key in data) {
        if (data.hasOwnProperty(key) && !data.key) {
            availableData.key = availableData[key]
            availableData.push(availableData.key)
        }
    }
    console.log(availableData)
}


const data = {name: "test",t: "test"}
const {name, last} = data

transferAvailableData(data)