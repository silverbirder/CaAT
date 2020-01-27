import ICalendarApp, {ICalendar, ICalendarEvent} from "./ICalendarApp";

export default class CalendarAppMock implements ICalendarApp {
    getCalendarById(id: string): ICalendar {
        const c: ICalendar = {
            getEvents(startTime: Date, endTime: Date): Array<ICalendarEvent> {
                return this._ac!;
            }
        };
        return c;
    }
}