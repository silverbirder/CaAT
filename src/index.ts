import GroupMock, {ISchedule} from './groupMock';

// const group: iGroup = new GroupMock(calendarURL);
// const members: Array<string> = ['silverbirder'];
// members.forEach((member: string) => {
//     group.members.push(createMember(member));
// });
// group.members.forEach((member: any) => {
//    member.schedules = member.fetchData();
// });

function sample() {
    const group: any = new GroupMock('bm6t9rsktjge8t6cehjd7kgqps@group.calendar.google.com');
    group.ignore = /業務時間外/;
    group.cutTimeRange = [{start: 12, end: 13}];
    group.startDate = new Date('2020-01-05');
    group.endDate = new Date('2020-01-10');
    const schedules : Array<ISchedule> = group.fetchSchedules();
    /*
    * {
    * "MON": [{assign: 1}],
    * "TUE": [{assign: 2}],
    * "WED": [{assign: 3}],
    * "THU": [{assign: 4}],
    * "FRI": [{assign: 5}],
    * "SAT": [{assign: 4}],
    * "SUN": [{assign: 3}],
    * }
    * */
}
