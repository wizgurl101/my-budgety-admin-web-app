import { jest } from "@jest/globals";
import { getMonthFirstDay, getMonthLastDay } from "@/utils/dateTime.utils";

describe('Datetime Utils Tests ', () => {
    beforeAll(() => {
        jest.setSystemTime(new Date('2025-01-15T00:00:00Z'));
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('Get Month First Day should return the first day of the current month in the format YYYY-MM-DD', () => {
        const result = getMonthFirstDay(new Date());
        expect(result).toBe('2025-01-01');
    });

    it('Get Month last Day should return the last day of the current month in the format YYYY-MM-DD', () => {
        const result = getMonthLastDay(new Date());
        expect(result).toBe('2025-01-31');
    });
});