import IMember, {ISchedule} from "../../src/member/iMember";
import MemberImpl from "../../src/member/memberImpl";
import CalendarMock from "../../src/calendar/calendarMock";

describe('MemberImpl', () => {
    describe('fetchSchedules', () => {
        test('None', () => {
            const member: IMember = new MemberImpl('user@gmail.com');
            member.calendar = new CalendarMock();
            const schedules: Array<ISchedule> = member.fetchSchedules();
            console.log(schedules);
        })
    })
});