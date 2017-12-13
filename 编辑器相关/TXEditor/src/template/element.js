import TxBaseElement from './base.js'
import {
    getCharSize
} from "@util/util.js"

//文本元素
class TextElement extends TxBaseElement{
    constructor(){
        super()
        this.eType = 100

        this.position = {top: 0, left: 0}
        this.size = {width: 80, height: 50}
    }

    update(){
        this.computeCharsPosition()
    }

    appendChar(char, index){
        if (char instanceof CharElement){
            this.appendChild(char, index)
            this.computeCharsPosition()
        } else {
            throw new TypeError("char must be a CharElement")
        }
    }

    getChars(){
        return this.children
    }

    computeCharsPosition(){
        let lines = []
        let textareaWidth = this.size.width
        let chars = this.children

        //构建行
        let lineWidth = 0
        let line = []
        chars.forEach(c => {
            if (c.size.width + lineWidth > textareaWidth){
                if (line.length === 0){
                    line.push(c)
                    lines.push(line)
                    line = []
                    lineWidth = 0
                } else {
                    lines.push(line)
                    line = []
                    line.push(c)
                    lineWidth = c.size.width
                }
                c.position.left = 0
            } else {
                c.position.left = lineWidth
                lineWidth += c.size.width
                line.push(c) 
            }
        })
        if (line.length > 0) lines.push(line)

        //构建每行的布局
        let lineHeight = 0
        lines.forEach(line => {
            let maxHeight = 0
            line.forEach(c => {
                if (c.size.height > maxHeight) maxHeight = c.size.height
            })

            line.forEach(c => {
                c.position.top = lineHeight + maxHeight - c.size.height
            })
            lineHeight += maxHeight
        })

        if (this.size.height < lineHeight){
            this.size.height = lineHeight
            this.parent.update()
        }
    }
}

class CharElement extends TxBaseElement{
    constructor(char, options = {}){
        super()
        let {
            fontSize = 14,
            fontFamily = "Microsoft YaHei" 
        } = options

        this.eType = 101
        this.char = char
        this.style = {
            fontSize,
            fontFamily
        }
        this.position = {top: 0, left: 0}
        this.size = getCharSize(char, this.style)
    }
}

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
    TextElement,
    CharElement,
    ImageElement
}