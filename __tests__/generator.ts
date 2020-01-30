import {ICalendar, ICalendarEvent, ICalendarSet} from "../src/calendar/ICalendarApp";
import {CalendarEventMock, CalendarMock} from "../src/calendar/calendarAppMock";

export function generateDefaultCalendarEvents(ranges: Array<{ start: Date, end: Date, allDay?: boolean, title?: string }>): Array<ICalendarEvent> {
    return ranges.map((range: { start: Date, end: Date, allDay?: boolean, title?: string }) => {
        const calendarEvent: ICalendarEvent = new CalendarEventMock();
        calendarEvent.description = 'description';
        calendarEvent.startTime = range.start;
        calendarEvent.endTime = range.end;
        calendarEvent.isAllDay = range.allDay || false;
        calendarEvent.myStatus = 'INVITE';
        calendarEvent.title = range.title || 'title';
        return calendarEvent;
    });
}

export function generateDefaultCalendars(calendarEvents: Array<ICalendarEvent>): Array<ICalendarSet> {
    const calendar: ICalendar = new CalendarMock();
    calendar.calendarEvent = calendarEvents;
    const calendarSet: ICalendarSet = {id: 1, calendar: calendar};
    return [calendarSet];
}