import ICalendarApp from "../calendar/ICalendarApp";

export interface ISchedule {
    status: string,
    start: Date,
    end: Date,
    assignMinute: number,
    originalAssignMinute: number,
    title: string,
    description: string,
    ignore: boolean,
    allDay: boolean,
    cut: boolean,
}

export interface IRange {
    from: Date,
    to: Date,
}

export interface IMemberConfig {
    everyMinutes: number;
    ignore: RegExp;
    startDate: Date;
    endDate: Date;
    cutTimeRange: Array<IRange>;
}

export default interface IMember {
    id: string;
    config: IMemberConfig;
    calendarApp: ICalendarApp;

    fetchSchedules(): Array<ISchedule>;
}