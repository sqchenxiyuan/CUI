import TxBaseElement from './base.js'
import Element from './element.js'

class TxBlock extends TxBaseElement{
    constructor(){
        super()
        this.height = 30
        this.margin = 10
        this.padding = 3
    }

    appendElement(element){
        this.appendChild(element)
    }

    removeElement(element){
        let index
        if (typeof element !== "number"){
            index = this.children.findIndex(e => e === element)
            if (index < 0){
                throw "元素不存在于当前块"
                return
            }
        } else {
            index = element
        }
        this.removeChild(index)
    }

    getElementsCount(){
        return this.children.length
    }

    getElements(){
        return this.children
    }
}

export default TxBlock