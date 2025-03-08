export function toDateTimeString(date, local = "de") {
    return date.toLocaleDateString(local) + " " + date.toLocaleTimeString(local);
}

export function addTimezoneOffset(date) {
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
}

export function removeTimezoneOffset(date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
}

export function toInputDateTimeString(date) {
    return date.toISOString().slice(0, 16);
}

export function toTimezoneOffsetCorrectedInputDateTimeString(date) {
    return toInputDateTimeString(removeTimezoneOffset(date));
}