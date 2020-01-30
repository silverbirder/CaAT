import IMember, {IMemberConfig, ISchedule} from "../../src/member/iMember";
import MemberImpl from "../../src/member/memberImpl";
import CalendarAppMock from "../../src/calendar/calendarAppMock";
import {ICalendarEvent} from "../../src/calendar/ICalendarApp";
// @ts-ignore TS6059
import {generateDefaultCalendarEvents, generateDefaultCalendars} from "../generator";

function setUpMember(): IMember {
    const member: IMember = new MemberImpl('user@mail.com');
    const config: IMemberConfig = {
        everyMinutes: 15,
        ignore: new RegExp('(?!)'),
        startDate: new Date('2020-01-01T00:00:00'),
        endDate: new Date('2020-01-02T00:00:00'),
        cutTimeRange: [],
    };
    member.config = config;
    member.calendarApp = new CalendarAppMock();
    return member
}

function sumSchedulesMinutes(schedules: Array<ISchedule>): number {
    return schedules.reduce((total: number, schedule: ISchedule) => {
        return total + schedule.assignMinute;
    }, 0);
}

describe('Class: MemberImpl', () => {
    let member: IMember;
    beforeEach(() => {
        member = setUpMember();
    });
    describe('Func: fetchSchedules', () => {
        describe('Args: event(AM00:00~AM01:00)', () => {
            test('Assert: sum time(=60minutes)', () => {
                // Arrange
                const calendarEvents: Array<ICalendarEvent> = generateDefaultCalendarEvents([{
                    start: new Date('2020-01-01T00:00:00'),
                    end: new Date('2020-01-01T01:00:00'),
                }]);
                member.calendarApp.calendars = generateDefaultCalendars(calendarEvents);

                // Act
                const schedules: Array<ISchedule> = member.fetchSchedules();
                const totalMinutes: number = sumSchedulesMinutes(schedules);

                // Assert
                expect(totalMinutes).toBe(60);
            })
        });
        describe('Args: event(AM00:00~AM01:00), event(AM01:00~AM02:00)', () => {
            test('Assert: sum time(=120minutes)', () => {
                // Arrange
                const calendarEvents: Array<ICalendarEvent> = generateDefaultCalendarEvents([{
                    start: new Date('2020-01-01T00:00:00'),
                    end: new Date('2020-01-01T01:00:00'),
                }, {
                    start: new Date('2020-01-01T01:00:00'),
                    end: new Date('2020-01-01T02:00:00'),
                },
                ]);
                member.calendarApp.calendars = generateDefaultCalendars(calendarEvents);

                // Act
                const schedules: Array<ISchedule> = member.fetchSchedules();
                const totalMinutes: number = sumSchedulesMinutes(schedules);

                // Assert
                expect(totalMinutes).toBe(120);
            });
        });
        describe('Args: event(AM00:00~AM01:00), event(AM00:30~AM01:30)', () => {
            test('Assert: sum time(=90minutes)', () => {
                // Arrange
                const calendarEvents: Array<ICalendarEvent> = generateDefaultCalendarEvents([{
                    start: new Date('2020-01-01T00:00:00'),
                    end: new Date('2020-01-01T01:00:00'),
                }, {
                    start: new Date('2020-01-01T00:30:00'),
                    end: new Date('2020-01-01T01:30:00'),
                },
                ]);
                member.calendarApp.calendars = generateDefaultCalendars(calendarEvents);

                // Act
                const schedules: Array<ISchedule> = member.fetchSchedules();
                const totalMinutes: number = sumSchedulesMinutes(schedules);

                // Assert
                expect(totalMinutes).toBe(90);
            });
        });
        describe('Args: event(AM00:00~AM01:00), event(AM00:15~AM00:45)', () => {
            test('Assert: sum time(=60minutes)', () => {
                // Arrange
                const calendarEvents: Array<ICalendarEvent> = generateDefaultCalendarEvents([{
                    start: new Date('2020-01-01T00:00:00'),
                    end: new Date('2020-01-01T01:00:00'),
                }, {
                    start: new Date('2020-01-01T00:15:00'),
                    end: new Date('2020-01-01T00:45:00'),
                },
                ]);
                member.calendarApp.calendars = generateDefaultCalendars(calendarEvents);

                // Act
                const schedules: Array<ISchedule> = member.fetchSchedules();
                const totalMinutes: number = sumSchedulesMinutes(schedules);

                // Assert
                expect(totalMinutes).toBe(60);
            });
        });
        describe('Args: no event', () => {
            test('Assert: sum time(=0minutes)', () => {
                // Arrange
                const calendarEvents: Array<ICalendarEvent> = generateDefaultCalendarEvents([]);
                member.calendarApp.calendars = generateDefaultCalendars(calendarEvents);

                // Act
                const schedules: Array<ISchedule> = member.fetchSchedules();
                const totalMinutes: number = sumSchedulesMinutes(schedules);

                // Assert
                expect(totalMinutes).toBe(0);
            });
        });
        describe('Args: not attend events', () => {
            test('Assert: sum time(=0minutes)', () => {
                // Arrange
                const calendarEvents: Array<ICalendarEvent> = generateDefaultCalendarEvents([{
                    start: new Date('2020-01-01T00:00:00'),
                    end: new Date('2020-01-01T01:00:00'),
                }]);
                calendarEvents[0].myStatus = 'NO';
                member.calendarApp.calendars = generateDefaultCalendars(calendarEvents);

                // Act
                const schedules: Array<ISchedule> = member.fetchSchedules();
                const totalMinutes: number = sumSchedulesMinutes(schedules);

                // Assert
                expect(totalMinutes).toBe(0);
            });
        });
        describe('Args: ignore event', () => {
            test('Assert: sum time(=0minutes)', () => {
                // Arrange
                const calendarEvents: Array<ICalendarEvent> = generateDefaultCalendarEvents([{
                    start: new Date('2020-01-01T00:00:00'),
                    end: new Date('2020-01-01T01:00:00'),
                }]);
                member.calendarApp.calendars = generateDefaultCalendars(calendarEvents);
                member.config.ignore = new RegExp('.+');

                // Act
                const schedules: Array<ISchedule> = member.fetchSchedules();
                const totalMinutes: number = sumSchedulesMinutes(schedules);

                // Assert
                expect(totalMinutes).toBe(0);
            });
        });
        describe('Args: event(AM00:00~AM02:00) in cut time(AM00:00~AM01:00)', () => {
            test('Assert: sum time(=60minutes)', () => {
                // Arrange
                const calendarEvents: Array<ICalendarEvent> = generateDefaultCalendarEvents([{
                    start: new Date('2020-01-01T00:00:00'),
                    end: new Date('2020-01-01T02:00:00'),
                }]);
                member.calendarApp.calendars = generateDefaultCalendars(calendarEvents);
                member.config.cutTimeRange = [
                    {from: new Date('2020-01-01T00:00:00'), to: new Date('2020-01-01T01:00:00')}
                ];

                // Act
                const schedules: Array<ISchedule> = member.fetchSchedules();
                const totalMinutes: number = sumSchedulesMinutes(schedules);

                // Assert
                expect(totalMinutes).toBe(60);
            });
        });
        describe('Args: All-day event', () => {
            test('Assert: sum time(=0minutes)', () => {
                // Arrange
                const calendarEvents: Array<ICalendarEvent> = generateDefaultCalendarEvents([{
                    start: new Date('2020-01-01T00:00:00'),
                    end: new Date('2020-01-02T00:00:00'),
                    allDay: true,
                }]);
                member.calendarApp.calendars = generateDefaultCalendars(calendarEvents);

                // Act
                const schedules: Array<ISchedule> = member.fetchSchedules();
                const totalMinutes: number = sumSchedulesMinutes(schedules);

                // Assert
                expect(totalMinutes).toBe(0);
            });
        });
        describe('Args: event(AM00:00~AM00:01)', () => {
            test('Assert: sum time(=1minutes)', () => {
                // Arrange
                const calendarEvents: Array<ICalendarEvent> = generateDefaultCalendarEvents([{
                    start: new Date('2020-01-01T00:00:00'),
                    end: new Date('2020-01-01T00:01:00'),
                }]);
                member.calendarApp.calendars = generateDefaultCalendars(calendarEvents);
                member.config.everyMinutes = 1;

                // Act
                const schedules: Array<ISchedule> = member.fetchSchedules();
                const totalMinutes: number = sumSchedulesMinutes(schedules);

                // Assert
                expect(totalMinutes).toBe(1);
            });
        });
        describe('Args: event(AM00:00~AM01:00), event(AM00:30~AM01:30), event(AM01:00~AM02:00) in cut time(AM00:00~AM01:00)', () => {
            test('Assert: sum time(=60minutes)', () => {
                // Arrange
                const calendarEvents: Array<ICalendarEvent> = generateDefaultCalendarEvents([{
                    start: new Date('2020-01-01T00:00:00'),
                    end: new Date('2020-01-01T01:00:00'),
                },{
                    start: new Date('2020-01-01T00:30:00'),
                    end: new Date('2020-01-01T01:30:00'),
                },{
                    start: new Date('2020-01-01T01:00:00'),
                    end: new Date('2020-01-01T02:00:00'),
                }]);
                member.calendarApp.calendars = generateDefaultCalendars(calendarEvents);
                member.config.cutTimeRange = [
                    {from: new Date('2020-01-01T00:00:00'), to: new Date('2020-01-01T01:00:00')}
                ];

                // Act
                const schedules: Array<ISchedule> = member.fetchSchedules();
                const totalMinutes: number = sumSchedulesMinutes(schedules);

                // Assert
                expect(totalMinutes).toBe(60);
            });
        });
    });
});