import Calendar = GoogleAppsScript.Calendar.Calendar;
import CalendarEvent = GoogleAppsScript.Calendar.CalendarEvent;
import GuestStatus = GoogleAppsScript.Calendar.GuestStatus;

export interface ISchedule {
    status: GuestStatus,
    start: Date,
    end: Date,
    assignMinute: number,
    title: string,
    description: string,
}

export default class GroupMock {
    _id: string;
    ignore: RegExp;
    startDate: Date;
    endDate: Date;

    constructor(id: string) {
        this._id = id;
    }

    fetchSchedules(): Array<ISchedule> {
        const schedules: Array<ISchedule> = [];
        const calendar: Calendar = CalendarApp.getCalendarById(this._id);
        const movePoint: Date = new Date(this.startDate.getTime());
        while (movePoint.getTime() <= this.endDate.getTime()) {
            calendar.getEventsForDay(movePoint).forEach((event: CalendarEvent) => {
                const title: string = event.getTitle();
                if (title.match(this.ignore)) {
                    Logger.log(`skip the event: ${title}`);
                    return;
                }
                const eventStartDate: Date = new Date(event.getStartTime().getTime());
                const eventEndDate: Date = new Date(event.getEndTime().getTime());
                let assignMinute: number = 0;
                const schedule: ISchedule = {
                    status: event.getMyStatus(),
                    start: eventStartDate,
                    end: eventEndDate,
                    assignMinute: assignMinute,
                    title: event.getTitle(),
                    description: event.getDescription(),
                };
                schedules.push(schedule);
            });
            movePoint.setDate(movePoint.getDate() + 1);
        }
        return schedules;
    }
}