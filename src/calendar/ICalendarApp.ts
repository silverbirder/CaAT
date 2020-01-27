export interface ICalendar {
    _ac?: Array<ICalendarEvent>;
    getEvents(startTime: Date, endTime: Date): Array<ICalendarEvent>;
}

export interface ICalendarEvent {
    getTitle(): string;

    getStartTime(): any;

    getEndTime(): any;

    getMyStatus(): any;

    getDescription(): string;

    isAllDayEvent(): boolean;
}

export default interface ICalendarApp {
    getCalendarById(id: string): ICalendar;
}