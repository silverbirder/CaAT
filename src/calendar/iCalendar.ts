export interface CCalendar {
    getEvents(startTime: Date, endTime: Date): Array<CCalendarEvent>;
}

export interface CCalendarEvent {
    getTitle(): any;

    getStartTime(): any;

    getEndTime(): any;

    getMyStatus(): any;

    getDescription(): any;

    isAllDayEvent(): any;
}

export default interface ICalendar {
    getCalendarById(id: string): CCalendar;
}