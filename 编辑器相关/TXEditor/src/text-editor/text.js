class TextRender{
    //一个只负责排版以及查找光标和选择范围的位置的对象
    //获取字符位置，获取光标位置，插入文本，删除文本

    constructor(texts){
        this.view = {
            top: 0,
            left: 0,
            width: 0,
            height: 0
        }

        this._texts = texts
        this.lastRenderResult = { //最近一次渲染排版的结果
            textCharsArr: [],
            chars: [],
            sections: []
        }
    }

    //获取文本元素的字符
    getTextCharsArr(){
        return this._texts.map(t => t.getChars())
    }

    //获取全部字符（主要用于计算宽高）
    getChars(){
        return this.getTextCharsArr().reduce((arr, chars) => {
            arr.splice(Infinity, 0, ...chars)
            return arr
        }, [])
    }

    //计算字符，计算每个字符的位置
    renderChars(){
        let textCharsArr = this.getTextCharsArr()
        let chars = textCharsArr.reduce((arr, chars) => {
            arr.splice(Infinity, 0, ...chars)
            return arr
        }, [])
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

        this.lastRenderResult = {
            textCharsArr,
            chars,
            sections
        }
    }

    getRenderedChars(){
        if (!this.lastRenderResult) return []
        let chars = []
        let sections = this.lastRenderResult.sections
        sections.forEach(s => {
            s.getLines().forEach(l => {
                l.getChars().forEach(c => {
                    chars.push({
                        value: c.value,
                        style: c.style,
                        view: c.getViewInText()
                    })
                })
            })
        })
        return chars
    }

    appendTexts(texts, index = this._texts.length){
        let lastIndex = index
        texts.forEach(t => {
            lastIndex = this.appendText(t, lastIndex)
        })
        return lastIndex
    }

    appendText(text, index = this._texts.length){
        if (!(text instanceof TextBase)){
            throw new TypeError("错误的数据类型，需要TextBase")
        }
        if (index < 0) index = 0
        if (index > this._texts.length) index = this._texts.length

        this._texts.splice(index, 0, text)
        return index + 1
    }

    //获取光标序列，返回序列以及点中的text对象
    getCursorIndexByPoint(point){ //在文档中的位置
        if (!point) return 0
        if (this._texts.length === 0) return 0
        if (!this.lastRenderResult) return 0
        let {
            x = 0,
            y = 0
        } = point

        let distance = Infinity
        
        //寻找目标段
        let sections = this.lastRenderResult.sections
        let allchars = this.lastRenderResult.chars
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

        //寻找目标字符
        let chars = targetLine.getChars()
        let targetChar = null
        let charIndex
        let right = 0 //在字符右边
        distance = Infinity
        if (chars.length === 0){ //最后一行
            return allchars.length
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

            let index = allchars.findIndex(c => c === targetChar)
            index += right
            if (targetChar.value === "\n") index = index - right - 1
            if (index < 0) index = 0
            charIndex = index
        }

        //寻找目标字符所对应的文本对象
        let textCharsArr = this.lastRenderResult.textCharsArr
        let targetTextIndex = 0
        let count = 0
        for (let i = 0; i < textCharsArr.length; i++){
            if (textCharsArr[i].length + count > charIndex){
                targetTextIndex = i
                break
            } else {
                count += textCharsArr[i].length
            }
            if (i === textCharsArr.length - 1){
                targetTextIndex = textCharsArr.length
            }
        }
        let text = this._texts[targetTextIndex]
        if (!text) text = this._texts[targetTextIndex - 1]
        return {
            index: targetTextIndex,
            text: this._texts[targetTextIndex]
        }
    }

    //获取光标位置
    getCursorPositon(textIndex, wrap = true, charStyle = new CharStyle()){ //warp 无换行符换行，显示在哪，true 为下一行 false 为这一行
        let width = 2
        if (this.lastRenderResult.chars.length === 0){
            return {
                top: 0,
                left: 0,
                width,
                height: charStyle.fontSize
            }
        }

        let textCharsArr = this.lastRenderResult.textCharsArr
        let chars = this.lastRenderResult.chars
        let text = textCharsArr[textIndex]
        let char
        if (text){
            char = text[0]
            let line = char.line
            let section = line.section
            if (line.getChars()[0] === char && section.getLines()[0] !== line){ //是否为当前行第一个，且有上一行
                if (!wrap){
                    let text = textCharsArr[textIndex - 1]
                    let char = text[0]
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
            char = chars[chars.length - 1]
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

    //获取一个范围的矩形
    getRangeRects(range){
        if (range[0] === range[1]){
            return []
        }
        
        if (range[0] > range[1]){
            range = [range[1], range[0]]
        }

        let textCharsArr = this.lastRenderResult.textCharsArr
        let rects = []
        for (let i = range[0]; i < range[1]; i++){
            rects.splice(Infinity, 0, ...textCharsArr[i].map(c => {
                return c.getViewInText()
            }))
        }
        return rects
    }

    //获取字符样式根据索引
    getCharStyleAt(index){
        if (index < 0) index = 0
        let texts = this._texts
        let text = texts[index]
        if (!text) text = texts[texts.length - 1]
        if (!text) return null
        return text.style.clone()
    }

    //获取在范围中的文本对象
    getCharsInRange(range){
        if (range[0] === range[1]){
            return []
        }
        
        if (range[0] > range[1]){
            range = [range[1], range[0]]
        }

        let texts = this._texts
        return texts.slice(range[0], range[1])
    }

    //删除一个字符
    deleteText(index){
        if (index === 0) return 0
        this._texts.splice(index - 1, 1)
        return index - 1
    }

    //删除一个范围内的字符
    deleteTextsInRange(range){
        if (range[0] === range[1]){
            return this.deleteText(range[0])
        }

        if (range[0] > range[1]){
            range = [range[1], range[0]]
        }

        this._texts.splice(range[0], range[1] - range[0])
        return range[0]
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
    
    //移动光标，上下 左右只能同时一个
    cursorMove(textIndex, inline = 0, outline = 0){ //行内左右 行外上下
        let allchars = this.lastRenderResult.chars
        let textCharsArr = this.lastRenderResult.textCharsArr
        let sections = this.lastRenderResult.sections
        let texts = this._texts

        if (texts.length === 0) return 0

        if (inline){ //左右
            textIndex += inline
            if (textIndex < 0) textIndex = 0
            if (textIndex > texts.length) textIndex = texts.length
        } else if (outline){ //上下
            let last = 0
            if (textIndex === texts.length){
                last = 1
            }
    
            let char = textCharsArr[textIndex - last][0]
            let charIndex = allchars.findIndex(c => c === char)
            let charIndexInLine = char.line.getChars().findIndex(c => c === char) + last

            let allLines = []
            sections.forEach(s => {
                allLines.splice(allLines.length, 0, ...s.getLines())
            })

            let lineIndex = allLines.findIndex(l => l === char.line)
            lineIndex += outline
            if (lineIndex < -1) lineIndex = -1
            if (lineIndex > allLines.length) lineIndex = allLines.length

            if (lineIndex === allLines.length) charIndex = allchars.length
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
            
            //寻找目标字符所对应的文本对象
            let targetTextIndex = 0
            let count = 0
            for (let i = 0; i < textCharsArr.length; i++){
                if (textCharsArr[i].length + count > charIndex){
                    targetTextIndex = i
                    break
                } else {
                    count += textCharsArr[i].length
                }
                if (i === textCharsArr.length - 1){
                    targetTextIndex = textCharsArr.length
                }
            }
            let text = this._texts[targetTextIndex]
            textIndex = targetTextIndex
        }
        return textIndex
    }

    setVariableValueById(id, nv){
        this._texts.forEach(t => {
            console.log(t)
            if (t.type === 1){
                console.log(t)
            }
            if (t.id === id){
                t.value = nv
            }
        })
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

        if (height === 0) height = 14 //FIXME: 暂时解决空行高度问题

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

const sizeMap = new Map()

function getCharSize(char, style = new CharStyle()) {
    let {
        fontSize = 14, //px为单位
        fontFamily = "Microsoft YaHei",
        fontWeight = "normal"
    } = style
    
    let result = sizeMap.get(JSON.stringify({char, style}))
    if (result) return result

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

    result = {
        height: rect.height,
        width: rect.width,
    }
    sizeMap.set(JSON.stringify({char, style}), result)
    return result
}

function encodeCharToHTML(char){
    switch (char){
        case " ":return "&nbsp;"
        default:
            return char
    }
}

class TextBase{
    //文本计算的基础对象
    constructor(value, charStyle = new CharStyle()){
        this.type = 0
        this.value = value

        if (!(charStyle instanceof CharStyle)) charStyle = new CharStyle(charStyle)
        this.style = charStyle
    }

    getChars(){ //获取该文本对象的字符列表
        console.log("需要重写 getChars")
    }
}

class TextChar extends TextBase{
    constructor(value, charStyle = new CharStyle()){
        super(value, charStyle)
        this.type = 0
    }

    getChars(){
        return [
            new Char(this.value, this.style)
        ]
    }
}

class TextVariable extends TextBase{
    constructor(id, value, charStyle = new CharStyle()){
        super(value, charStyle)
        this.type = 1
        this.id = id || parseInt(Math.random() * 100000)
        this.value = value
        this.style = new CharStyle({fontWeight: "bold"})
    }

    getChars(){
        return this.value.split("").map(c => {
            return new Char(c, this.style)
        })
    }
}

export default TextRender
export {
    TextChar,
    TextVariable,
    CharStyle
}