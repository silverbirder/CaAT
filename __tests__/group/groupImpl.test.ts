import IGroup, {IHoliday} from "../../src/group/iGroup";
import GroupImpl from "../../src/group/groupImpl";
import CalendarAppMock from "../../src/calendar/calendarAppMock";
import {ICalendarEvent} from "../../src/calendar/ICalendarApp";
// @ts-ignore TS6059
import {generateDefaultCalendarEvents, generateDefaultCalendars} from "../generator";

function setUpGroup(): IGroup {
    const group: IGroup = new GroupImpl('group@mail.com');
    group.config.startDate = new Date('2020-01-01T00:00:00');
    group.config.endDate = new Date('2020-01-02T00:00:00');
    group.config.holidayWords.all = new RegExp('holiday');
    group.config.holidayWords.morning = new RegExp('AM');
    group.config.holidayWords.afternoon = new RegExp('PM');
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

describe('Class: GroupImpl', () => {
    let group: IGroup;
    beforeEach(() => {
        group = setUpGroup();
    });
    describe('Func: fetchHolidays', () => {
        describe('Args: TBD', () => {
            test('Assert: TBD', () => {
                // Arrange
                const calendarEvents: Array<ICalendarEvent> = generateDefaultCalendarEvents([{
                    start: new Date('2020-01-01T00:00:00'),
                    end: new Date('2020-01-01T01:00:00'),
                    allDay: true,
                    title: 'holiday bob',
                }]);
                group.calendarApp.calendars = generateDefaultCalendars(calendarEvents);

                // Act
                const holidays: Array<IHoliday> = group.fetchHolidays();

                // Assert
                console.log(holidays);
            })
        });
    });
});