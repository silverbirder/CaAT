import MemberImpl from "./member/memberImpl";
import IMember from "./member/iMember";
import {ISchedule, IRange, IMemberConfig} from "./member/iMember";
import GroupImpl from "./group/groupImpl";
import IGroup from "./group/iGroup";
import {IHoliday, IHolidayWords, IGroupMember, IGroupConfig} from "./group/iGroup";

declare const global: {
    Group: any
    Member: any
};

global.Group = GroupImpl;
global.Member = MemberImpl;

export {
    MemberImpl as Member,
    IMember,
    IMemberConfig,
    ISchedule,
    IRange,
    GroupImpl as Group,
    IGroup,
    IGroupConfig,
    IHoliday,
    IHolidayWords,
    IGroupMember,
}