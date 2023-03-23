import { calculateAQI } from './aqiCalculator';

describe('calculateAQI', () => {
    test('should return AQI value for input value within range', () => {
        expect(calculateAQI(5)).toBe(21);
        expect(calculateAQI(20)).toBe(68);
        expect(calculateAQI(45)).toBe(124);
        expect(calculateAQI(100)).toBe(174);
        expect(calculateAQI(200)).toBe(250);
        expect(calculateAQI(300)).toBe(350);
        expect(calculateAQI(400)).toBe(434);
    });

    test('should return "N/A" for input value outside range', () => {
        expect(calculateAQI(-1)).toBe("N/A");
        expect(calculateAQI(501)).toBe("N/A");
    });
});