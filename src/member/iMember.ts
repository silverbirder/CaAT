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

export default interface IMember {
    everyMinutes: number;
    ignore: RegExp;
    startDate: Date;
    endDate: Date;
    cutTimeRange: Array<IRange>;
    fetchSchedules(): Array<ISchedule>;
}