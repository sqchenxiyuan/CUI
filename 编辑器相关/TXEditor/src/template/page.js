import uuidv4 from 'uuid/v4'

import Block from "./block.js"

class Page{
    constructor(size = "A4"){
        this.id = uuidv4()
        this.size = size
        this.blocks = []

        // this.blocks.push(new Block())
    }
}

export default Page