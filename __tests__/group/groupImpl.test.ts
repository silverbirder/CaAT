import IGroup, {IHoliday} from "../../src/group/iGroup";
import GroupImpl from "../../src/group/groupImpl";
import CalendarAppMock from "../../src/calendar/calendarAppMock";
import {ICalendarEvent} from "../../src/calendar/ICalendarApp";
// @ts-ignore TS6059
import {generateDefaultCalendarEvents, generateDefaultCalendars} from "../generator";

function setUpGroup(): IGroup {
    const group: IGroup = new GroupImpl('user@gmail.com');
    group.config.startDate = new Date('2020-01-01T00:00:00');
    group.config.endDate = new Date('2020-01-02T00:00:00');
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