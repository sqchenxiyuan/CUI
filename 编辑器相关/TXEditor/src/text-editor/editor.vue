<template>
    <div class="tx-td-container" ref="textContainer" @click="activeText">
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
        <div v-if="cursorIndex >= 0" class="tx-td-cursor" :key="Math.random()" :style="cursorStyle"></div>
        <textarea ref="textarea" class="tx-td-textarea" :style="cursorStyle" @input="inputText" @keydown="keydown"></textarea>
    </div>
</template>

<script>
import Text from "./text.js"

import TxdSpan from './span.vue'

export default {
    props: {
        initData: {
            default: ""
        }
    },
    data(){
        return {
            text: new Text(),
            cursorIndex: 0,
            cursorWarp: true, //换行的开头，光标是在上一行还是这一行   true为这一行 false为上一行
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
        }
    },
    created(){
        this.text.setView({
            width: 100
        })
    },
    methods: {
        activeText(e){
            let rect = this.$refs.textContainer.getBoundingClientRect()
            let x = e.clientX - rect.left
            let y = e.clientY - rect.top
            this.cursorWarp = false
            this.cursorIndex = this.text.getCursorIndexByPoint({
                x,
                y
            })

            this.$refs.textarea.focus()
        },
        inputText(e){
            let newText = this.$refs.textarea.value
            this.$refs.textarea.value = ""
            this.cursorIndex = this.text.appendChars(newText, this.cursorIndex)
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
                this.cursorIndex = this.text.deleteChar(this.cursorIndex)
                this.text.computeSections()
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
    border: 1px solid black;
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
</style>
