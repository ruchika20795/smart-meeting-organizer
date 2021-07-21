import { getCurrentTime, getTimeAsNumberOfMinutes } from './date';

/**
 * To get the details for a given meeting room on a given date/time.
 * If date not provided it will take current date/time by default.
 * 
 * @param meetingRoom - MeetingRoom object for which we want to get the details
 * @param date - Date for which we want to get the meeting room details
 * @returns object - {meeting: {today: number, now: number}, meetingRoom: {free: number}}
 */
export const getMeetingRoomDetails = (meetingRoom, date, time) => {
    const currentDate = new Date().toLocaleDateString('en-GB'); 
    // console.log(date, time, currentDate);
    const meetingsOnThisDate = meetingRoom.meetings.filter(m => m.date === (date || currentDate));
    const res = {meeting: {today: 0, now: 0}, meetingRoom: {free: true}};
    res.meeting.today = meetingsOnThisDate.length;
    if (meetingRoom.meetings.length === 0 || meetingsOnThisDate.length > 0) {
        console.log(meetingsOnThisDate);
        const meetingsGoingOn = meetingsOnThisDate.filter(m => !checkIfMeetingGoingOn(m, time));
        res.meetingRoom.free = (meetingsGoingOn.length === 0);
        res.meeting.now = meetingsGoingOn.length;
        return res;
    }
    return res;
}

/**
 * To check if a given meeting is going on at a particular time.
 * If time not provided it will take current time by default.
 * 
 * @param meeting - Meeting object for which we want to check
 * @param time - Time for which we want to check in the 24hr format hh:mm
 * @returns boolean
 */
const checkIfMeetingGoingOn = (meeting, time) => {
    const currentTime = getTimeAsNumberOfMinutes(time || getCurrentTime());
    const meetingEndTime = getTimeAsNumberOfMinutes(meeting.endTime);
    const meetingStartTime = getTimeAsNumberOfMinutes(meeting.startTime);
    return (meetingStartTime > currentTime || currentTime > meetingEndTime);
}
