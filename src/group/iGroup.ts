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
    am: boolean,
    pm: boolean,
    all: boolean,
    member: Array<string>,
    day: Date,
    title: string,
}

export default interface IGroup {
    id: string;
    startDate: Date;
    endDate: Date;
    members: Array<IGroupMember>;
    holidayWords: IHolidayWords;

    fetchHolidays(): Array<IHoliday>;
}