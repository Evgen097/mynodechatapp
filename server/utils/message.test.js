var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
    it('should generate correct message object', ()=>{
        var from = 'Jen';
        var text = 'some message';
        var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});

    });
});

describe('generateLocationMessage', ()=>{
    it('should generate correct Location object', ()=>{
        var from = "Evgen"
        var latitude = '49.9314569';
        var longitude = '36.3883734';
        var url =`https://www.google.com/maps?q=${latitude},${longitude}`;
        var locationMessage = generateLocationMessage(from, latitude, longitude);
        expect(locationMessage).toInclude({from, url});

        expect(locationMessage.createdAt).toBeA('number');

    });
});

// var generateLocationMessage = (from, latitude, longitude) =>{
//     return{
//         from,
//         url: `https://www.google.com/maps?q=${latitude},${longitude}`,
//         createdAt: new Date().getTime()
//     }
// };











