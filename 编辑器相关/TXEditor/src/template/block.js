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

    //更新数据
    update(){
        if (parent){
            this.computeHeight()
        }
    }

    //计算高度
    computeHeight(){
        let elements = this.getElements()
        let minHeight = 30
        elements.forEach(e => {
            let h = e.size.height + e.position.top
            if (h > minHeight){
                minHeight = h
            }
        })
        this.height = minHeight + this.padding * 2
    }
}

export default TxBlock