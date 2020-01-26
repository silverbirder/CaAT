import {copyDate} from "../../src/utils/dateUtils";

describe('copyDate', (): void => {
    test('not change the original date', (): void => {
        const now: Date = new Date();
        const copy: Date = copyDate(now);
        now.setTime(now.getTime() + 1);
        expect(now).not.toBe(copy);
    });
});