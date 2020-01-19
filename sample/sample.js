function sampleMember() {
    const member = new MemberImpl('your_account@gmail.com');
    member.ignore = new RegExp('not working', 'i');
    member.everyMinutes = 15;
    member.cutTimeRange = [{from: new Date('2020-01-18T12:00'), to: new Date('2020-01-18T13:00')}];
    member.startDate = new Date('2020-01-18T00:00:00');
    member.endDate = new Date('2020-01-18T23:59:59');
    const schedules  = member.fetchSchedules();
}

function sampleGroup() {
    const group = new GroupImpl('group_that_on_belong_you@gmail.com');
    group.holidayWords.all = new RegExp('holiday', 'i');
    group.holidayWords.morning = new RegExp('AM', 'i');
    group.holidayWords.afternoon = new RegExp('PM', 'i');
    const members = [
        {
            name: 'your_account@gmail.com',
            match: new RegExp('you', 'i')
        }
    ];
    group.members = members;
    group.startDate = new Date('2020-01-18T00:00:00');
    group.endDate = new Date('2020-01-18T23:59:59');
    const holidays = group.fetchHolidays();
}