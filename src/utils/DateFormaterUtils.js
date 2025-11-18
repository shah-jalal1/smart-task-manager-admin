import dayjs from "dayjs";
import {DATE_FORMAT, DATE_FORMAT_THREE, DATE_FORMAT_TWO, TIME_FORMAT} from "../constant/ConstantVariables.js";
import utc from 'dayjs/plugin/utc';

export const longToDate = date => {
    if (!date) return;
    return new Date(+date);
}

export const dateToLong = date => {
    if (!date) return;
    return date * 1;
}

export const longToDateFormater = date => {

    if (!date || isNaN(+date)) {
        return null;
    }

    dayjs.extend(utc);

    return dayjs.utc(longToDate(date)).local().format(DATE_FORMAT);

}

export const longToDateFormaterTwo = date => {

    if (!date || isNaN(+date)) {
        return null;
    }

    dayjs.extend(utc);

    return dayjs.utc(longToDate(date)).local().format(DATE_FORMAT_THREE);

}

export const longToDateTimeFormatter = date => {

    dayjs.extend(utc);

    // Handle invalid or missing input
    if (!date || isNaN(+date)) {
        return null; // Or a default value like ''
    }

    // Create UTC date, convert to local time, and format
    return dayjs.utc(+date).local().format("MMM. D, YYYY, hh:mm A").replace("AM", "a.m.").replace("PM", "p.m.");
}

export const longToDateTimeFormatterTwo = date => {

    dayjs.extend(utc);

    if (!date || isNaN(+date)) {
        return null;
    }

    return dayjs.utc(longToDate(date)).local().format(`${DATE_FORMAT_THREE} ${TIME_FORMAT} `);

}

export const longToTimeFormatter = date => {

    if (!date || isNaN(+date)) {
        return null;
    }

    dayjs.extend(utc);

    return dayjs.utc(longToDate(date)).local().format(`${TIME_FORMAT}`);

}


// Define your date formats
export const dateFormatForPrint = "DD-MM-YYYY hh:mm:ss a";
export const dateFormatForSend = "DD-MM-YYYY HH:mm:ss";

// `fromDate` function using Day.js
export const fromDate = (day = 2) =>
    dayjs()
        .subtract(day, 'day') // Subtract 'day' number of days from the current date
        .startOf('day') // Set to the start of the day (00:00:00)
        .format(dateFormatForSend);

// `toDate` function using Day.js
export const toDate = () =>
    dayjs()
        .endOf('day') // Set to the end of the day (23:59:59)
        .format(dateFormatForSend);
