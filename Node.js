const Block = require('./Block')

module.exports = class Node {

    constructor(nodeId) {
        this.nodeId = nodeId;
    }

    blockList = []

    lastBlockIndex = null

    alosalam(lastBlockIndex){
        this.lastBlockIndex = lastBlockIndex
    }

    blockRecieveHandler(block) {

        let blockIndex = block.index
        let blockNodeId = block.nodeId

        if (blockIndex == 0) {

            this.blockList.push(block)
            this.lastBlockIndex = 0

            console.log(`Node ${this.nodeId} recieved block from ${blockNodeId}: ${JSON.stringify(block)}`);

            return true

        } else if (blockIndex > this.lastBlockIndex ) {

            this.blockList.push(block)
            this.lastBlockIndex = blockIndex

console.log(`Node ${this.nodeId} recieved block from ${blockNodeId}: ${JSON.stringify(block)}`);

            return true

        } else {

            return false

        }

    }

    mineBlock(){
        let lastBlock = this.blockList[this.blockList.length - 1]

        let nextBlock = new Block(lastBlock.index + 1, lastBlock.curHash, this.nodeId);

        nextBlock.mine()

        return nextBlock;
    }

    createFirstBlock(){

        let firstBlock = new Block(0, 'salamsalam', this.nodeId)

        firstBlock.mine()

        return firstBlock

    }

}