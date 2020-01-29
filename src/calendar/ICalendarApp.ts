export default interface ICalendarApp {
    calendars?: Array<ICalendarSet>;

    getCalendarById(id: string): ICalendar;
}

export interface ICalendarSet {
    id: number,
    calendar: ICalendar
}

export interface ICalendar {
    calendarEvent?: Array<ICalendarEvent>

    getEvents(startTime: Date, endTime: Date): Array<ICalendarEvent>;
}

export interface ICalendarEvent {
    title?: string,
    startTime?: any,
    endTime?: any,
    myStatus?: any,
    description?: string,
    isAllDay?: boolean,

    getTitle(): string;

    getStartTime(): any;

    getEndTime(): any;

    getMyStatus(): any;

    getDescription(): string;

    isAllDayEvent(): boolean;
}
