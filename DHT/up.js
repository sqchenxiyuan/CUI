const dgram = require('dgram')
const crypto = require('crypto')
const bencode = require('bencode')

const BOOTSTRAP_NODES = [
    ['router.bittorrent.com', 6881],
];
const TID_LENGTH = 2
const TOKEN_LENGTH = 4

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
            
            setInterval(_ => {
                this.joinDHTNetwork()
                this.makeNeighbours()
            }, 1000)
        })
        
        this.server.on('message', (msg, rinfo) => 
            this.onMessage(msg, rinfo) 
        )
        this.server.on('error', _ => this.onError(_))
        this.server.on('close', _ => this.onClose(_))
    }

    onMessage(msg, rinfo){
        try {
            msg = bencode.decode(msg)

            if (msg.y == 'r' && msg.r.nodes) {
                this.onFindNodeResponse(msg.r.nodes);
            }else if (msg.y == 'q' && msg.q == 'get_peers') {
                this.onGetPeersRequest(msg, rinfo);
            }else if (msg.y == 'q' && msg.q == 'announce_peer') {
                this.onAnnouncePeerRequest(msg, rinfo);
            }else if (msg.y == 'q' && msg.q == 'ping') {
                this.onPingRequest(msg, rinfo);
            }
        }
        catch (err) {
            console.error(err)
        }
    }

    onError(e){
        console.log(e)
    }

    onClose(e){
        console.log(e)        
    }

    joinDHTNetwork() {
        BOOTSTRAP_NODES.forEach(node =>{
            this.requestFindNodes({address: node[0], port: node[1]})
        })
    }

    makeNeighbours() {
        this.ktable.forEach(node => {
            this.requestFindNodes({
                address: node.address,
                port: node.port
            }, node.nodeId)
        })
        this.ktable = []
    }

    requestFindNodes(rinfo, nId){
        let nodeId = nId ? DHTpeer.genNeighborID(nId, this.nodeId) : this.nodeId;
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

    onFindNodeResponse(nodes){
        var nodes = DHTpeer.decodeNodes(nodes)
        nodes.forEach(node => {
            let str_id = node.nodeId.toString('hex')
            if (node.nodeId != this.nodeId && node.port < 65536 && node.port > 0) {
                this.ktableHash.set(str_id, true)
                this.ktable.push(node)
            }
        })
    }

    onPingRequest(msg, rinfo){
        let tid, nodeId
        try {
            tid = msg.t
            nodeId = msg.a.id;
     
            if (tid === undefined || nodeId.length != 20) {
                throw new Error;
            }
        }
        catch (err) {
            return
        }

        this.sendKRPC({
            t: tid,
            y: 'r',
            r: {
                id: this.nodeId
            }
        }, rinfo)
    }

    onGetPeersRequest(msg, rinfo){
        let infohash,tid,nodeId,token
        try {
            infohash = msg.a.info_hash
            tid = msg.t
            nodeId = msg.a.id
            token = infohash.slice(0, TOKEN_LENGTH)
     
            if (tid === undefined || infohash.length != 20 || nodeId.length != 20) {
                throw new Error
            }
        }
        catch (err) {
            return
        }
        
        this.sendKRPC({
            t: tid,
            y: 'r',
            r: {
                id: DHTpeer.genNeighborID(infohash, this.nodeId),
                nodes: '',
                token: token
            }
        }, rinfo)
    }

    onAnnouncePeerRequest(msg, rinfo) {
        let port, token, nodeId, tid, infohash
        
        try {
            infohash = msg.a.info_hash;
            token = msg.a.token;
            nodeId = msg.a.id;
            tid = msg.t;
    
            if (nodeId == undefined) {
                throw new Error;
            }
        }
        catch (err) {
            return;
        }
    
        if (infohash.slice(0, TOKEN_LENGTH).toString() != token.toString()) {
            return;
        }
    
        if (msg.a.implied_port != undefined && msg.a.implied_port != 0) {
            port = rinfo.port;
        }
        else {
            port = msg.a.port || 0;
        }
    
        if (port >= 65536 || port <= 0) {
            return;
        }
    
        this.sendKRPC({
            t: tid,
            y: 'r',
            r: {
                id: DHTpeer.genNeighborID(nodeId, this.nodeId),
            }
        }, rinfo);
    
        console.log("magnet:?xt=urn:btih:%s from %s:%s", infohash.toString("hex"), rinfo.address, rinfo.port);
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

    static genNeighborID(target, nid){
        return  Buffer.concat([target.slice(0, 10), nid.slice(10)]);
    }
}

new DHTpeer({
    port:6881
}).start()