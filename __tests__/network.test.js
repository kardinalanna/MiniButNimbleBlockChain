
const Server = require('../models/Server')


function getBlockListToFivePromise(serv) {
   
    return new Promise((resolve, reject) => {
    
        function check(){
            if (serv.node.blockList.length >= 5) {
        
                serv.stop().then(() => {
                    resolve()
                })
                
            } else {
                setTimeout(check, 100);
            }
        
        }
    
        setTimeout(check, 100)
        
    })

}

function getBlockListToFivePromiseFotOther(server) {
   
    return new Promise((resolve, reject) => {
    
        setTimeout(() => {

            server.stop().then(() => {
                resolve()
            })
            
        }, 5000)
        
    })

}



test(`Test server 0`, async () => {

    
    let serverId = 0

    const server = new Server(serverId)

    server.start()

    await getBlockListToFivePromise(server);
    
    expect(server.processId).not.toBe(null);
    expect(server.processId).toBe(serverId);
    expect(server.node).not.toBe(null);
    expect(server.node.nodeId).toBe(serverId);
    expect(server.node.blockList.length).toBe(5);
    expect(server.node.blockList[0].index).toBe(0);

    for (let i = 0; i < server.node.blockList.length; i++) {
        expect(server.node.blockList[i].index).toBe(i);
        expect(server.node.blockList[i].nodeId).toBe(0);
    }

}, 15000000);


test(`Test start server 1 and 2`, async () => {

    const server1Id = 1
    const server2Id = 2
    
    
    const server1 = new Server(server1Id)
    const server2 = new Server(server2Id)

    server1.start()
    await getBlockListToFivePromiseFotOther(server1);

    server2.start()
    await getBlockListToFivePromiseFotOther(server2);
    
    expect(server1.node).not.toBe(null);
    expect(server1.processId).toBe(server1Id);
    expect(server1.node.nodeId).toBe(server1Id);
    expect(server1.node.blockList.length).toBe(0);
    expect(server1.node.lastBlockIndex).toBe(null);
    
    expect(server2.node).not.toBe(null);
    expect(server2.processId).toBe(server2Id);
    expect(server2.node.nodeId).toBe(server2Id);
    expect(server2.node.blockList.length).toBe(0);
    expect(server2.node.lastBlockIndex).toBe(null);

}, 15000000);



test(`Test start server 1 and 2`, async () => {

    const serverId_0 = 0
    const serverId_1 = 1
    const serverId_2 = 2

    const server_0 = new Server(serverId_0)
    const server_1 = new Server(serverId_1)
    const server_2 = new Server(serverId_2)

    server_0.start()
    server_1.start()
    server_2.start()

    await getBlockListToFivePromise(server_0);
    await getBlockListToFivePromise(server_1);
    await getBlockListToFivePromise(server_2);
    
    expect(server_0.node.nodeId).toBe(serverId_0);
    expect(server_0.processId).toBe(serverId_0);

    expect(server_1.node.nodeId).toBe(serverId_1);
    expect(server_1.processId).toBe(serverId_1);

    expect(server_2.node.nodeId).toBe(serverId_2);
    expect(server_2.processId).toBe(serverId_2);

    expect(server_0.node.blockList[0].index).toBe(0);
    expect(server_1.node.blockList[0].index).toBe(0);
    expect(server_2.node.blockList[0].index).toBe(0);

    expect(server_0.node.blockList[0].nodeId).toBe(0);
    expect(server_1.node.blockList[0].nodeId).toBe(0);
    expect(server_2.node.blockList[0].nodeId).toBe(0);

    expect(server_0.node.blockList.length).toBe(server_1.node.blockList.length);
    expect(server_1.node.blockList.length).toBe(server_2.node.blockList.length);
    expect(server_0.node.blockList.length).toBe(server_2.node.blockList.length);



}, 15000);


