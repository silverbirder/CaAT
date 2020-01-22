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

export interface IMemberOption {
    everyMinutes: number;
    ignore: RegExp;
    startDate: Date;
    endDate: Date;
    cutTimeRange: Array<IRange>;
}

export default interface IMember {
    id: string;
    option: IMemberOption;

    fetchSchedules(): Array<ISchedule>;
}