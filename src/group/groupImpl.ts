import Calendar = GoogleAppsScript.Calendar.Calendar;
import CalendarEvent = GoogleAppsScript.Calendar.CalendarEvent;
import {copyDate} from "../utils/dateUtils";
import IGroup, {IGroupMember, IHoliday, IHolidayWords} from "./iGroup";


export default class GroupImpl implements IGroup {
    id: string;
    startDate: Date;
    endDate: Date;
    members: Array<IGroupMember>;
    holidayWords: IHolidayWords;

    constructor(id: string) {
        this.id = id;
        this.startDate = new Date();
        this.endDate = new Date();
        this.members = [];
        this.holidayWords = {
            morning: new RegExp(''),
            afternoon: new RegExp(''),
            all: new RegExp(''),
        };
    }

    fetchHolidays(): Array<IHoliday> {
        const holidays: Array<IHoliday> = [];
        const calendar: Calendar = CalendarApp.getCalendarById(this.id);
        calendar.getEvents(this.startDate, this.endDate).forEach((event: CalendarEvent) => {
            const allDay: boolean = event.isAllDayEvent();
            if (!allDay) {
                return;
            }
            const title: string = event.getTitle();
            const am: boolean = this.holidayWords.morning.test(title);
            const pm: boolean = this.holidayWords.afternoon.test(title);
            const all: boolean = am === true || pm === true ? false : this.holidayWords.all.test(title);
            if (am === false && pm === false && all === false) {
                return;
            }
            const members: Array<string> = this.members.filter((member: IGroupMember) => {
                return member.match.test(title);
            }, title).map((member: IGroupMember) => {
                return member.name;
            });
            holidays.push({
                am: am,
                pm: pm,
                all: all,
                title: title,
                member: members,
                day: copyDate(event.getStartTime())
            })
        });
        return holidays;
    }
}