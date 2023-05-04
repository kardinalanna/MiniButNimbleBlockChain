const express = require('express')
const Node = require('../models/Node')
const Block = require('../models/Block')
const {Worker} = require('worker_threads')

module.exports = class Server {

    constructor(processId, port) {
		let adr
		let otAdr
		if (processId === 0){
			adr = 'http://node2:3002'
			otAdr = ['http://node1:3001', 'http://node0:3000']
		}
		if (processId === 1){
			adr = 'http://node1:3001'
			otAdr = ['http://node0:3000', 'http://node2:3002']
		}
		
		if (processId === 2){
			adr = 'http://node0:3000'
			otAdr = ['http://node1:3001', 'http://node2:3002']
		}
			
        this.node = new Node(processId)
		let url = [this.node, adr, otAdr[0], otAdr[1]]
		this.port = process.env.PORT || (3000 + processId)
        this.processId = processId
        this.worker = new Worker('./models/worker.js', { workerData: url })
        this.app = null
    }

    start(){


        let worker = this.worker
        let node = this.node

        this.worker.on('message', (msg) => {
            console.log(msg);
        })

        const app = express()

        app.use(express.json())
		
		const port = this.port

        app.post('/', function(req, res) {

            let recievedBlock = req.body


            let flag = node.blockRecieveHandler(recievedBlock)

            if (!flag) {
                console.log('The block already exists');
            } else {
                console.log('The block has been inserted');
                worker.postMessage(node)
            }

            res.status(200).json({mes: 'ok'})

        })


        //server start

        this.app = app.listen(port, () => {

            console.log(`Server 1 has been started on port ${port}`)

        })



    }

    async stop(){
        await this.worker.terminate()
        this.app.close()
    }
    
}