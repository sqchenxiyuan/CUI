import TxBaseElement from './base.js'

//文本元素
class TextElement extends TxBaseElement{
    constructor(){
        super()
        this.eType = 100

        this.position = {top: 0, left: 0}
        this.size = {width: 80, height: 50}

        this._chars = [] //字符集
        this._lines = [] //展示用的行

        this.computeCharsPosition()
    }

    update(){
        this.computeCharsPosition()
        this.parent.update()
    }

    getChars(){
        return this._chars
    }

    getLines(){
        return this._lines
    }

    appendChar(char, index = this._chars.length, style = new TextStyle()){
        this._chars.splice(index, 0, new TextChar(char, style))
        this.computeCharsPosition()
    }
    
    //切分行
    computeCharsPosition(){
        let lines = []
        let textareaWidth = this.size.width
        let chars = this._chars

        //构建行
        let lineWidth = 0
        let line = new TextLine()
        lines.push(line)
        chars.forEach(c => {
            if (lineWidth + c.size.width > textareaWidth){
                if (line.gerCharCount() > 0){
                    line = new TextLine()
                    line.appendChar(c)
                    lines.push(line)
                    lineWidth = c.size.width
                } else {
                    line.appendChar(c)
                    line = new TextLine()
                    lines.push(line)
                    lineWidth = 0
                }
            } else {
                line.appendChar(c)
                lineWidth += c.size.width

                if (c.char === "\n"){
                    line = new TextLine()
                    lines.push(line)
                    lineWidth = 0
                }
            }
        })
        
        let lineHeight = 0
        lines.forEach(line => {
            line.position.top = lineHeight
            line.computeCharsPosition()
            lineHeight += line.size.height
        })

        if (lineHeight > 50) this.size.height = lineHeight
        else lineHeight = 50

        this._lines = lines
    }
}

class TextLine{
    constructor(){
        this.position = { top: 0, left: 0 }
        this.size = { width: 0, height: 0 }
        
        this._chars = []//这一行的字符
    }

    appendChar(c){
        this._chars.push(c)
        this.computeCharsPosition()
    }

    getCharAt(index){
        return this._chars[index]
    }

    gerCharCount(){
        return this._chars.length
    }

    computeCharsPosition(){
        let width = 0
        let height = 0
        let chars = this._chars

        //寻找最大高度
        chars.forEach(c => {
            if (c.size.height > height) height = c.size.height
        })
        
        //构建位置
        chars.forEach(c => {
            c.position.top = this.position.top + height - c.size.height
            c.position.left = width
            width += c.size.width
        })

        if (height === 0) height = 14

        this.size.height = height
        this.size.width = width
    }
}

//字符
class TextChar{
    constructor(char, style = new TextStyle()){
        this.char = char
        this.style = style.clone()
        this.position = {top: 0, left: 0}
        this.size = getCharSize(char, this.style)
    }
}

//文本样式
class TextStyle{
    constructor(options = {}){
        let {
            fontSize = 14, //px为单位
            fontFamily = "Microsoft YaHei",
        } = options

        this.fontSize = fontSize
        this.fontFamily = fontFamily
    }

    clone(){
        return new TextStyle({
            fontSize: this.fontSize,
            fontFamily: this.fontFamily
        })
    }
}

//计算字符的宽高
window.getCharSize = getCharSize
function getCharSize(char, style = new TextStyle()) {
    let {
        fontSize = 14, //px为单位
        fontFamily = "Microsoft YaHei",
    } = style

    let scale = 1 //倍数

    if (fontSize < 12){ //兼容chrome浏览器
        scale = fontSize / 12
        fontSize = 12
    }
    let span = document.createElement("span")
    span.innerHTML = encodeCharToHTML(char)
    span.style.fontSize = `${fontSize}px`
    span.style.lineHeight = `${fontSize}px`
    span.style.display = "inline-block"
    span.style.fontFamily = fontFamily
    if (scale !== 1) span.style.transform = `scale(${scale})`
    document.body.appendChild(span)
    let rect = span.getBoundingClientRect()
    document.body.removeChild(span)

    if (rect.height === 0) rect.height = fontSize

    return {
        height: rect.height,
        width: rect.width,
    }
}

function encodeCharToHTML(char){
    switch (char){
        case " ":return "&nbsp;"
        default:
            return char
    }
}


export default TextElement