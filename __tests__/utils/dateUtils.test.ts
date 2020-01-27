import {copyDate} from "../../src/utils/dateUtils";

describe('Func: copyDate', (): void => {
    describe('Arg: date (2020-01-01)', (): void => {
        // Arrange
        const now: Date = new Date('2020-01-01');

        test('Return: date (2020-01-01)', (): void => {
            // Act
            const copy: Date = copyDate(now);

            // Assert
            expect(now).toStrictEqual(copy);
        });
        describe('Act: add copy date by one day', () => {
            test('Assert: not change arg value', (): void => {
                // Act
                const copy: Date = copyDate(now);
                copy.setDate(copy.getDate() + 1);

                // Assert
                expect(now).not.toStrictEqual(copy);
            });
        })
    })
});