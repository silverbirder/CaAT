export interface IHolidayWords {
    morning: RegExp,
    afternoon: RegExp,
    all: RegExp,
}

export interface IGroupMember {
    name: string,
    match: RegExp,
}

export interface IHoliday {
    morning: boolean,
    afternoon: boolean,
    all: boolean,
    inMember: Array<string>,
    start: Date,
    end: Date,
    title: string,
}

export interface IGroupConfig {
    startDate: Date;
    endDate: Date;
    members: Array<IGroupMember>;
    holidayWords: IHolidayWords;
}

export default interface IGroup {
    id: string;
    config: IGroupConfig;

    fetchHolidays(): Array<IHoliday>;
}