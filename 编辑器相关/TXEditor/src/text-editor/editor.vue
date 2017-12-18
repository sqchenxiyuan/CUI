<template>
    <div class="tx-td-container" ref="textContainer" @click.stop.prevent="" @mousedown="mousedown">
        <p v-for="(section,index) in sections" :key="index" class="tx-td-section" :style="{
                top:section.view.top + 'px',
                left:section.view.left + 'px'
            }">
            <span v-for="(line,index) in section.getLines()" :key="index" class="tx-td-line" :style="{
                top:line.view.top + 'px',
                left:line.view.left + 'px'
            }">
                <TxdSpan v-for="(char,index) in line.getChars()" :key="index" :span="char"></TxdSpan>
            </span>
        </p>
        <div v-for="(rect,index) in selectRects" :key="'rect_'+index" class="tx-td-selectblock" :style="{
                top:rect.top + 'px',
                left:rect.left + 'px',
                width:rect.width + 'px',
                height:rect.height + 'px',
            }"></div>
        <div v-if="cursorActive" class="tx-td-cursor" :key="Math.random()" :style="cursorStyle"></div>
        <textarea ref="textarea" class="tx-td-textarea" :style="cursorStyle" @input="inputText" 
            @keydown="keydown" @copy="copy" @paste="paste" @blur="textareablur"></textarea>
    </div>
</template>

<script>
import Text from "./text.js"
import { CharStyle } from "./text.js"

import TxdSpan from './span.vue'

export default {
    props: {
        initData: {
            default: ""
        },
        charStyle: {
            default: new CharStyle()
        }
    },
    data(){
        return {
            text: new Text(),
            cursorActive: false,
            cursorIndex: 0,
            cursorWarp: true, //换行的开头，光标是在上一行还是这一行   true为这一行 false为上一行
            selectRange: null,
            chars: []
        }
    },
    computed: {
        sections(){
            return this.text.getSections()
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
    created(){
        this.text.setView({
            width: 100
        })
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
            if (!this.cursorActive || !e){
                this.cursorActive = true
            } else {
                let rect = this.$refs.textContainer.getBoundingClientRect()
                let x = e.clientX - rect.left
                let y = e.clientY - rect.top
                this.cursorWarp = false
                this.cursorIndex = this.text.getCursorIndexByPoint({
                    x,
                    y
                })
                let style = this.text.getCharStyleAt(this.cursorIndex)
                if (style) this.$emit("styleChange", style)
            }
            this.$refs.textarea.focus()
        },
        inputText(e){
            let newText = this.$refs.textarea.value
            this.$refs.textarea.value = ""
            this.cursorIndex = this.text.appendChars(newText, this.cursorIndex, this.charStyle)
            this.text.computeSections()
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
                if (this.selectRange){
                    this.cursorIndex = this.text.deleteCharsInRange(this.selectRange)
                    this.selectRange = null
                } else {
                    this.cursorIndex = this.text.deleteChar(this.cursorIndex)
                }
                this.text.computeSections()
            }
        },
        copy(e){
            let chars = this.text.getCharsInRange(this.selectRange)
            let text = chars.map(c => c.value).join("")
            let json = chars.map(c => {
                return {
                    value: c.value,
                    style: c.style
                }
            })
            e.clipboardData.setData('text/plain', text)
            e.clipboardData.setData('json/tx', JSON.stringify(json))
            e.preventDefault()
        },
        paste(e){
            if (e.clipboardData.types.find(t => t === "json/tx")){
                try {
                    let chars = JSON.parse(e.clipboardData.getData('json/tx'))
                    let lastIndex
                    chars.forEach((c, index) => {
                        lastIndex = this.text.appendChar(c.value, this.cursorIndex + index, c.style)
                    })
                    this.cursorIndex = lastIndex
                } catch (e){
                    console.error(e)
                }
            } else {
                let text = e.clipboardData.getData('text/plain')
                this.cursorIndex = this.text.appendChars(text, this.cursorIndex, this.charStyle)
            }
            this.text.computeSections()
            e.preventDefault()
        },
        textareablur(e){
            this.cursorActive = false
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
    border: 1px solid black;
    // overflow: auto;
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
    z-index: -1;
    position: absolute;
    background: rgba(0,0,0,0.3);
}
</style>
