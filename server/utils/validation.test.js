const expect = require('expect');
const {isRealString} = require('./validation');

describe('Validation tests', () => {
    it('Should reject non string values', () => {
        let input = 2;
        let result = isRealString(input);
        expect(result).toBe(false);
    });

    it('Should reject string with only spaces', () => {
        let input = '     ';
        let result = isRealString(input);
        expect(result).toBe(false);
    });

    it('Should allow strings with non space characters', () => {
        let input = 'Rachit Anand';
        let result = isRealString(input);
        expect(result).toBe(true);
    });
})