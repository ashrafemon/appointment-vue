export const timeRangesQuarter = [
    '08:00 am',
    '08:15 am',
    '08:30 am',
    '08:40 am',
    '09:00 am',
    '09:15 am',
    '09:30 am',
    '09:45 am',
    '10:00 am',
    '10:15 am',
    '10:30 am',
    '10:45 am',
    '11:00 am',
    '11:15 am',
    '11:30 am',
    '11:45 am',
    '12:00 pm',
    '12:15 pm',
    '12:30 pm',
    '12:45 pm',
    '01:00 pm',
    '01:15 pm',
    '01:30 pm',
    '01:45 pm',
    '02:00 pm',
    '02:15 pm',
    '02:30 pm',
    '02:45 pm',
    '03:00 pm',
    '03:15 pm',
    '03:30 pm',
    '03:45 pm',
    '04:00 pm',
    '04:15 pm',
    '04:30 pm',
    '04:45 pm',
    '05:00 pm',
    '05:15 pm',
    '05:30 pm',
    '05:45 pm',
    '06:00 pm',
    '06:15 pm',
    '06:30 pm',
    '06:45 pm',
    '07:00 pm',
    '07:15 pm',
    '07:30 pm',
    '07:45 pm',
    '08:00 pm',
    '08:15 pm',
    '08:30 pm',
    '08:45 pm',
    '09:00 pm',
    '09:15 pm',
    '09:30 pm',
    '09:45 pm',
    '10:00 pm',
    '10:15 pm',
    '10:30 pm',
    '10:45 pm',
    '11:00 pm',
    '11:15 pm',
    '11:30 pm',
    '11:45 pm',
    '12:00 am',
]

export const timeRangesHalf = [
    '08:00 am',
    '08:30 am',
    '09:00 am',
    '09:30 am',
    '10:00 am',
    '10:30 am',
    '11:00 am',
    '11:30 am',
    '12:00 pm',
    '12:30 pm',
    '01:00 pm',
    '01:30 pm',
    '02:00 pm',
    '02:30 pm',
    '03:00 pm',
    '03:30 pm',
    '04:00 pm',
    '04:30 pm',
    '05:00 pm',
    '05:30 pm',
    '06:00 pm',
    '06:30 pm',
    '07:00 pm',
    '07:30 pm',
    '08:00 pm',
    '08:30 pm',
    '09:00 pm',
    '09:30 pm',
    '10:00 pm',
    '10:30 pm',
    '11:00 pm',
    '11:30 pm',
    '12:00 am',
]

export const generateTimes = () => {
    let today = new Date();
    let currentHour = today.getHours()
    let currentMinutes = today.getMinutes()
    let meridian = 'am'

    if (currentHour > 12) {
        currentHour = currentHour - 12
        meridian = 'pm'
    } else if (currentHour < 10) {
        currentHour = '0' + currentHour
    } else if (currentHour === 0) {
        currentHour = 12
    }

    if (currentMinutes < 10) {
        currentMinutes = '0' + currentMinutes
    }

    let formatTime = (`${currentHour}:${currentMinutes} ${meridian}`).toString()

    return {today, formatTime, currentHour, currentMinutes, meridian}
}

export const generateTimesByArgs = (data) => {
    let times = data.split(":")
    let newTimes = times[1].split(" ")
    let currentHour = times[0]
    let currentMinutes = newTimes[0]
    let meridian = newTimes[1]

    if (meridian === "pm") {
        currentHour = (parseInt(currentHour) + 12).toString()
    }

    if (meridian === 'am' && currentHour === '12') {
        currentHour = '00'
    }

    return {currentHour, currentMinutes, meridian}
}