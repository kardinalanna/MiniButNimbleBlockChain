const Server = require('./models/Server')

let processId = 0

if (+process.argv[2] == 1) {
    processId = 1
} else if (+process.argv[2] == 2) {
    processId = 2
}

const server = new Server(processId)

server.start()