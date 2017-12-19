<template>
    <div class="tx-td-container" ref="textContainer" :style="textContainerStyle" @click.stop.prevent="" @mousedown="mousedown">
        <div class="tx-td-span-container">
            <TxdSpan v-for="(char,index) in renderedChars" :key="index" :span="char"></TxdSpan>
            <span v-if="renderedChars.length === 0" class="tx-td-selectblock-info">输入内容</span>
        </div>
        <div class="tx-td-selectblock-container">
            <div v-for="(rect,index) in selectRects" :key="'rect_'+index" class="tx-td-selectblock" :style="{
                top:rect.top + 'px',
                left:rect.left + 'px',
                width:rect.width + 'px',
                height:rect.height + 'px',
            }"></div>
        </div>
        <div v-if="cursorActive" class="tx-td-cursor" :key="Math.random()" :style="cursorStyle"></div>
        <textarea ref="textarea" class="tx-td-textarea" :style="cursorStyle" @input="inputText" 
            @keydown="keydown" @copy="copy" @paste="paste" @blur="textareablur"></textarea>
    </div>
</template>

<script>
import {
    TextElement
} from '../template/elements'

import TextRender from "./text.js"
import { 
    TextChar,
    TextVariable,
    CharStyle
} from "./text.js"

import TxdSpan from './span.vue'

export default {
    props: {
        textElement: {
            type: TextElement,
            required: true
        },
        charStyle: {
            default: new CharStyle()
        }
    },
    data(){
        return {
            text: null,
            cursorActive: false,
            cursorIndex: -1,
            cursorWarp: true, //换行的开头，光标是在上一行还是这一行   true为这一行 false为上一行
            selectRange: null,
            chars: []
        }
    },
    computed: {
        textContainerStyle(){
            let size = this.textElement.size
            return {
                height: size.height + 'px',
                width: size.width + 'px'
            }
        },
        renderedChars(){
            return this.text.getRenderedChars()
        },
        cursorStyle(){
            let view = this.text.getCursorPositon(this.cursorIndex, this.cursorWarp)
            return {
                top: view.top + 'px',
                left: view.left + 'px',
                height: view.height + 'px',
            }
        },
        selectRects(){
            let selectRange = this.selectRange
            if (!selectRange) return []
            let rects = this.text.getRangeRects(selectRange)
            return rects
        }
    },
    watch: {
        'textElement.size.width'(nv){
            this.text.setView({
                width: nv
            })
            this.text.renderChars()
        },
        'text.view.height'(nv){
            if (nv > 50) this.textElement.size.height = nv
            else this.textElement.size.height = 50
        }
    },
    created(){
        this.text = new TextRender(this.textElement.textsData)
        this.text.setView({
            width: this.textElement.size.width
        })
        this.text.renderChars()
    },
    methods: {
        mousedown(e){
            e.stopPropagation()
            e.preventDefault()
            this.activeText(e)
            this.selectRange = [this.cursorIndex, this.cursorIndex]
            
            //记录初始数据
            let startX = e.clientX
            let startY = e.clientY
            let nowX = e.clientX
            let nowY = e.clientY

            let mousemove = e => {
                let dX = e.clientX - startX
                let dY = e.clientY - startY
                if (dX * dX + dY * dY > 10){ //避免抖动
                    this.activeText(e)
                    this.selectRange.splice(1, 1, this.cursorIndex)
                }
            }

            let mouseup = e => {
                document.removeEventListener("selectstart", disSelect)
                document.removeEventListener("mousemove", mousemove)
                document.removeEventListener("mouseup", mouseup)
            }

            let disSelect = function(e){
                e.returnValue = false
            }
            
            document.addEventListener("mouseup", mouseup)
            document.addEventListener("mousemove", mousemove)
            document.addEventListener("selectstart", disSelect)
        },
        activeText(e){
            if (!this.cursorActive && this.cursorIndex >= 0 || !e){
            
            } else {
                let rect = this.$refs.textContainer.getBoundingClientRect()
                let x = e.clientX - rect.left
                let y = e.clientY - rect.top
                this.cursorWarp = false
                let {
                    index,
                    text
                } = this.text.getCursorIndexByPoint({
                    x,
                    y
                })
                this.cursorIndex = index

                let style = this.text.getCharStyleAt(this.cursorIndex)
                if (style) this.$emit("styleChange", style)
            }
            this.cursorActive = true
            this.$refs.textarea.focus()
        },
        inputText(e){
            this.deleteTextInRange()
            let newText = this.$refs.textarea.value
            this.$refs.textarea.value = ""
            let texts = newText.split("").map(char => {
                return new TextChar(char, this.charStyle.clone())
            })
            this.selectRange = null
            this.cursorIndex = this.text.appendTexts(texts, this.cursorIndex)
            this.text.renderChars()
        },
        keydown(e){
            let code = e.keyCode
            if (code >= 37 && code <= 40){
                switch (e.keyCode){
                    case 37://左方向键
                        this.cursorIndex = this.text.cursorMove(this.cursorIndex, -1)
                        this.cursorWarp = true
                        break
                    case 38://上方向键
                        this.cursorIndex = this.text.cursorMove(this.cursorIndex, 0, -1)
                        this.cursorWarp = true
                        break
                    case 39://右方向键
                        this.cursorIndex = this.text.cursorMove(this.cursorIndex, 1)
                        this.cursorWarp = false
                        break
                    case 40://下方向键
                        this.cursorIndex = this.text.cursorMove(this.cursorIndex, 0, 1)
                        this.cursorWarp = true
                        break
                }
                e.stopPropagation()
                e.preventDefault()
            }
            if (code === 8){
                if (!this.deleteTextInRange()){
                    this.cursorIndex = this.text.deleteText(this.cursorIndex)
                }
                this.text.renderChars()
            }
        },
        copy(e){
            let chars = this.text.getCharsInRange(this.selectRange)
            let text = chars.map(c => c.value).join("")
            let json = JSON.stringify(chars)
            e.clipboardData.setData('text/plain', text)
            e.clipboardData.setData('json/tx', json)
            e.preventDefault()
        },
        paste(e){
            this.deleteTextInRange()
            if (e.clipboardData.types.find(t => t === "json/tx")){
                try {
                    let texts = JSON.parse(e.clipboardData.getData('json/tx'))
                    texts = texts.map((text, index) => {
                        switch (text.type){
                            case 0: return new TextChar(text.value, text.style)
                            case 1: return new TextVariable(text.id, text.value, text.style)
                            default: return new TextChar(text.value, text.style)
                        }
                    })
                    this.cursorIndex = this.text.appendTexts(texts, this.cursorIndex)
                } catch (e){
                    console.error(e)
                }
            } else {
                let text = e.clipboardData.getData('text/plain')
                let texts = text.split("").map(char => {
                    return new TextChar(char, this.charStyle.clone())
                })
                this.cursorIndex = this.text.appendTexts(texts, this.cursorIndex)
            }
            this.text.renderChars()
            e.preventDefault()
        },
        textareablur(e){
            this.cursorActive = false
        },
        deleteTextInRange(){
            if (this.selectRange && this.selectRange[0] !== this.selectRange[1]){
                this.cursorIndex = this.text.deleteTextsInRange(this.selectRange)
                this.selectRange = null
                return true
            } else {
                this.selectRange = null
                return false
            }
        }
    },
    components: {
        TxdSpan
    }
}
</script>

<style lang="less" scoped>
.tx-td-container{
    position: relative;
    cursor: text;
    width: 100px;
    height: 100px;
}

.tx-td-textarea{
    position: absolute;
    top:0;
    left: 0;
    width:0;
    height: 0;
    padding: 0;
    height: 0;
    border: 0;

    &:focus{
        outline:0;
    }
}

.tx-td-section, .tx-td-line{
    position: absolute;
    margin: 0;
    padding: 0;
}

.tx-td-cursor{
    position: absolute;
    background: black;
    width: 2px;
    animation: cute-cursor .6s linear .4s infinite alternate;
}
@keyframes cute-cursor{
    0%{
        opacity: 1;
    }

    100%{
        opacity: 0;
    }
}

.tx-td-selectblock{
    position: absolute;
    background: rgba(0,0,0,0.3);
}

.tx-td-selectblock-info{
    font-size: 14px;
    color: #888888;
}
</style>
