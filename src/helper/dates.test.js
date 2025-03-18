import { test, expect } from "vitest";
import { toGMT, toInputDateTimeString } from "./dates.js";

test("Convert local Date to GMT date", () => {
    const localDate = new Date("2020-01-01T12:00:00"); // Local date
    const expectedDate = new Date(Date.UTC(2020, 0, 1, 12, 0, 0));

    const gmtDate = toGMT(localDate);

    expect(gmtDate.getTime()).toBe(expectedDate.getTime());
});

test("Convert GMT Date to GMT date", () => {
    // eslint-disable-next-line no-undef
    process.env.TZ = "GMT";
    const gmtDate = new Date("2020-01-01T12:00:00Z");

    const convertedDate = toGMT(gmtDate);

    expect(convertedDate.getTime()).toBe(gmtDate.getTime());
})

test("Convert Date to input string", () => {
    const date = new Date("2020-01-01T12:00:00");

    const dateString = toInputDateTimeString(date);

    expect(dateString).toBe("2020-01-01T12:00");
})