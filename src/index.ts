import MemberImpl from "./member/memberImpl";
import IMember, {ISchedule} from "./member/iMember";
import iGroup, {IGroupMember, IHoliday} from "./group/iGroup";
import GroupImpl from "./group/groupImpl";

function sampleMember() {
    const member: IMember = new MemberImpl('XXXX');
    member.ignore = new RegExp('YYYY', 'i');
    member.everyMinutes = 15;
    member.cutTimeRange = [{from: new Date('2020-01-18T12:00'), to: new Date('2020-01-18T13:00')}];
    member.startDate = new Date('2020-01-18');
    member.endDate = new Date('2020-01-18');
    const schedules: Array<ISchedule> = member.fetchSchedules();
}

function sampleGroup() {
    const group: iGroup = new GroupImpl('XXXX');
    group.holidayWords.all = new RegExp('休', 'i');
    group.holidayWords.morning = new RegExp('AM', 'i');
    group.holidayWords.afternoon = new RegExp('PM', 'i');
    const members: Array<IGroupMember> = [
        {
            name: 'XX',
            match: new RegExp('XX', 'i')
        },
        {
            name: 'XX',
            match: new RegExp('XX', 'i')
        }
    ];
    group.members = members;
    group.startDate = new Date('2020-01-18');
    group.endDate = new Date('2020-01-18');
    const holidays: Array<IHoliday> = group.fetchHolidays();
}