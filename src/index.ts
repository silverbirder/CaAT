import MemberImpl from "./member/memberImpl";
import IMember, {ISchedule} from "./member/iMember";
import iGroup, {IGroupMember, IHoliday} from "./group/iGroup";
import GroupImpl from "./group/groupImpl";

function sampleMember() {
    const member: IMember = new MemberImpl('your_account@gmail.com');
    member.ignore = new RegExp('not working', 'i');
    member.everyMinutes = 15;
    member.cutTimeRange = [{from: new Date('2020-01-18T12:00'), to: new Date('2020-01-18T13:00')}];
    member.startDate = new Date('2020-01-18');
    member.endDate = new Date('2020-01-18');
    const schedules: Array<ISchedule> = member.fetchSchedules();
}

function sampleGroup() {
    const group: iGroup = new GroupImpl('group_that_on_belong_you@gmail.com');
    group.holidayWords.all = new RegExp('holiday', 'i');
    group.holidayWords.morning = new RegExp('AM', 'i');
    group.holidayWords.afternoon = new RegExp('PM', 'i');
    const members: Array<IGroupMember> = [
        {
            name: 'your_account@gmail.com',
            match: new RegExp('you', 'i')
        }
    ];
    group.members = members;
    group.startDate = new Date('2020-01-18');
    group.endDate = new Date('2020-01-18');
    const holidays: Array<IHoliday> = group.fetchHolidays();
}