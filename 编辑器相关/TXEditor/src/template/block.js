import uuidv4 from 'uuid/v4'

import Element from './element.js'

class Block{
    constructor(){
        this.id = uuidv4()
        this.height = 30
        this.margin = 10
        this.padding = 3

        this._elements = []//元素数组
    }

    appendElement(element){
        element.setParent(this)
        this._elements.push(element)
    }

    removeElement(element){
        let index
        if (element instanceof Element){
            index = this._elements.findIndex(e => e === element)
            if (index < 0){
                throw "元素不存在于当前块"
                return
            }
        } else {
            index = element
        }

        this._elements.splice(index, 1)
    }

    getElementsCount(){
        return this._elements.length
    }

    getElements(){
        return this._elements
    }
}

export default Block