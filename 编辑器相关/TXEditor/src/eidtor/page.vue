<template>
    <div ref="page" class="template-page" :style="pageStyle">
        <template v-for="(block,index) in page.getBlocks()">
            <hr v-if="insertBlockState && insertBlockIndex === index" :key="index" />
            <TemplateBlock ref="blocks" :key="index" :block="block"
                @drag="dragBlock(index, arguments[0], arguments[1])" @delete="deleteBlock(index)" 
                @element-move="elementMove" @element-active="elementActive"></TemplateBlock>
        </template>
        <hr v-if="insertBlockState && insertBlockIndex === page.getBlocks().length" :key="page.getBlocks().length" />            
    </div>
</template>

<script>
import Page from "../template/page.js"
import Block from "../template/block.js"

import TemplateBlock from "./block.vue"

export default {
    props: {
        page: {
            type: Page,
            required: true,
        }
    },
    data(){
        return {
            //插入块时标记插入位置的变量
            insertBlockState: false, //是否正在插入
            insertBlockIndex: 0, //插入的位置
        }
    },
    computed: {
        pageStyle(){
            let pageSize = this.page.size
            return {
                width: pageSize.width + 'px',
                minHeight: pageSize.height + 'px',
                padding: '20px'
            }
        }
    },
    methods: {
        movingBlock(e){
            let page = this.$refs.page
            let pageRect = page.getBoundingClientRect()
            if (e.clientX > pageRect.left && e.clientX < pageRect.right
                && e.clientY < pageRect.bottom && e.clientY > pageRect.top){
                this.insertBlockState = true

                let blocks = this.$refs.blocks
                if (blocks){
                    let blocksRect = blocks.map(blocks => blocks.$el.getBoundingClientRect())
                    let lastIndex = 0
                    for (; lastIndex < blocksRect.length; lastIndex++){
                        let rect = blocksRect[lastIndex]
                        if (rect.top + rect.height / 2 > e.clientY) break
                    }
                    this.insertBlockIndex = lastIndex
                } else {
                    this.insertBlockIndex = 0
                }
            } else {
                this.insertBlockState = false
            }
        },
        insertBlock(e, block){
            this.movingBlock(e)
            if (this.insertBlockState){
                this.page.appendBlock(block, this.insertBlockIndex)
                this.insertBlockState = false
            }
        },
        dragBlock(index, e, target){
            this.$emit("dragBlock", e, this.page.removeBlock(index), target)
        },
        deleteBlock(index){
            this.page.removeBlock(index)
        },
        movingElement(e, element, offsets){
            let blocks = this.$refs.blocks
            if (blocks){
                blocks.forEach(b => b.movingElement(e, element, offsets))
            }
        },
        insertElement(e, element, offsets){
            let blocks = this.$refs.blocks
            if (blocks){
                blocks.forEach(b => b.insertElement(e, element, offsets))
            }
        },
        elementMove(e, element, currentTarget){
            this.$emit("element-move", e, element, currentTarget)
        },
        elementActive(element){
            this.$emit("element-active", element)
        }
    },
    components: {
        TemplateBlock
    }
}
</script>

<style lang="less" scoped>
.template-page{
    background: white;
    margin: auto;
    box-shadow: 0px 0px 10px 2px black;
}
</style>
