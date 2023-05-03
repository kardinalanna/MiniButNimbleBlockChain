const express = require('express')
const Node = require('../models/Node')
const Block = require('../models/Block')
const {Worker} = require('worker_threads')

module.exports = class Server {

    constructor(processId) {
        this.node = new Node(processId)
        this.processId = processId
        this.worker = new Worker('./models/worker.js', { workerData: this.node })
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
        const port =  Number(process.env.PORT)

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

            console.log(Server 1 has been started on port ${port})

        })



    }

    async stop(){
        await this.worker.terminate()
        this.app.close()
    }
    
}