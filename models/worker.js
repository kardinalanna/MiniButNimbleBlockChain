const Node = require('./Node')
const Block = require('./Block')
const {workerData, parentPort} = require('worker_threads')



let node = new Node()

node.blockList = workerData[0].blockList
node.lastBlockIndex = workerData[0].lastBlockIndex
node.nodeId = workerData[0].nodeId

parentPort.on('message', msg => {
    node.blockList = msg.blockList
    node.lastBlockIndex = msg.lastBlockIndex
    node.nodeId = msg.nodeId
})

function sendBlock(block) {
	
	
	const adr = process.env.ADRESS || workerData[1]
	let otAdr = process.env.OTHERS ? process.env.OTHERS.split(',') : [];
	if (otAdr === null) {
		otAdr = [workerData[2], workerData[3]]
	}

    let urls = [adr, otAdr[0], otAdr[1]]

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
            // parentPort.postMessage(`Server ${url} is unavailable`)
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