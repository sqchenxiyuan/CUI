import uuidv4 from 'uuid/v4'
/*
模版的展示元素
元素可能还会包含元素

元素的类型：
0:   未知      NULL
1：  文档      DOCUMENT
2：  页面      PAGE
3：  页面块    BLOCK
100：  文本      TEXT
101：  字符      CHAR
102：  图片      IMAGE
103：  表格      TABLE
103：变量      VARIABLE
201：签名框    SIGNATUER
202：签章框    SEAL
*/

class TxBaseElement{
    constructor(){
        this.id = uuidv4()
        this.type = 0
        this.parent = null //父节点
        this.children = []
        this.size = null //尺寸 某些可能不需要
        this.position = null //位置 某些可能不需要
    }

    /**
     * @description 添加子节点
     * @param  {Block} child 需要插入的元素
     * @param  {Number} index 需要插入的位置，默认为最末尾
     */
    appendChild(child, index = this.children.length){
        if (child instanceof TxBaseElement){
            this.children.splice(index, 0, child)
            child.parent = this
        } else {
            throw new TypeError("child must be a TxBaseElement")
        }
        return child
    }

    /**
     * @description 移除子节点
     * @param  {Number} index = -1 需要删除的块的位置
     */
    removeChild(index = -1){
        return this.children.splice(index, 1)[0]
    }

    setSize(size){
        this.size = size
    }

}

export default TxBaseElement