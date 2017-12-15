import TxBaseElement from './base.js'

//图片元素
class ImageElement extends TxBaseElement{
    constructor(){
        super()
        this.eType = 102
        this.imageData = null

        this.position = {top: 0, left: 0}
        this.size = {width: 80, height: 50}
    }
}

export {
    ImageElement
}