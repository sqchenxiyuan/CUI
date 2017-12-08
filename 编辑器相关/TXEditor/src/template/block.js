import uuidv4 from 'uuid/v4'

import Element from './element.js'

class Block{
    constructor(){
        this.id = uuidv4()
        this.height = 30
        this.margin = 10

        this.elements = []
    }
}

export default Block