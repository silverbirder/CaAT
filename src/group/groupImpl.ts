import {copyDate} from "../utils/dateUtils";
import IGroup, {IGroupConfig, IGroupMember, IHoliday, IHolidayWords} from "./iGroup";
import ICalendarApp, {ICalendar, ICalendarEvent} from "../calendar/ICalendarApp";
import CalendarAppImpl from "../calendar/calendarAppImpl";


export default class GroupImpl implements IGroup {
    id: string;
    config: IGroupConfig;
    calendarApp: ICalendarApp;

    constructor(id: string, config?: IGroupConfig, calendar?: ICalendarApp) {
        this.id = id;
        const defaultHolidayWords: IHolidayWords = {
            morning: new RegExp('(?!)'),
            afternoon: new RegExp('(?!)'),
            all: new RegExp('(?!)'),
        };
        const defaultConfig: IGroupConfig = {
            startDate: new Date(),
            endDate: new Date(),
            members: [],
            holidayWords: defaultHolidayWords
        };
        this.config = config || defaultConfig;
        this.calendarApp = calendar || new CalendarAppImpl();
    }

    fetchHolidays(): Array<IHoliday> {
        const holidays: Array<IHoliday> = [];
        const calendar: ICalendar = this.calendarApp.getCalendarById(this.id);
        calendar.getEvents(this.config.startDate, this.config.endDate).forEach((event: ICalendarEvent) => {
            const allDay: boolean = event.isAllDayEvent();
            if (!allDay) {
                return;
            }
            const title: string = event.getTitle();
            const am: boolean = this.config.holidayWords.morning.test(title);
            const pm: boolean = this.config.holidayWords.afternoon.test(title);
            const all: boolean = am === true || pm === true ? false : this.config.holidayWords.all.test(title);
            if (am === false && pm === false && all === false) {
                return;
            }
            const members: Array<string> = this.config.members.filter((member: IGroupMember) => {
                return member.match.test(title);
            }, title).map((member: IGroupMember) => {
                return member.name;
            });
            const movePoint: Date = copyDate(event.getStartTime());
            while (movePoint.getTime() < event.getEndTime().getTime()) {
                if(movePoint.getTime() <= this.config.endDate.getTime() && movePoint.getTime() >= this.config.startDate.getTime()) {
                    holidays.push({
                        morning: am,
                        afternoon: pm,
                        all: all,
                        title: title,
                        inMember: members,
                        toDate: copyDate(movePoint),
                    });
                }
                movePoint.setDate(movePoint.getDate() + 1);
            }
        });
        return holidays;
    }
}