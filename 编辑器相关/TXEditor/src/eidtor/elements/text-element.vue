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
            if (this.cursorIndex === 0){
                let h
                if (this.element.getChars().length > 0){
                    let char = this.element.getChars()[0]
                    h = char.size.width
                }
            } else {
                let char = this.element.getChars()[this.cursorIndex - 1]
                if (char){
                    x = char.position.left + char.size.width
                    y = char.position.top
                    h = char.size.height
                }
            }
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
                this.element.appendChar(new CharElement(c), this.cursorIndex)
            })
            this.cursorIndex += this.element.getChars().length - oldLength
        },
        focusText(e){
            console.log(e)
            if (e){
                let chars = this.element.getChars()
                let rect = this.$refs.textContainer.getBoundingClientRect()
                let x = e.clientX - rect.left, y = e.clientY - rect.top
                let mainIndex = null
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
                this.cursorIndex = mainIndex
            }
            this.$refs.textarea.focus()
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
            }

            if (nextIndex < 0) nextIndex = 0
            else if (nextIndex > this.element.getChars().length) nextIndex = this.element.getChars().length

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