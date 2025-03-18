// Date#getTimezoneOffset() returns the timezone offset in minutes to get from local time to GMT

export function toGMT(date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
}

export function toInputDateTimeString(date) {
    return toGMT(date).toISOString().slice(0, 16);
}