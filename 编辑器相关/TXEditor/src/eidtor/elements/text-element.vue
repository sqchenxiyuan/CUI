<template>
    <TxElement :element="element" @resize="resizeElement" @move="moveElement">
        <div ref="textContainer" class="tx-element-text" @click="focusText($event)">
            <TxCharElement v-for="(c,index) in element.getChars()" :element="c" :key="index"></TxCharElement>
            <textarea ref="textarea" class="tx-element-text-textarea" :style="cursorStyle" @input="textInput" @keydown="keydown"
               @focus="cursorActive = true" @blur="cursorActive = false"></textarea>
            <div v-if="cursorActive" class="tx-element-text-cursor" :style="cursorStyle"></div>
        </div>
    </TxElement>
</template>

<script>
import TxBaseElement from "@template/base.js"
import { CharElement } from "@template/element.js"

import TxElement from "./element.vue"
import TxCharElement from "./char-element.vue"

export default {
    props: {
        element: {
            type: TxBaseElement,
            required: true
        }
    },
    data(){
        return {
            cursorIndex: 0, //0为最前面
            cursorActive: false //光标是否激活
        }
    },
    computed: {
        cursorStyle() {
            let x = 0, y = 0, h = 14
            let cursorIndex = this.cursorIndex
            let lines = this.element.getLines()
            let chars = this.element.getChars()

            let charCount = 0
            let lineIndex = 0
            let line = null
            for (lineIndex = 0; lineIndex < lines.length; lineIndex++){
                line = lines[lineIndex]
                let count = line.gerCharCount()
                if (charCount <= cursorIndex && cursorIndex < charCount + count){
                    break
                } else {
                    charCount += count
                }
            }

            let char = line.getCharAt(cursorIndex - charCount)
            console.log(cursorIndex, charCount, char)
            if (char){ //存在该字符
                x = char.position.left
                y = char.position.top
                h = char.size.height
                console.log(char)
            } else { //不存在直接使用默认
                char = chars[chars.length - 1]
                if (char){
                    if (char.char === '\n'){
                        line = lines[lineIndex + 1]
                        x = line.position.left
                        y = line.position.top
                        h = line.size.height
                    } else {
                        x = char.position.left + char.size.width
                        y = char.position.top
                        h = char.size.height
                    }
                }
            }
            console.log(x, y, h)
            return {
                left: x + 'px',
                top: y + 'px',
                height: h + 'px'
            }
        }
    },
    mounted(){
        this.focusText()
    },
    methods: {
        textInput(e){
            let text = this.$refs.textarea.value
            let oldLength = this.element.getChars().length
            this.$refs.textarea.value = ""
            text.split("").forEach(c => {
                this.textAppendChar(c)
            })
        },
        textAppendChar(c){
            this.element.appendChar(c, this.cursorIndex)
            console.log(this.cursorIndex)
            this.cursorIndex = this.cursorIndex + 1
            console.log(this.cursorIndex)
            
        },
        focusText(e){
            if (e){
                let chars = this.element.getChars()
                let rect = this.$refs.textContainer.getBoundingClientRect()
                let x = e.clientX - rect.left, y = e.clientY - rect.top
                let mainIndex = 0
                let minDistance = Infinity
                chars.forEach((c, index) => {
                    if (minDistance === 0) return

                    if (c.position.left <= x && x <= c.position.left + c.size.width
                        && c.position.top <= y && y <= c.position.top + c.size.height){
                        minDistance = 0
                        mainIndex = index
                    } else {
                        let distance = (x - (c.position.left + c.size.width / 2)) * (x - (c.position.left + c.size.width / 2))
                            + (y - (c.position.top + c.size.height / 2)) * (y - (c.position.top + c.size.height / 2))
                        if (distance < minDistance){
                            minDistance = distance
                            mainIndex = index
                        }
                    }
                })
                this.$refs.textarea.focus()
                this.cursorIndex = mainIndex
            }
        },
        resizeElement(size){
            this.$emit("resize", size)
        },
        moveElement(e, rect){
            this.$emit("move", e, rect)
        },
        keydown(e){
            let nextIndex = this.cursorIndex
            switch (e.keyCode){
                case 37://左方向键
                    nextIndex--
                    break
                case 39://右方向键
                    nextIndex++
                    break
                case 13://回车键
                    this.textAppendChar('\n')
                    e.stopPropagation()
                    e.preventDefault()
                    return
                default:
                    return
            }
            e.stopPropagation()
            e.preventDefault()

            if (nextIndex < 0) nextIndex = 0
            else if (nextIndex > this.element.getChars().length + 1) nextIndex = this.element.getChars().length + 1

            if (this.cursorIndex === nextIndex) return
            this.cursorIndex = nextIndex
        }
    },
    components: {
        TxElement,
        TxCharElement
    }
}
</script>

<style lang="less" scoped>
.tx-element-text{
    cursor: text;
    position: absolute;
    width: 100%;
    height: 100%;
}

.tx-element-text-textarea{
    position: absolute;
    width: 0;
    border: 0;
    padding: 0;
    resize: none;
    
    &:focus{
        outline: 0;
    }
}

.tx-element-text-cursor{
    position: absolute;
    width: 2px;
    background: black;
    animation: cute-cursor .6s linear 0s infinite alternate;
}
@keyframes cute-cursor{
    0%{
        opacity: 0;
    }

    100%{
        opacity: 1;
    }
}
</style>