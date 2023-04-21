const sha256 = require('sha256');
const { createHmac } = require('node:crypto');

module.exports = class Node {

    constructor(index, prevHash, nodeId) {
      this.index = index;
      this.prevHash = prevHash;
      this.nodeId = nodeId;
      this.data = this.makeRandomString()
    }

    nonce = 1
    difficult = '0000'
    curHash = null

    mine(){

        while (true) {

            let curData = this.index.toString() + this.data + this.prevHash + this.nonce.toString()

            let hash = createHmac('sha256', 'abcdefg').update(curData).digest('hex');

            if (hash.substr(hash.length - 4) == this.difficult) {
                this.curHash = hash
                break;
            } else {
                this.nonce = this.nonce + 1
            }
            
        }

    }

    makeRandomString() {
        var rnd = '';
        while (rnd.length < 256) 
            rnd += Math.random().toString(36).substring(2);
        return rnd.substring(0, 256);
    };


}