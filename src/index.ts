import MemberImpl from "./member/memberImpl";
import IMember, {ISchedule} from "./member/iMember";

function sample() {
    const member: IMember = new MemberImpl('XXXX');
    member.ignore = new RegExp('YYYY', 'ig');
    member.everyMinutes = 15;
    member.cutTimeRange = [{from: new Date('2020-01-18T12:00'), to: new Date('2020-01-18T13:00')}];
    member.startDate = new Date('2020-01-18T09:00');
    member.endDate = new Date('2020-01-18T18:00');
    const schedules: Array<ISchedule> = member.fetchSchedules();
}
