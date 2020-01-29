import ICalendarApp, {ICalendar} from "./ICalendarApp";

export default class CalendarAppImpl implements ICalendarApp {

    getCalendarById(id: string):  ICalendar{
        const calendar: ICalendar = CalendarApp.getCalendarById(id);
        return calendar;
    }
}