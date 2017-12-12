import TxBaseElement from './base.js'
import TxBlock from "./block.js"

class TxPage extends TxBaseElement{
    constructor(options = {}){
        super()
        //解析选项
        let {
            size = "A4"
        } = options

        //构建尺寸
        if (typeof size === "string"){
            switch (size){
                case "A4":
                    size = { width: 794, height: 1123 }
                    break
                default: //默认为A4
                    size = { width: 794, height: 1123 }
            }    
        }
        this.size = size
    }

    getBlocks(){
        return this.children.filter(c => c instanceof TxBlock)
    }

    /**
     * @param  {Block} block 需要插入的块
     * @param  {Number} index 需要插入的位置，默认为最末尾
     */
    appendBlock(block, index = this.children.length){
        if (block instanceof TxBlock){
            this.appendChild(block, index)
        } else {
            throw new TypeError("block must be a TxBlock")
        }
    }
    /**
     * @param  {Number} index = -1 需要删除的块的位置
     */
    removeBlock(index = -1){
        return this.removeChild(index)
    }
}

export default TxPage