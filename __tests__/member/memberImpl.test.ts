import IMember, {ISchedule} from "../../src/member/iMember";
import MemberImpl from "../../src/member/memberImpl";
import CalendarAppMock from "../../src/calendar/calendarAppMock";

describe('Class: MemberImpl', () => {
    describe('Func: fetchSchedules', () => {
        describe('Data: single schedule', () => {
            test('Return: single schedule', () => {
                // Arrange
                const member: IMember = new MemberImpl('user@gmail.com');
                member.calendarApp = new CalendarAppMock();

                // Act
                const schedules: Array<ISchedule> = member.fetchSchedules();

                // Assert
                console.log(schedules);
            })
        });
    })
});