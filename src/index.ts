import MemberImpl from "./member/memberImpl";
import GroupImpl from "./group/groupImpl";

declare const global: {
    [x: string]: any;
};

global.Group = GroupImpl;
global.Member = MemberImpl;