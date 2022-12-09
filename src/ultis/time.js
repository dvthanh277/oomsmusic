export function secondsToHms(time) {
    time = Number(time)
    var h = Math.floor(time / 3600)
    var m = Math.floor((time % 3600) / 60)
    var s = Math.floor((time % 3600) % 60)

    var hDisplay = h > 0 ? h + ':' : ''
    var mDisplay = m > 0 ? ('0' + m).slice(-2) + ':' : '00:'
    var sDisplay = s > 0 ? ('0' + s).slice(-2) : '00'
    return hDisplay + mDisplay + sDisplay
}

/**
 * convert HH:MM:SS string to seconds
 * @param hms - string to convert, pattern: [[HH:]MM:]SS,
 * @return {number}
 */
export function hmsToSeconds(hms = '') {
    if (!hms || typeof hms !== 'string') {
        return NaN
    }
    const [SS = 0, MM = 0, HH = 0] = hms.split(':').reverse().map(Number)

    if ([SS, MM, HH].some(isNaN)) {
        return NaN
    }

    const start = new Date()
    const clone = new Date(start)

    clone.setHours(
        start.getHours() + HH,
        start.getMinutes() + MM,
        start.getSeconds() + SS
    )

    return (+clone - +start) / 1000
}
