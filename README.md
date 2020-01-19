# CaAT
CaAT is the tools that Calculate the Assigned Time.

![sample](https://res.cloudinary.com/silverbirder/image/upload/v1579416110/CaAT/sample.png)


```
// sampleMember.js
    const member = new CaAT.MemberImpl('testUser@gmail.com');
    member.ignore = new RegExp('Concentration', 'i');
    member.everyMinutes = 15;
    member.cutTimeRange = [{from: new Date('2020-01-18T12:00'), to: new Date('2020-01-18T13:00')}];
    member.startDate = new Date('2020-01-20T09:00:00');
    member.endDate = new Date('2020-01-24T18:00:00');
    const schedules  = member.fetchSchedules();

/*
 schedules:
[
  {
    "allDay": false,
    "assignMinute": 30.0,
    "cut": false,
    "originalAssignMinute": 30.0,
    "start": "Mon Jan 20 09:00:00 GMT+09:00 2020",
    "ignore": false,
    "description": "",
    "end": "Mon Jan 20 09:30:00 GMT+09:00 2020",
    "title": " Morning MTG",
    "status": "OWNER"
  },
  {
    "allDay": false,
    "assignMinute": 60.0,
    "cut": false,
    "originalAssignMinute": 60.0,
    "start": "Mon Jan 20 12:00:00 GMT+09:00 2020",
    "ignore": false,
    "description": "",
    "end": "Mon Jan 20 13:00:00 GMT+09:00 2020",
    "title": "Lunch",
    "status": "OWNER"
  },
  {
    "allDay": false,
    "assignMinute": 30.0,
    "cut": false,
    "originalAssignMinute": 30.0,
    "start": "Mon Jan 20 15:30:00 GMT+09:00 2020",
    "ignore": false,
    "description": "",
    "end": "Mon Jan 20 16:00:00 GMT+09:00 2020",
    "title": "Tech MTG",
    "status": "OWNER"
  },
  {
    "allDay": false,
    "assignMinute": 30.0,
    "cut": false,
    "originalAssignMinute": 30.0,
    "start": "Tue Jan 21 09:00:00 GMT+09:00 2020",
    "ignore": false,
    "description": "",
    "end": "Tue Jan 21 09:30:00 GMT+09:00 2020",
    "title": " Morning MTG",
    "status": "OWNER"
  },
  {
    "allDay": false,
    "assignMinute": 0,
    "cut": false,
    "originalAssignMinute": 60.0,
    "start": "Tue Jan 21 10:00:00 GMT+09:00 2020",
    "ignore": true,
    "description": "",
    "end": "Tue Jan 21 11:00:00 GMT+09:00 2020",
    "title": " Concentration Time",
    "status": "OWNER"
  },
  {
    "allDay": false,
    "assignMinute": 60.0,
    "cut": false,
    "originalAssignMinute": 60.0,
    "start": "Tue Jan 21 12:00:00 GMT+09:00 2020",
    "ignore": false,
    "description": "",
    "end": "Tue Jan 21 13:00:00 GMT+09:00 2020",
    "title": "Lunch",
    "status": "OWNER"
  },
  {
    "allDay": false,
    "assignMinute": 30.0,
    "cut": false,
    "originalAssignMinute": 30.0,
    "start": "Wed Jan 22 09:00:00 GMT+09:00 2020",
    "ignore": false,
    "description": "",
    "end": "Wed Jan 22 09:30:00 GMT+09:00 2020",
    "title": " Morning MTG",
    "status": "OWNER"
  },
  {
    "allDay": false,
    "assignMinute": 60.0,
    "cut": false,
    "originalAssignMinute": 60.0,
    "start": "Wed Jan 22 12:00:00 GMT+09:00 2020",
    "ignore": false,
    "description": "",
    "end": "Wed Jan 22 13:00:00 GMT+09:00 2020",
    "title": "Lunch",
    "status": "OWNER"
  },
  {
    "allDay": false,
    "assignMinute": 30.0,
    "cut": false,
    "originalAssignMinute": 30.0,
    "start": "Wed Jan 22 14:30:00 GMT+09:00 2020",
    "ignore": false,
    "description": "",
    "end": "Wed Jan 22 15:00:00 GMT+09:00 2020",
    "title": "Tech MTG",
    "status": "OWNER"
  },
  {
    "allDay": true,
    "assignMinute": 0,
    "cut": false,
    "originalAssignMinute": 1440.0,
    "start": "Thu Jan 23 00:00:00 GMT+09:00 2020",
    "ignore": false,
    "description": "",
    "end": "Fri Jan 24 00:00:00 GMT+09:00 2020",
    "title": "Morning Break  Bob",
    "status": "OWNER"
  },
  {
    "allDay": false,
    "assignMinute": 30.0,
    "cut": false,
    "originalAssignMinute": 30.0,
    "start": "Thu Jan 23 09:00:00 GMT+09:00 2020",
    "ignore": false,
    "description": "",
    "end": "Thu Jan 23 09:30:00 GMT+09:00 2020",
    "title": " Morning MTG",
    "status": "OWNER"
  },
  {
    "allDay": false,
    "assignMinute": 60.0,
    "cut": false,
    "originalAssignMinute": 60.0,
    "start": "Thu Jan 23 12:00:00 GMT+09:00 2020",
    "ignore": false,
    "description": "",
    "end": "Thu Jan 23 13:00:00 GMT+09:00 2020",
    "title": "Lunch",
    "status": "OWNER"
  },
  {
    "allDay": false,
    "assignMinute": 30.0,
    "cut": false,
    "originalAssignMinute": 30.0,
    "start": "Fri Jan 24 09:00:00 GMT+09:00 2020",
    "ignore": false,
    "description": "",
    "end": "Fri Jan 24 09:30:00 GMT+09:00 2020",
    "title": " Morning MTG",
    "status": "OWNER"
  },
  {
    "allDay": false,
    "assignMinute": 60.0,
    "cut": false,
    "originalAssignMinute": 60.0,
    "start": "Fri Jan 24 12:00:00 GMT+09:00 2020",
    "ignore": false,
    "description": "",
    "end": "Fri Jan 24 13:00:00 GMT+09:00 2020",
    "title": "Lunch",
    "status": "OWNER"
  },
  {
    "allDay": false,
    "assignMinute": 0,
    "cut": false,
    "originalAssignMinute": 30.0,
    "start": "Fri Jan 24 13:30:00 GMT+09:00 2020",
    "ignore": false,
    "description": "",
    "end": "Fri Jan 24 14:00:00 GMT+09:00 2020",
    "title": "SEO MTG",
    "status": "NO"
  },
  {
    "allDay": false,
    "assignMinute": 120.0,
    "cut": false,
    "originalAssignMinute": 120.0,
    "start": "Fri Jan 24 14:00:00 GMT+09:00 2020",
    "ignore": false,
    "description": "",
    "end": "Fri Jan 24 16:00:00 GMT+09:00 2020",
    "title": "Planning",
    "status": "OWNER"
  }
]
*/
```

```
function sampleGroup() {
    const group = new CaAT.GroupImpl('testUser@gmail.com');
    group.holidayWords.all = new RegExp('holiday', 'i');
    group.holidayWords.morning = new RegExp('morning', 'i');
    group.holidayWords.afternoon = new RegExp('afternoon', 'i');
    const members = [
        {
            name: 'alice@gmail.com',
            match: new RegExp('alice', 'i')
        },
         {
            name: 'bob@gmail.com',
            match: new RegExp('bob', 'i')
        }
    ];
    group.members = members;
    group.startDate = new Date('2020-01-20T00:00:00');
    group.endDate = new Date('2020-01-24T23:59:59');
    const holidays = group.fetchHolidays();
/*
holidays:
[
  {
    "all": true,
    "member": [
      "alice@gmail.com",
      "bob@gmail.com"
    ],
    "am": false,
    "title": "Holiday Alice Bob",
    "pm": false,
    "day": "Tue Jan 21 00:00:00 GMT+ 09:00 2020"
  },
  {
    "all": false,
    "member": [
      "bob@gmail.com"
    ],
    "am": true,
    "title": "Morning Break Bob",
    "pm": false,
    "day": "Thu Jan 23 00:00:00 GMT+ 09:00 2020"
  }
]
*/
}
```
Below is the API ID of Google Apps Script Library.
```
M789zIcys5BnW_gD7nRpmM3WuXGFJZPSs
```
