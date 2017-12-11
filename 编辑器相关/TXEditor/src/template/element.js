import uuidv4 from 'uuid/v4'

/*
元素可能还会包含元素

元素的类型：
0：  文本
1：  图片
2：  表格

*/

class Element{
    constructor(){
        this.id = uuidv4()
        this.parent = null
        this.eType = null //元素的类型
        this.size = {
            width: 80,
            height: 50
        }
        this.position = {
            top: 0,
            left: 0
        }
    }

    setParent(parent){
        this.parent = parent
    }

    remove(){
        if (this.parent) this.parent.removeElement(this)
        else throw new Error("该元素没有父节点")
    }
}

//文本元素
class TextElement extends Element{
    constructor(){
        super()
        this.eType = 0
    }
}

//图片元素
class ImageElement extends Element{
    constructor(){
        super()
        this.eType = 1
        this.imageData = null
    }
}

export default Element
export {
    Element,
    TextElement,
    ImageElement
}