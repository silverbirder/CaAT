# CaAT
CaAT is the Google Apps Script Library that Calculate the Assigned Time.

![sample](https://res.cloudinary.com/silverbirder/image/upload/v1579416110/CaAT/sample.png)

This Calendar's Assign Time is 3 hours, excluding Lunch ,Morning MTG, and Concentration.  
And Bob has a morning break on the 23rd.

# Use By Google Apps Script

1. Access the Your [Google Apps Script](https://script.google.com).
1. Add the this library. (CaAT)
   1. API ID is  **M789zIcys5BnW_gD7nRpmM3WuXGFJZPSs** 
1. Use as below.

```
// sampleMember.gs
function getMemberSchedules() {
    const member = new CaAT.MemberImpl('bob@gmail.com');
    member.ignore = new RegExp('Concentration Time|Morning MTG', 'i');
    member.everyMinutes = 15;
    member.cutTimeRange = [
      // Lunch
      {from: new Date('2020-01-20T12:00'), to: new Date('2020-01-20T13:00')},
      {from: new Date('2020-01-21T12:00'), to: new Date('2020-01-21T13:00')},
      {from: new Date('2020-01-22T12:00'), to: new Date('2020-01-22T13:00')},
      {from: new Date('2020-01-23T12:00'), to: new Date('2020-01-23T13:00')},
      {from: new Date('2020-01-24T12:00'), to: new Date('2020-01-24T13:00')},
      // Morning MTG
      {from: new Date('2020-01-20T09:00'), to: new Date('2020-01-20T09:30')},
      {from: new Date('2020-01-21T09:00'), to: new Date('2020-01-21T09:30')},
      {from: new Date('2020-01-22T09:00'), to: new Date('2020-01-22T09:30')},
      {from: new Date('2020-01-23T09:00'), to: new Date('2020-01-23T09:30')},
      {from: new Date('2020-01-24T09:00'), to: new Date('2020-01-24T09:30')},
    ];
    member.startDate = new Date('2020-01-20T09:00:00');
    member.endDate = new Date('2020-01-24T18:00:00');
    const schedules  = member.fetchSchedules();
    // => total "assignMinute" is 180 minutes (=3h).
}
```

```
// sampleGroup.gs
function getMemberSchedules() {
    const group = new CaAT.GroupImpl('bob@gmail.com');
    group.holidayWords.all = new RegExp('holiday', 'i');
    group.holidayWords.morning = new RegExp('morning', 'i');
    group.holidayWords.afternoon = new RegExp('afternoon', 'i');
    const members = [
         {
            name: 'bob@gmail.com',
            match: new RegExp('bob', 'i')
        }
    ];
    group.members = members;
    group.startDate = new Date('2020-01-20T00:00:00');
    group.endDate = new Date('2020-01-24T23:59:59');
    const holidays = group.fetchHolidays();
    // => Bob has a morning break on the 23rd.
}
```

# Motivation
I wanted to know the assigned time from Google Calendar for scheduling when planning the next week. I could not find such a similar library. So, I made this.

# Use By TypeScript

This library is published by npm.

```
$ npm install @silverbirder/caat
```

# Other
@me: [twitter](https://twitter.com/silver_birder)  
Please contact @me if you have anything.