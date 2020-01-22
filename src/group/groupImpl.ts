import Calendar = GoogleAppsScript.Calendar.Calendar;
import CalendarEvent = GoogleAppsScript.Calendar.CalendarEvent;
import {copyDate} from "../utils/dateUtils";
import IGroup, {IGroupMember, IGroupOption, IHoliday, IHolidayWords} from "./iGroup";


export default class GroupImpl implements IGroup {
    id: string;
    option: IGroupOption;

    constructor(id: string, option: IGroupOption) {
        this.id = id;
        const defaultHolidayWords: IHolidayWords = {
            morning: new RegExp(''),
            afternoon: new RegExp(''),
            all: new RegExp(''),
        };
        const defaultOption: IGroupOption = {
            startDate: new Date(),
            endDate: new Date(),
            members: [],
            holidayWords: defaultHolidayWords
        };
        this.option = option || defaultOption;
    }

    fetchHolidays(): Array<IHoliday> {
        const holidays: Array<IHoliday> = [];
        const calendar: Calendar = CalendarApp.getCalendarById(this.id);
        calendar.getEvents(this.option.startDate, this.option.endDate).forEach((event: CalendarEvent) => {
            const allDay: boolean = event.isAllDayEvent();
            if (!allDay) {
                return;
            }
            const title: string = event.getTitle();
            const am: boolean = this.option.holidayWords.morning.test(title);
            const pm: boolean = this.option.holidayWords.afternoon.test(title);
            const all: boolean = am === true || pm === true ? false : this.option.holidayWords.all.test(title);
            if (am === false && pm === false && all === false) {
                return;
            }
            const members: Array<string> = this.option.members.filter((member: IGroupMember) => {
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
                toDate: copyDate(event.getStartTime())
            })
        });
        return holidays;
    }
}