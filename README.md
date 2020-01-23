# CaAT
CaAT is the Google Apps Script Library that Calculate the Assigned Time in Google Calendar.

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
    const id = 'bob@gmail.com';
    let config = {};
    config.ignore = new RegExp('Concentration', 'i');
    config.everyMinutes = 15;
    config.cutTimeRange = [
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
    config.startDate = new Date('2020-01-20T09:00:00');
    config.endDate = new Date('2020-01-24T18:00:00');
    const member = new CaAT.MemberImpl(id, config);
    const schedules  = member.fetchSchedules();
    // => total "assignMinute" is 180 minutes (=3h).
}
```

```
// sampleGroup.gs
function getMemberSchedules() {
    const id = 'bob@gmail.com';
    let holidayWords = {}
    holidayWords.all = new RegExp('holiday', 'i');
    holidayWords.morning = new RegExp('morning', 'i');
    holidayWords.afternoon = new RegExp('afternoon', 'i');
    const members = [
         {
            name: 'bob@gmail.com',
            match: new RegExp('bob', 'i')
        }
    ];
    let config  = {};
    config.startDate = new Date('2020-01-20T00:00:00');
    config.endDate = new Date('2020-01-24T23:59:59');
    config.members = members;
    config.holidayWords = holidayWords;
    const group = new CaAT.GroupImpl(id, config);
    const holidays = group.fetchHolidays();
    /*
    {
      "member": [
        "bob@gmail.com"
      ],
      "day": "Thu Jan 23 00:00:00 GMT+ 09:00 2020"
      "title": "Morning Break Bob",
      "am": true,
      "pm": false,
      "all": false,
    } */
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
