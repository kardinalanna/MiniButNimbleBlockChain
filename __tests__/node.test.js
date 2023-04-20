const Node = require('../models/Node')
const Block = require('../models/Block')

function randomInteger(min, max) {
    const r = Math.random()*(max + 1-min) + min
    return Math.floor(r)
}



for (let i = 0; i < 10; i++) {

    let nodeId = randomInteger(0,2)
    let testNode = new Node(nodeId)

    test(`Node init`, () => {

        expect(testNode).not.toBe(null);
        expect(testNode.nodeId).toBe(nodeId);
        expect(testNode.lastBlockIndex).toBe(null);
        expect(testNode.blockList.length).toBe(0);

    });

    let firstBlock = testNode.createFirstBlock()

    test(`Create first block`, () => {

        expect(firstBlock.index).toBe(0);
        expect(firstBlock.prevHash).toBe('salamsalam');
        expect(firstBlock.nodeId).toBe(nodeId);
        expect(firstBlock.curHash.substr(firstBlock.curHash.length - 4)).toBe('0000');
        expect(firstBlock.data).not.toBe(null);
        expect(firstBlock.nonce).not.toBe(null);

    });
    

}

let nodeId = randomInteger(0,2)
let testNode = new Node(nodeId)

let firstBlock = testNode.createFirstBlock()

test(`Test blockRecieveHandler(first block)`, () => {

    expect(testNode.nodeId).toBe(nodeId);
    expect(testNode.lastBlockIndex).toBe(null);
    expect(testNode.blockList.length).toBe(0);

    testNode.blockRecieveHandler(firstBlock)

    expect(testNode.nodeId).toBe(nodeId);
    expect(testNode.lastBlockIndex).toBe(0);
    expect(testNode.blockList.length).toBe(1);

});

let nodeId2 = randomInteger(0,2)
let testNode2 = new Node(nodeId2)

for (let i = 0; i < 20; i++) {


    test(`Test blockRecieveHandler`, () => {

        let block_nodeId = randomInteger(0,2)
        let lastBlockIndex = randomInteger(1,100)
        let prevHash = 'yavshoke'
        
        let lastBlock = new Block(lastBlockIndex, prevHash, block_nodeId)
    
        testNode2.lastBlockIndex = lastBlockIndex

        expect(testNode2.blockRecieveHandler(lastBlock)).toBe(false);

        let blockListLength = testNode2.blockList.length

        let newRecievedBlock = new Block(randomInteger(1,100), 'salamchik', block_nodeId)

        if (newRecievedBlock.index > lastBlockIndex) {

            expect(testNode2.blockRecieveHandler(newRecievedBlock)).toBe(true);
            expect(testNode2.lastBlockIndex).toBe(newRecievedBlock.index);
            expect(testNode2.blockList.length).toBe(blockListLength + 1);

        } else {

            expect(testNode2.blockRecieveHandler(newRecievedBlock)).toBe(false);
            expect(testNode2.lastBlockIndex).toBe(lastBlockIndex);
            expect(testNode2.blockList.length).toBe(blockListLength);

        }

    
    });
    
}


test(`Test mine block`, () => {

    let lastBlockFromList = testNode2.blockList[testNode2.blockList.length - 1]
    let newBlock = testNode2.mineBlock()
    
    expect(newBlock).not.toBe(null);
    expect(newBlock instanceof Block).toBe(true);
    expect(lastBlockFromList.index + 1).toBe(newBlock.index);
    expect(lastBlockFromList.curHash).toBe(newBlock.prevHash);


});

