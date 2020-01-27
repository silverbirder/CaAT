import Calendar = GoogleAppsScript.Calendar.Calendar;
import CalendarEvent = GoogleAppsScript.Calendar.CalendarEvent;
import {copyDate} from "../utils/dateUtils";
import IGroup, {IGroupMember, IGroupConfig, IHoliday, IHolidayWords} from "./iGroup";


export default class GroupImpl implements IGroup {
    id: string;
    config: IGroupConfig;

    constructor(id: string, config: IGroupConfig) {
        this.id = id;
        const defaultHolidayWords: IHolidayWords = {
            morning: new RegExp(''),
            afternoon: new RegExp(''),
            all: new RegExp(''),
        };
        const defaultConfig: IGroupConfig = {
            startDate: new Date(),
            endDate: new Date(),
            members: [],
            holidayWords: defaultHolidayWords
        };
        this.config = config || defaultConfig;
    }

    fetchHolidays(): Array<IHoliday> {
        const holidays: Array<IHoliday> = [];
        const calendar: Calendar = CalendarApp.getCalendarById(this.id);
        calendar.getEvents(this.config.startDate, this.config.endDate).forEach((event: CalendarEvent) => {
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
            holidays.push({
                morning: am,
                afternoon: pm,
                all: all,
                title: title,
                inMember: members,
                start: copyDate(event.getStartTime()),
                end: copyDate(event.getEndTime()),
            });
        });
        return holidays;
    }
}