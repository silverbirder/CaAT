import ICalendar, {CCalendar, CCalendarEvent} from "./iCalendar";

export default class CalendarMock implements ICalendar {
    getCalendarById(id: string): CCalendar {
        const c: CCalendar = {
            getEvents(startTime: Date, endTime: Date): Array<CCalendarEvent> {
                return [];
            }
        };
        return c;
    }
}