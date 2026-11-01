/**
 * Intro-call booking rules. Everything a client may want to change about the
 * calendar — call length, working days, slot times, how far ahead people can
 * book — lives here.
 */
export const booking = {
  durationMinutes: 30,
  durationLabel: "30 min",
  timezone: "Asia/Kolkata",
  timezoneLabel: "Asia/Kolkata (IST)",
  meetingLabel: "Video call",
  /** 0 = Sunday … 6 = Saturday. Calls are not offered on Sundays. */
  openWeekdays: [1, 2, 3, 4, 5, 6] as number[],
  /** 24-hour slots, rendered as 12-hour by default. */
  slotTimes: [
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ],
  /** Earliest bookable day, counted from tomorrow. */
  leadDays: 1,
  /** How many months beyond the current one the calendar can browse. */
  monthsAhead: 2,
} as const;

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const weekdayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export const weekdayLong = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;
