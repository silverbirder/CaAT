import ICalendarApp, {ICalendar, ICalendarEvent, ICalendarSet} from "./ICalendarApp";

export default class CalendarAppMock implements ICalendarApp {
    calendars?: Array<ICalendarSet>;

    getCalendarById(id: string): ICalendar {
        return this.calendars![0].calendar
    }

}

export class CalendarMock implements ICalendar {
    calendarEvent?: Array<ICalendarEvent>;

    getEvents(startTime: Date, endTime: Date): Array<ICalendarEvent> {
        return this.calendarEvent!;
    }

}

export class CalendarEventMock implements ICalendarEvent {
    description?: string;
    endTime?: any;
    isAllDay?: boolean;
    myStatus?: any;
    startTime?: any;
    title?: string;

    getDescription(): string {
        return this.description!;
    }

    getEndTime(): any {
        return this.endTime!;
    }

    getMyStatus(): any {
        return this.myStatus!;
    }

    getStartTime(): any {
        return this.startTime!;
    }

    getTitle(): string {
        return this.title!;
    }

    isAllDayEvent(): boolean {
        return this.isAllDay!;
    }

}