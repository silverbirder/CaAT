import IGroup, {IHoliday} from "../../src/group/iGroup";
import GroupImpl from "../../src/group/groupImpl";
import CalendarAppMock from "../../src/calendar/calendarAppMock";
import {ICalendarEvent} from "../../src/calendar/ICalendarApp";
// @ts-ignore TS6059
import {generateDefaultCalendarEvents, generateDefaultCalendars} from "../generator";

function setUpGroup(): IGroup {
    const group: IGroup = new GroupImpl('group@mail.com');
    group.config.startDate = new Date('2020-01-01T00:00:00');
    group.config.endDate = new Date('2020-01-07T23:59:59');
    group.config.holidayWords.all = new RegExp('holiday');
    group.config.holidayWords.morning = new RegExp('morning');
    group.config.holidayWords.afternoon = new RegExp('afternoon');
    group.config.members = [
        {
            name: 'bob',
            match: new RegExp('bob')
        },
        {
            name: 'alice',
            match: new RegExp('alice')
        },
    ];
    group.calendarApp = new CalendarAppMock();
    return group
}

declare global {
    interface Date {
        toCustomDateString(): string;
    }
}

Date.prototype.toCustomDateString = function (): string {
    const yyyy: string = ('000' + this.getFullYear()).slice(-4);
    const mm: string = ('0' + this.getMonth() + 1).slice(-2);
    const dd: string = ('0' + this.getDate()).slice(-2);
    return `${yyyy}-${mm}-${dd}`;
};

describe('Class: GroupImpl', () => {
    describe('Func: fetchHolidays', () => {
        let group: IGroup;
        beforeEach(() => {
            group = setUpGroup();
        });
        describe('Args: event(bob is outing) from 13:00 to 15:00', () => {
            test('Assert: not holiday', () => {
                // Arrange
                const calendarEvents: Array<ICalendarEvent> = generateDefaultCalendarEvents([{
                    start: new Date('2020-01-01T13:00:00'),
                    end: new Date('2020-01-01T15:00:00'),
                    allDay: false,
                    title: 'bob is outing',
                }]);
                group.calendarApp.calendars = generateDefaultCalendars(calendarEvents);

                // Act
                const holidays: Array<IHoliday> = group.fetchHolidays();

                // Assert
                expect(holidays).toHaveLength(0);
            });
        });
        describe('Args: event(bob is outing) in 2020-01-01', () => {
            test('Assert: not holiday', () => {
                // Arrange
                const calendarEvents: Array<ICalendarEvent> = generateDefaultCalendarEvents([{
                    start: new Date('2020-01-01T00:00:00'),
                    end: new Date('2020-01-02T00:00:00'),
                    allDay: true,
                    title: 'bob is outing',
                }]);
                group.calendarApp.calendars = generateDefaultCalendars(calendarEvents);

                // Act
                const holidays: Array<IHoliday> = group.fetchHolidays();

                // Assert
                expect(holidays).toHaveLength(0);
            });
        });
        describe('Args: event("holiday bob") in 2020-01-01', () => {
            test('Assert: In 2020-01-01, bob is holiday', () => {
                // Arrange
                const calendarEvents: Array<ICalendarEvent> = generateDefaultCalendarEvents([{
                    start: new Date('2020-01-01T00:00:00'),
                    end: new Date('2020-01-02T00:00:00'),
                    allDay: true,
                    title: 'holiday bob',
                }]);
                group.calendarApp.calendars = generateDefaultCalendars(calendarEvents);

                // Act
                const holiday: IHoliday = group.fetchHolidays()[0];

                // Assert
                expect(holiday.inMember).toContain('bob');
                expect(holiday.toDate.toCustomDateString()).toBe('2020-01-01');
            });
        });
        describe('Args: event("holiday bob")', () => {
            test('Assert: bob is all-day holiday', () => {
                // Arrange
                const calendarEvents: Array<ICalendarEvent> = generateDefaultCalendarEvents([{
                    start: new Date('2020-01-01T00:00:00'),
                    end: new Date('2020-01-02T00:00:00'),
                    allDay: true,
                    title: 'holiday bob',
                }]);
                group.calendarApp.calendars = generateDefaultCalendars(calendarEvents);

                // Act
                const holiday: IHoliday = group.fetchHolidays()[0];

                // Assert
                expect(holiday.all).toBeTruthy();
                expect(holiday.morning).toBeFalsy();
                expect(holiday.afternoon).toBeFalsy();
            });
        });
        describe('Args: event("morning holiday bob")', () => {
            test('Assert: bob is morning holiday', () => {
                // Arrange
                const calendarEvents: Array<ICalendarEvent> = generateDefaultCalendarEvents([{
                    start: new Date('2020-01-01T00:00:00'),
                    end: new Date('2020-01-02T00:00:00'),
                    allDay: true,
                    title: 'morning holiday bob',
                }]);
                group.calendarApp.calendars = generateDefaultCalendars(calendarEvents);

                // Act
                const holiday: IHoliday = group.fetchHolidays()[0];

                // Assert
                expect(holiday.all).toBeFalsy();
                expect(holiday.morning).toBeTruthy();
                expect(holiday.afternoon).toBeFalsy();
            });
        });
        describe('Args: event("afternoon holiday bob")', () => {
            test('Assert: bob is afternoon holiday', () => {
                // Arrange
                const calendarEvents: Array<ICalendarEvent> = generateDefaultCalendarEvents([{
                    start: new Date('2020-01-01T00:00:00'),
                    end: new Date('2020-01-02T00:00:00'),
                    allDay: true,
                    title: 'afternoon holiday bob',
                }]);
                group.calendarApp.calendars = generateDefaultCalendars(calendarEvents);

                // Act
                const holiday: IHoliday = group.fetchHolidays()[0];

                // Assert
                expect(holiday.all).toBeFalsy();
                expect(holiday.morning).toBeFalsy();
                expect(holiday.afternoon).toBeTruthy();
            });
        });
        describe('Args: event("holiday bob") from 2020-01-01 to 2020-01-02', () => {
            test('Assert: From 2020-01-01 to 2020-01-02, bob is holiday', () => {
                // Arrange
                const calendarEvents: Array<ICalendarEvent> = generateDefaultCalendarEvents([{
                    start: new Date('2020-01-01T00:00:00'),
                    end: new Date('2020-01-03T00:00:00'),
                    allDay: true,
                    title: 'holiday bob',
                }]);
                group.calendarApp.calendars = generateDefaultCalendars(calendarEvents);

                // Act
                const holidays: Array<IHoliday> = group.fetchHolidays();
                const firstHoliday: IHoliday = holidays[0];
                const secondHoliday: IHoliday = holidays[1];

                // Assert
                expect(firstHoliday.inMember).toContain('bob');
                expect(firstHoliday.toDate.toCustomDateString()).toBe('2020-01-01');
                expect(secondHoliday.inMember).toContain('bob');
                expect(secondHoliday.toDate.toCustomDateString()).toBe('2020-01-02');
            })
        });
        describe('Args: event("holiday bob") from 2020-01-01 to 2020-02-01', () => {
            test('Assert: From 2020-01-01 to 2020-01-07, bob is holiday', () => {
                // Arrange
                const calendarEvents: Array<ICalendarEvent> = generateDefaultCalendarEvents([{
                    start: new Date('2020-01-01T00:00:00'),
                    end: new Date('2020-02-02T00:00:00'),
                    allDay: true,
                    title: 'holiday bob',
                }]);
                group.calendarApp.calendars = generateDefaultCalendars(calendarEvents);

                // Act
                const holidays: Array<IHoliday> = group.fetchHolidays();
                const firstHoliday: IHoliday = holidays[0];
                const lastHoliday: IHoliday = holidays[6];

                // Assert
                expect(firstHoliday.inMember).toContain('bob');
                expect(firstHoliday.toDate.toCustomDateString()).toBe('2020-01-01');
                expect(lastHoliday.inMember).toContain('bob');
                expect(lastHoliday.toDate.toCustomDateString()).toBe('2020-01-07');
            })
        });
        describe('Args: event("holiday bob alice") in 2020-01-01', () => {
            test('Assert: In 2020-01-01, bob and alice is holiday', () => {
                // Arrange
                const calendarEvents: Array<ICalendarEvent> = generateDefaultCalendarEvents([{
                    start: new Date('2020-01-01T00:00:00'),
                    end: new Date('2020-01-02T00:00:00'),
                    allDay: true,
                    title: 'holiday bob alice',
                }]);
                group.calendarApp.calendars = generateDefaultCalendars(calendarEvents);

                // Act
                const holiday: IHoliday = group.fetchHolidays()[0];

                // Assert
                expect(holiday.inMember).toContain('bob');
                expect(holiday.inMember).toContain('bob');
                expect(holiday.toDate.toCustomDateString()).toBe('2020-01-01');
            })
        });
        describe('Args: event("holiday bob") in 2020-01-01, event("holiday alice") in 2020-01-04', () => {
            test('Assert: In 2020-01-01, bob is holiday. In 2020-01-04, alice is holiday', () => {
                // Arrange
                const calendarEvents: Array<ICalendarEvent> = generateDefaultCalendarEvents([{
                        start: new Date('2020-01-01T00:00:00'),
                        end: new Date('2020-01-02T00:00:00'),
                        allDay: true,
                        title: 'holiday bob',
                    },
                    {
                        start: new Date('2020-01-04T00:00:00'),
                        end: new Date('2020-01-05T00:00:00'),
                        allDay: true,
                        title: 'holiday alice',
                    },
                ]);
                group.calendarApp.calendars = generateDefaultCalendars(calendarEvents);

                // Act
                const holidays: Array<IHoliday> = group.fetchHolidays();
                const firstHoliday: IHoliday = holidays[0];
                const secondHoliday: IHoliday = holidays[1];

                // Assert
                expect(firstHoliday.inMember).toContain('bob');
                expect(firstHoliday.toDate.toCustomDateString()).toBe('2020-01-01');
                expect(secondHoliday.inMember).toContain('alice');
                expect(secondHoliday.toDate.toCustomDateString()).toBe('2020-01-04');
            })
        });
    });
});