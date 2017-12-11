<template>
    <div class="tx-block" ref="block" :style="blockStyle" @mouseenter="mouseEnterBlock" @mouseleave="mouseLeaveBlock">
        <div class="tx-block-inner" ref="blockinner" :style="blockInnerStyle">
            <div :style="{opacity:state > 0 ? 1:0}" class="tx-block-drag-handler" @mousedown="dragBlock"></div>
            <div :style="{opacity:state > 0 ? 1:0}" class="tx-block-delete-handler" @click="deleteBlock"></div>
            <span v-if="block.getElementsCount() === 0 && !insertElementObj" style="color:#888">拖入元素{{block.id}}</span>
            <template v-if="insertElementObj">
                <TxElementRender :element="insertElementObj"></TxElementRender>
            </template>
            <TxElementRender v-for="element in block.getElements()" :key="element.id" :element="element"
                @resize="elementResize(element, arguments[0])" @move="elementMove(element, arguments[0], arguments[1])" @active="elementActive(element)"></TxElementRender>
        </div>
    </div>
</template>

<script>
import Block from "../template/block.js"

import TxElementRender from "./elements/element-render.js"

export default {
    props: {
        block: {
            type: Block,
            required: true
        }
    },
    data(){
        return {
            state: 0, //0 展示状态 1 hover 2 active 
            insertElementObj: null, //是否有正准备插入的元素
        }
    },
    computed: {
        blockStyle(){
            let margin = this.block.margin
            let height = this.block.height
            return {
                height: height + 'px',
                margin: margin + 'px'
            }
        },
        blockInnerStyle(){
            let padding = this.block.padding
            return {
                top: padding + 'px',
                bottom: padding + 'px',
                left: padding + 'px',
                right: padding + 'px',
            }
        }
    },
    methods: {
        mouseEnterBlock(){
            if (this.state === 0){
                this.state = 1
            }
        },
        mouseLeaveBlock(){
            if (this.state === 1){
                this.state = 0
            }
        },
        dragBlock(e){
            this.$emit("drag", e)
        },
        deleteBlock(){
            this.$emit("delete")
        },
        movingElement(e, element, offsets = {top: 0, left: 0}){
            let block = this.$refs.block
            let blockRect = block.getBoundingClientRect()

            if (e.clientX > blockRect.left && e.clientX < blockRect.right
                && e.clientY < blockRect.bottom && e.clientY > blockRect.top){
                let top = e.clientY - blockRect.top - offsets.top
                let left = e.clientX - blockRect.left - offsets.left
                let padding = this.block.padding
                element.position = {
                    top: top - padding,
                    left: left - padding
                }

                this.insertElementObj = element
            } else {
                this.insertElementObj = null
            }
        },
        insertElement(e, element, offsets = {top: 0, left: 0}){
            this.movingElement(e, element, offsets)
            if (this.insertElementObj){
                let blockRect = this.$refs.blockinner.getBoundingClientRect()
                let top = element.position.top
                let left = element.position.left
                let width = element.size.width
                let height = element.size.height

                if (width > blockRect.width){
                    width = blockRect.width
                    left = 0
                } else {
                    if (left < 0) left = 0
                    if (left > blockRect.width - width) left = blockRect.width - width
                }

                //高度不需要限制
                if (top < 0) top = 0

                element.position = {top, left}
                element.size = {width, height}

                this.block.appendElement(this.insertElementObj)
                this.insertElementObj = null
            }
            this.computeHeight()
        },
        elementResize(element, size){
            let block = this.$refs.blockinner
            let blockRect = block.getBoundingClientRect()

            if (element.position.left + size.width > block.width) size.width = block.width - element.position.left

            element.size.width = size.width
            element.size.height = size.height
            this.computeHeight()
        },
        elementMove(element, e, rect){
            element.remove()
            this.$emit("element-move", e, element, rect)
        },
        computeHeight(){
            let elements = this.block.getElements()
            let minHeight = 30
            elements.forEach(e => {
                let h = e.size.height + e.position.top
                if (h > minHeight){
                    minHeight = h
                }
            })
            this.block.height = minHeight + this.block.padding * 2
        },
        elementActive(element){ //激活元素
            this.$emit("element-active", element)
        }
    },
    components: {
        TxElementRender
    }
}
</script>

<style lang="less" scoped>
.tx-block{
    position: relative;
    box-sizing: border-box;

    &:hover{
        outline: 1px dotted gray;
    }

    &.active{
        outline: 1px solid green;
    }
}

.tx-block-inner{
    position: absolute;
}

.tx-block-drag-handler{
    cursor: move;
    position: absolute;
    top: 3px;
    margin-right: 5px;
    right: 100%;
    width: 22px;
    height: 22px;
    background: blue;
    transition: opacity .5s;
    transition-delay: .2s;
}

.tx-block-delete-handler{
    cursor: pointer;
    position: absolute;
    top: 3px;
    margin-right: 5px;
    left: 100%;
    width: 22px;
    height: 22px;
    background: red;
    transition: opacity .5s;
    transition-delay: .2s;
}

</style>

