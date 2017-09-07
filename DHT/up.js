const dgram = require('dgram')
const crypto = require('crypto')
const bencode = require('bencode')

class DHTpeer{
    constructor(options){
        let {
            address = '0.0.0.0',
            port = 6881
        } = options

        this.address = address
        this.port = port
        this.server = dgram.createSocket('udp4')
    }

    start() {
        this.server.bind(this.port, this.address)
    }
}