import ICalendar, {CCalendar} from "./iCalendar";

export default class CalendarImpl implements ICalendar {
    getCalendarById(id: string):  CCalendar{
        const calendar: CCalendar = CalendarApp.getCalendarById(id);
        return calendar;
    }
}