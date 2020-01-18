import Calendar = GoogleAppsScript.Calendar.Calendar;
import CalendarEvent = GoogleAppsScript.Calendar.CalendarEvent;
import GuestStatus = GoogleAppsScript.Calendar.GuestStatus;
import IMember, {IRange, ISchedule} from "./iMember";

export default class MemberImpl implements IMember {
    _id: string;
    everyMinutes: number;
    ignore: RegExp;
    startDate: Date;
    endDate: Date;
    cutTimeRange: Array<IRange>;

    constructor(id: string) {
        this._id = id;
    }

    fetchSchedules(): Array<ISchedule> {
        const schedules: Array<ISchedule> = [];
        const calendar: Calendar = CalendarApp.getCalendarById(this._id);
        const movePoint: Date = this._copyDate(this.startDate);
        while (movePoint.getTime() <= this.endDate.getTime()) {
            calendar.getEventsForDay(movePoint).forEach((event: CalendarEvent) => {
                const title: string = event.getTitle();
                const startDate: Date = this._copyDate(event.getStartTime());
                const endDate: Date = this._copyDate(event.getEndTime());
                const status: GuestStatus = event.getMyStatus();
                const ignore: boolean = this.ignore.test(title);
                const allDay: boolean = event.isAllDayEvent();
                const statusStr: string = status.toString();
                // Note: If you are OWNER and not attend the events, status is OWNER.
                // Note: Google Apps Script can't enum ?
                const noNeedCalcAssignMinute = statusStr === 'NO' || ignore || allDay;
                const originalAssignMinute = this._calcAssignMinute(startDate, endDate, []);

                let assignMinute: number = 0;
                let cut: boolean = false;
                if (!noNeedCalcAssignMinute) {
                    assignMinute = this._calcAssignMinute(startDate, endDate, this.cutTimeRange);
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
            movePoint.setDate(movePoint.getDate() + 1);
        }
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
        const movePoint: Date = this._copyDate(start);
        while (movePoint.getTime() < end.getTime()) {
            movePoint.setTime(movePoint.getTime() + 1);
            const inCutTime = cut.some((range: IRange) => {
                return (movePoint.getTime() <= range.to.getTime() && movePoint.getTime() >= range.from.getTime());
            });
            movePoint.setTime(movePoint.getTime() - 1);
            if (!inCutTime) {
                calculatedAssignMinute += this.everyMinutes;
            }
            movePoint.setMinutes(movePoint.getMinutes() + this.everyMinutes);
        }
        return calculatedAssignMinute;
    }

    _copyDate(d: Date | GoogleAppsScript.Base.Date): Date {
        return new Date(d.getTime());
    };
}