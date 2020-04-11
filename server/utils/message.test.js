let expect = require('expect');
let {generateMessage} = require('./message');

describe('Generate Message', ()=>{
    it("deberia generar mensaje de manera correcta", () =>{
        let from = "Brandon",
            text = "Random text",
            message = generateMessage(from, text);
            
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    })
});