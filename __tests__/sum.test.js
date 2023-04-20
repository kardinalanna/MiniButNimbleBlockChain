const Node = require('../models/Node')
const Block = require('../models/Block')

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

let prevData = null


for (let i = 0; i < 10; i++) {

    let index = randomInteger(0, 1000)
    let prevHash = 'qwertyuio';
    let nodeId = randomInteger(0, 2)

    let testBlock = new Block(index, prevHash, nodeId)

    

    test('block is not null', () => {
        expect(testBlock).not.toBe(null);
    });

    test(`Block's fields are not null`, () => {

        expect(testBlock.index).not.toBe(null);
        expect(testBlock.prevHash).not.toBe(null);
        expect(testBlock.nodeId).not.toBe(null);
        expect(testBlock.data).not.toBe(null);
        expect(testBlock.nonce).not.toBe(null);
        expect(testBlock.difficult).not.toBe(null);

    });

    test(`Test new block`, () => {

        expect(testBlock.index).toBe(index);
        expect(testBlock.prevHash).toBe(prevHash);
        expect(testBlock.nodeId).toBe(nodeId);

    });

    test(`Test mine`, () => {
        
        testBlock.mine()

        expect(typeof testBlock.curHash).toBe('string');
        expect(testBlock.curHash.substr(testBlock.curHash.length - 4)).toBe('0000');
        expect(testBlock.prevHash).toBe('qwertyuio');

    });

    test(`Test random data`, () => {

        expect(typeof testBlock.data).toBe('string');
        expect(testBlock.data.length).toBe(prevData.length);

    });

    prevData = testBlock.data

}
