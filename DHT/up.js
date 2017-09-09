const dgram = require('dgram')
const crypto = require('crypto')
const bencode = require('bencode')

const BOOTSTRAP_NODES = [
    ['router.bittorrent.com', 6881],
];
const TID_LENGTH = 2

function randomID() {
    return crypto.createHash('sha1').update(crypto.randomBytes(20)).digest();
}

class DHTpeer{
    constructor(options){
        let {
            address = '0.0.0.0',
            port = 6881
        } = options

        this.nodeId = randomID()//生成节点ID
        this.ktable = [] //K桶
        this.ktableHash = new Map()
        this.address = address
        this.port = port
        this.server = dgram.createSocket('udp4')
    }

    start() {
        this.server.bind(this.port, this.address)

        this.server.on('listening', _ => {
            console.log(`DHTpeer (id:${this.nodeId.toString('hex')})启动:正在监听${this.address}:${this.port}`)     
        })

        this.server.on('message', (msg, rinfo) => this.onMessage(msg, rinfo) )
        this.server.on('error', _ => this.onError(_))
        this.server.on('close', _ => this.onClose(_))

        this.joinDHTNetwork()
        this.makeNeighbours()
    }

    onMessage(msg, rinfo){
        try {
            msg = bencode.decode(msg)

            if (msg.y == 'r' && msg.r.nodes) {
                this.FindNodeResponse(msg.r.nodes);
            }
            // else if (msg.y == 'q' && msg.q == 'get_peers') {
            //     this.onGetPeersRequest(msg, rinfo);
            // }
            // else if (msg.y == 'q' && msg.q == 'announce_peer') {
            //     this.onAnnouncePeerRequest(msg, rinfo);
            // }
        }
        catch (err) {
            console.error(err)
        }
    }

    onError(){

    }

    onClose(){
        
    }

    joinDHTNetwork() {
        BOOTSTRAP_NODES.forEach(node =>{
            this.requestFindNodes({address: node[0], port: node[1]})
        })
    }

    makeNeighbours() {
        this.ktable.forEach(node => {
            this.sendFindNodeRequest({
                address: node.address,
                port: node.port
            })
        })
    }

    requestFindNodes(rinfo){
        let nodeId= this.nodeId
        let t = randomID().slice(0, TID_LENGTH)

        let msg = {
            t,
            y: 'q',
            q: 'find_node',
            a: {
                id: nodeId,
                target: randomID()
            }
        }

        this.sendKRPC(msg, rinfo)
    }

    FindNodeResponse(nodes){
        var nodes = DHTpeer.decodeNodes(nodes)
        nodes.forEach(node => {
            let str_id = node.nodeId.toString('hex')
            if (node.nodeId != this.nodeId && node.port < 65536 && node.port > 0 && !this.ktableHash.has(str_id)) {
                this.ktableHash.set(str_id, true)
                this.ktable.push(node)
                console.log(`添加节点: ${node.address}:${node.port} ==> ${str_id}`)
            }
        })
    }

    sendKRPC(msg, rinfo){//发送KRPC
        let buff = bencode.encode(msg)
        this.server.send(buff, 0, buff.length, rinfo.port, rinfo.address)
    }

    static getNodesDistance(node1, node2){

    }

    static decodeNodes(nodesBuff){
        let nodes = []
        for(let i = 0; i + 26 < nodesBuff.length; i+=26){
            let node = {
                nodeId: nodesBuff.slice(i, i + 20),
                address: `${nodesBuff[i + 20]}.${nodesBuff[i + 21]}.${nodesBuff[i + 22]}.${nodesBuff[i + 23]}`,
                port: nodesBuff.readUInt16BE(i + 24)
            }
            nodes.push(node)
        }
        return nodes
    }

}

new DHTpeer({
    port:6881
}).start()