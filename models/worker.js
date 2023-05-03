const Node = require('./Node')
const Block = require('./Block')
const {workerData, parentPort} = require('worker_threads')



let node = new Node()

node.blockList = workerData.blockList
node.lastBlockIndex = workerData.lastBlockIndex
node.nodeId = workerData.nodeId

parentPort.on('message', msg => {
    node.blockList = msg.blockList
    node.lastBlockIndex = msg.lastBlockIndex
    node.nodeId = msg.nodeId
})

function sendBlock(block) {
  
  const ADDRESS = process.env.ADDRESS
  const OTHERS = process.env.OTHERS ? process.env.OTHERS.split(',') : [];

    let urls = [ADDRESS, OTHERS[0], OTHERS[1]]

    urls.forEach(url => {

        fetch(url, {
            method: 'post',
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(block)
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .catch((error) => {
            // parentPort.postMessage(Server ${url} is unavailable)
        });

    })


}


async function generateBlock() {


    function sendit()
    {
        if (node.blockList.length != 0) {

            let generatedBlock = node.mineBlock()

            sendBlock(generatedBlock)

            
        } else if (node.blockList.length == 0 && node.nodeId == 0) {
            let firstBlock = node.createFirstBlock()
            sendBlock(firstBlock)
        }

        setTimeout(sendit, 1000);
    }
    

    setTimeout(sendit, 1000);


}

generateBlock()