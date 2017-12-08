<template>
    <div class="tx-block" :style="blockStyle" @mouseenter="mouseEnterBlock" @mouseleave="mouseLeaveBlock">
        <div :style="{opacity:state > 0 ? 1:0}" class="tx-block-drag-handler" @mousedown="dragBlock"></div>
        <div :style="{opacity:state > 0 ? 1:0}" class="tx-block-delete-handler" @click="deleteBlock"></div>
        <span v-if="block.elements.length === 0" style="color:#888">拖入元素{{block.id}}</span>
    </div>
</template>

<script>
import Block from "../template/block.js"

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
        }
    }
}
</script>

<style lang="less" scoped>
.tx-block{
    position: relative;
    box-sizing: border-box;
    border: 1px dotted rgba(0,0,0,0);

    &:hover{
        border: 1px dotted gray;
    }

    &.active{
        border: 1px solid green;
    }
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

