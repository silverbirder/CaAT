import Calendar = GoogleAppsScript.Calendar.Calendar;
import CalendarEvent = GoogleAppsScript.Calendar.CalendarEvent;
import GuestStatus = GoogleAppsScript.Calendar.GuestStatus;
import IMember, {IMemberConfig, IRange, ISchedule} from "./iMember";
import {copyDate} from "../utils/dateUtils";

export default class MemberImpl implements IMember {
    id: string;
    config: IMemberConfig;

    constructor(id: string, config?: IMemberConfig) {
        this.id = id;
        const defaultConfig: IMemberConfig = {
            everyMinutes: 15,
            ignore: new RegExp(''),
            startDate: new Date(),
            endDate: new Date(),
            cutTimeRange: [],
        };
        this.config = config || defaultConfig;
    }

    fetchSchedules(): Array<ISchedule> {
        const schedules: Array<ISchedule> = [];
        const calendar: Calendar = CalendarApp.getCalendarById(this.id);
        calendar.getEvents(this.config.startDate, this.config.endDate).forEach((event: CalendarEvent) => {
            const title: string = event.getTitle();
            const startDate: Date = copyDate(event.getStartTime());
            const endDate: Date = copyDate(event.getEndTime());
            // Note: If you are OWNER and not attend the events, status is OWNER.
            const status: GuestStatus = event.getMyStatus();
            const ignore: boolean = this.config.ignore.test(title);
            const allDay: boolean = event.isAllDayEvent();
            // Note: Google Apps Script can't enum.
            const statusStr: string = status === null ? 'MAYBE' : status.toString();
            const noNeedCalcAssignMinute = statusStr === 'NO' || ignore || allDay;
            const originalAssignMinute = this._calcAssignMinute(startDate, endDate, []);

            let assignMinute: number = 0;
            let cut: boolean = false;
            if (!noNeedCalcAssignMinute) {
                assignMinute = this._calcAssignMinute(startDate, endDate, this.config.cutTimeRange);
                cut = originalAssignMinute !== assignMinute;
            }
            schedules.push({
                status: statusStr,
                ignore: ignore,
                allDay: allDay,
                cut: cut,
                start: startDate,
                end: endDate,
                assignMinute: assignMinute,
                originalAssignMinute: originalAssignMinute,
                title: event.getTitle(),
                description: event.getDescription(),
            });
        });
        return schedules;
    }

    /*
        ex.
        start: 2020-01-01 11:00
        end: 2020-01-01 13:00
        cut: [{from: 2020-01-01 12:00, to: 2020-01-01 13:00}]
        => assignMinute = 60m;
     */
    _calcAssignMinute(start: Date, end: Date, cut: Array<IRange>): number {
        let calculatedAssignMinute = 0;
        const movePoint: Date = copyDate(start);
        while (movePoint.getTime() < end.getTime()) {
            movePoint.setTime(movePoint.getTime() + 1);
            const inCutTime = cut.some((range: IRange) => {
                return (movePoint.getTime() <= range.to.getTime() && movePoint.getTime() >= range.from.getTime());
            });
            movePoint.setTime(movePoint.getTime() - 1);
            if (!inCutTime) {
                calculatedAssignMinute += this.config.everyMinutes;
            }
            movePoint.setMinutes(movePoint.getMinutes() + this.config.everyMinutes);
        }
        return calculatedAssignMinute;
    }
}