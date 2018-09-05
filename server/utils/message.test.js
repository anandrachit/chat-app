let expect = require('expect');

let {generateMessage,generateLocationMessage} = require('./message');

describe('Generate Message', () => {
    it('should generate the correct message object', () => {
        let from = 'Rachit';
        let text = 'Hey there!';
        let response = generateMessage(from, text);

        expect(typeof response.createdAt).toBe('number');
        expect(response).toMatchObject({from, text});

    })
})

describe('Generate location message', () => {
    it('should generate correct location object', () => {
        let from = 'Rachit';
        let latitude = 1;
        let longitude = 2;
        let expectedURL = `https://www.google.com/maps?q=${latitude},${longitude}`;
        let response = generateLocationMessage(from, latitude, longitude);

        expect(typeof response.createdAt).toBe('number');
        expect(response.url).toBe(expectedURL);
        expect(response.from).toBe(from);
    })
})