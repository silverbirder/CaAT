import MemberImpl from "./member/memberImpl";
import IMember from "./member/iMember";
import {ISchedule, IRange} from "./member/iMember";
import GroupImpl from "./group/groupImpl";
import IGroup from "./group/iGroup";
import {IHoliday, IHolidayWords, IGroupMember} from "./group/iGroup";

declare const global: {
    Group: any
    Member: any
};

global.Group = GroupImpl;
global.Member = MemberImpl;

export {
    MemberImpl,
    IMember,
    ISchedule,
    IRange,
    GroupImpl,
    IGroup,
    IHoliday,
    IHolidayWords,
    IGroupMember,
}