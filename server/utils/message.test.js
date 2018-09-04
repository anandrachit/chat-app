let expect = require('expect');

let {generateMessage} = require('./message');

describe('Generate Message', () => {
    it('should generate the correct message object', () => {
        let from = 'Rachit';
        let text = 'Hey there!';
        let response = generateMessage(from, text);

        expect(typeof response.createdAt).toBe('number');
        expect(response).toMatchObject({from, text});

    })
})
