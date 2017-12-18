import { S_IFBLK, SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG, ERANGE } from "constants"

class Text{
    constructor(){
        this.view = {
            top: 0,
            left: 0,
            width: 0,
            height: 0
        }

        this._chars = []
        this._sections = [] //段落
    }

    appendChars(chars, index = this._chars.length, charStyle = new CharStyle()){
        if (index < 0) index = 0
        if (index > this._chars.length) index = this._chars.length
        
        chars = chars.split("").map(c => {
            return new Char(c, charStyle)
        })
        
        this._chars.splice(index, 0, ...chars)
        return index + chars.length
    }

    appendChar(char, index = this._chars.length, charStyle = new CharStyle()){
        if (index < 0) index = 0
        if (index > this._chars.length) index = this._chars.length

        this._chars.splice(index, 0, new Char(char, charStyle))
        return index + 1
    }

    getCharStyleAt(index){
        if (index < 0) index = 0
        let char = this._chars[index]
        if (!char) char = this._chars[this._chars.length - 1]
        if (!char) return null
        return char.style.clone()
    }

    getCharsInRange(range){
        if (range[0] === range[1]){
            return []
        }
        
        if (range[0] > range[1]){
            range = [range[1], range[0]]
        }

        let chars = this._chars
        return chars.slice(range[0], range[1])
    }

    getSections(){
        return this._sections
    }

    setView(view){
        let {
            top,
            left,
            width,
            height
        } = view

        if (top != null) this.view.top = top
        if (left != null) this.view.left = left
        if (width != null) {
            this.view.width = width
            this._sections.forEach(s => s.setView({width}))
        }
        if (height != null) this.view.height = height
    }

    computeSections(){
        let chars = this._chars
        let sections = []
        let section = new Section()
        sections.push(section)
        for (let i = 0; i < chars.length; i++){
            let char = chars[i]
            section.appendChar(char)
            if (char.value === '\n'){
                section = new Section()
                sections.push(section)
            }
        }

        sections.forEach((s, index) => {
            s.text = this
            s.setView({width: this.view.width})
            s.computeLines()
        })

        //计算高度
        let height = 0
        sections.forEach(s => {
            s.setView({
                top: height
            })
            height += s.view.height
        })
        this.setView({
            height
        })

        this._sections = sections
    }

    //获取光标位置
    getCursorPositon(charIndex, wrap = true, charStyle = new CharStyle()){ //warp 无换行符换行，显示在哪，true 为下一行 false 为这一行
        let width = 2
        if (this._chars.length === 0){
            return {
                top: 0,
                left: 0,
                width,
                height: charStyle.fontSize
            }
        }
        
        let char = this._chars[charIndex]
        if (char){
            let line = char.line
            let section = line.section
            if (line.getChars()[0] === char && section.getLines()[0] !== line){ //是否为当前行第一个，且有上一行
                if (!wrap){
                    let char = this._chars[charIndex - 1]
                    let view = char.getViewInText()
                    return {
                        top: view.top,
                        left: view.left + view.width,
                        width,
                        height: view.height
                    }
                }
            } 
            
            let view = char.getViewInText()
            return {
                top: view.top,
                left: view.left,
                width,
                height: view.height
            }
        } else {
            char = this._chars[this._chars.length - 1]
            let view = char.getViewInText()
            if (char.value === '\n'){
                return {
                    top: view.top + view.height,
                    left: 0,
                    width,
                    height: charStyle.fontSize
                }
            } else {
                return {
                    top: view.top,
                    left: view.left + view.width,
                    width,
                    height: view.height
                }
            }
        }
    }

    //移动光标，上下 左右只能同时一个
    cursorMove(charIndex, inline = 0, outline = 0){ //行内左右 行外上下
        if (inline){
            charIndex += inline
            if (charIndex < 0) charIndex = 0
            if (charIndex > this._chars.length) charIndex = this._chars.length
            
        } else if (outline){
            let last = 0
            if (charIndex === this._chars.length){
                last = 1
            }
    
            let char = this._chars[charIndex - last]
            let charIndexInLine = char.line.getChars().findIndex(c => c === char) + last

            let allLines = []
            this._sections.forEach(s => {
                allLines.splice(allLines.length, 0, ...s.getLines())
            })

            let lineIndex = allLines.findIndex(l => l === char.line)
            lineIndex += outline
            if (lineIndex < -1) lineIndex = -1
            if (lineIndex > allLines.length) lineIndex = allLines.length

            if (lineIndex === allLines.length) charIndex = this._chars.length
            else if (lineIndex === -1) charIndex = 0
            else {
                let count = 0
                for (let i = 0; i < allLines.length; i++){
                    let line = allLines[i]
                    if (i === lineIndex){
                        if (line.getChars().length === 0){
                            //这行为空表示为末尾，光标属于上一行的最后一个\n的
                        } else if (line.getChars().length <= charIndexInLine){
                            count += line.getChars().length
                            if (line.getChars()[line.getChars().length - 1].value === '\n'){
                                count--
                            } 
                        } else {
                            count += charIndexInLine
                        }
                        break
                    } else {
                        count += line.getChars().length
                    }
                }
                charIndex = count
            }
        }
        return charIndex
    }

    //删除一个字符
    deleteChar(index){
        if (index === 0) return 0
        this._chars.splice(index - 1, 1)
        return index - 1
    }

    //删除一个范围内的字符
    deleteCharsInRange(range){
        if (range[0] === range[1]){
            return this.deleteChar(range[0])
        }

        if (range[0] > range[1]){
            range = [range[1], range[0]]
        }

        this._chars.splice(range[0], range[1] - range[0])
        return range[0]
    }

    //获取光标的位置
    getCursorIndexByPoint(point){ //在文档中的位置
        if (!point) return 0
        if (this._chars.length === 0) return 0
        let {
            x = 0,
            y = 0
        } = point

        let distance = Infinity
        //寻找目标段
        let sections = this._sections
        let targetSection = sections[0]
        for (let i = 0; i < sections.length; i++){
            let section = sections[i]
            let view = section.view
            if (view.top <= y && y <= view.height + view.top){
                targetSection = section
                break
            } else {
                let d = Math.abs(y - (view.height + view.top / 2))
                if (d < distance){
                    distance = d
                    targetSection = section
                }
            }
        }

        y = y - targetSection.view.top

        //寻找目标行
        let lines = targetSection.getLines()
        let targetLine = lines[0]
        distance = Infinity
        for (let i = 0; i < lines.length; i++){
            let line = lines[i]
            let view = line.view
            if (view.top <= y && y <= view.height + view.top){
                targetLine = line
                break
            } else {
                let d = Math.abs(y - (view.height + view.top / 2))
                if (d < distance){
                    distance = d
                    targetLine = line
                }
            }
        }

        let chars = targetLine.getChars()
        let targetChar = null
        distance = Infinity
        if (chars.length === 0){ //最后一行
            return this._chars.length
        } else {
            let right = 0 //在字符右边
            for (let i = 0; i < chars.length; i++){
                let char = chars[i]
                let view = char.view
                if (x > view.left + view.width / 2) right = 1
                else right = 0
                if (view.left <= x && x <= view.left + view.width){ //在行左,因为能
                    targetChar = char
                    break
                } else {
                    let d = Math.abs(x - (view.width + view.left / 2))
                    if (d < distance){
                        distance = d
                        targetChar = char
                    }
                }
            }
            
            let index = this._chars.findIndex(c => c === targetChar)
            index += right
            if (targetChar.value === "\n") index = index - right - 1
            if (index < 0) index = 0
            return index
        }

    }

    //获取一个范围的矩形
    getRangeRects(range){
        if (range[0] === range[1]){
            return []
        }
        
        if (range[0] > range[1]){
            range = [range[1], range[0]]
        }

        let chars = this._chars
        let rects = []
        for (let i = range[0]; i < range[1]; i++){
            rects.push(chars[i].getViewInText())
        }

        return rects
    }
}

class Section{
    constructor(chars = []){
        this.view = {
            top: 0,
            left: 0,
            width: 0,
            height: 0
        }

        this.text = null //文章的对象
        this._chars = chars
        this._lines = []
    }

    getChars(){
        return this._chars
    }

    getLines(){
        return this._lines
    }

    appendChar(char, index = this._chars.length){
        this._chars.splice(index, 0, char)
    }

    setView(view){
        let {
            top,
            left,
            width,
            height
        } = view

        if (top != null) this.view.top = top
        if (left != null) this.view.left = left
        if (width != null) {
            this._lines.forEach(l => l.setView({width}))
            this.view.width = width
        }
        if (height != null) this.view.height = height
    }

    computeLines(){
        let maxWidth = this.view.width
        let chars = this._chars
        
        let lines = []
        let line = new Line()
        let lineWidth = 0
        lines.push(line)

        chars.forEach(c => {
            if (line.getChars().length !== 0 && c.view.width + lineWidth > maxWidth){ //添加字符的宽度将大于最大宽度
                //进入新一行
                line = new Line()
                lines.push(line)
                lineWidth = 0
            }

            //加入该元素
            line.appendChar(c)
            lineWidth += c.view.width
        })

        lines.forEach(l => {
            l.section = this
            l.setView({width: maxWidth})
            l.computeCharsPostion()
        })

        let height = 0
        lines.forEach(l => {
            l.setView({
                top: height
            })
            height += l.view.height
        })
        this.setView({
            height
        })

        this._lines = lines
    }
}

class Line{
    constructor(chars = []){
        this.view = {
            top: 0,
            left: 0,
            width: 0,
            height: 0
        }

        this.section = null //所处段落
        this._chars = chars
    }

    setView(view){
        let {
            top,
            left,
            width,
            height
        } = view

        if (top != null) this.view.top = top
        if (left != null) this.view.left = left
        if (width != null) this.view.width = width
        if (height != null) this.view.height = height
    }

    getChars(){
        return this._chars
    }

    appendChar(char, index = this._chars.length){
        this._chars.splice(index, 0, char)
    }
    
    computeCharsPostion(){
        let height = 0
        let width = 0
        this._chars.forEach(c => {
            if (c.view.height > height) height = c.view.height
        })

        this._chars.forEach(c => {
            c.line = this
            c.setView({
                top: height - c.view.height,
                left: width
            })
            width += c.view.width
        })
        this.setView({
            height
        })
    }
}

class Char{
    constructor(char, charStyle = new CharStyle()){
        this.view = {
            top: 0,
            left: 0,
            width: 0,
            height: 0
        }

        this.line = null
        this.value = char

        if (!(charStyle instanceof CharStyle)) charStyle = new CharStyle(charStyle)
        this.style = charStyle.clone()
        
        this.computeSize()
    }

    setView(view){
        let {
            top,
            left,
            width,
            height
        } = view

        if (top != null) this.view.top = top
        if (left != null) this.view.left = left
        if (width != null) this.view.width = width
        if (height != null) this.view.height = height
    }

    computeSize(){
        let size = getCharSize(this.value, this.style)
        this.setView({
            width: size.width,
            height: size.height
        })
    }

    getViewInText(){
        let {
            top,
            left,
            width,
            height
        } = this.view

        let line = this.line
        let section = line.section

        top = top + line.view.top + section.view.top
        left = left + line.view.left + section.view.left
        return {
            top,
            left,
            width,
            height
        }
    }
}

class CharStyle{
    constructor(options = {}){
        let {
            fontSize = 14, //px为单位
            fontFamily = "Microsoft YaHei",
            fontWeight = "normal"
        } = options

        this.fontSize = fontSize
        this.fontFamily = fontFamily
        this.fontWeight = fontWeight
    }

    clone(){
        return new CharStyle({
            fontSize: this.fontSize,
            fontFamily: this.fontFamily,
            fontWeight: this.fontWeight
        })
    }
}

function getCharSize(char, style = new CharStyle()) {
    let {
        fontSize = 14, //px为单位
        fontFamily = "Microsoft YaHei",
        fontWeight = "normal"
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
    span.style.fontWeight = fontWeight
    if (scale !== 1) span.style.transform = `scale(${scale})`
    document.body.appendChild(span)
    let rect = span.getBoundingClientRect()
    document.body.removeChild(span)

    if (rect.height === 0) rect.height = fontSize //如果为空白字符默认有一个高

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

export default Text
export {
    CharStyle
}