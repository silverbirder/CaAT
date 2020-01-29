import IMember, {IMemberConfig, ISchedule} from "../../src/member/iMember";
import MemberImpl from "../../src/member/memberImpl";
import CalendarAppMock, {CalendarEventMock, CalendarMock} from "../../src/calendar/calendarAppMock";
import {ICalendar, ICalendarEvent, ICalendarSet} from "../../src/calendar/ICalendarApp";

describe('Class: MemberImpl', () => {
    describe('Func: fetchSchedules', () => {
        describe('Data: single schedule', () => {
            test('Return: single schedule', () => {
                // Arrange
                const member: IMember = new MemberImpl('user@gmail.com');
                const config: IMemberConfig = {
                    everyMinutes: 15,
                    ignore: new RegExp('(?!)'),
                    startDate: new Date('2020-01-01T00:00:00'),
                    endDate: new Date('2020-01-02T00:00:00'),
                    cutTimeRange: [],
                };
                member.config = config;
                member.calendarApp = new CalendarAppMock();
                const calendar: ICalendar = new CalendarMock();
                const calendarEvent: ICalendarEvent = new CalendarEventMock();
                calendarEvent.description = 'description';
                calendarEvent.startTime = new Date('2020-01-01T00:00:00');
                calendarEvent.endTime = new Date('2020-01-01T01:00:00');
                calendarEvent.isAllDay = false;
                calendarEvent.myStatus = 'INVITE';
                calendarEvent.title = 'title';
                calendar.calendarEvent = [calendarEvent];
                const calendarSet: ICalendarSet = {id: 1, calendar: calendar};
                member.calendarApp.calendars = [calendarSet];

                // Act
                const schedules: Array<ISchedule> = member.fetchSchedules();

                // Assert
                expect(schedules[0].assignMinute).toBe(60);
            })
        });
    })
});