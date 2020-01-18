import MemberImpl from "./member/memberImpl";
import IMember, {ISchedule} from "./member/iMember";
import iGroup, {IGroupMember, IHoliday} from "./group/iGroup";
import GroupImpl from "./group/groupImpl";

function sampleMember() {
    const member: IMember = new MemberImpl('XXXX');
    member.ignore = new RegExp('YYYY', 'ig');
    member.everyMinutes = 15;
    member.cutTimeRange = [{from: new Date('2020-01-18T12:00'), to: new Date('2020-01-18T13:00')}];
    member.startDate = new Date('2020-01-18');
    member.endDate = new Date('2020-01-18');
    const schedules: Array<ISchedule> = member.fetchSchedules();
}

function sampleGroup() {
    const group: iGroup = new GroupImpl('XXXX');
    group.holidayWords.all = new RegExp('X', 'ig');
    group.holidayWords.morning = new RegExp('XX', 'ig');
    group.holidayWords.afternoon = new RegExp('XX', 'ig');
    const members: Array<IGroupMember> = [{
        name: 'XXXX',
        match: new RegExp('XXXX', 'ig')
    }];
    group.members = members;
    group.startDate = new Date('2020-01-18');
    group.endDate = new Date('2020-01-18');
    const holidays: Array<IHoliday> = group.fetchHolidays();
}