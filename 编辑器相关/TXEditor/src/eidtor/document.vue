<template>
    <div class="document-preview-container" @click="cancelActiveElement">
        <div ref="wheel-event-handler"></div>
        <template v-for="(page, index) in pages" >
            <div class="append-new-page" v-if="index === 0"  :key="index" @click="appendNewPage(index)">
                <hr>
            </div>
            <TemplatePage ref="pages" :key="index" :page="page"
                @dragBlock="dragBlock" @element-move="dragElement" @element-active="elementActive"></TemplatePage>
            <div class="append-new-page" :key="index + 1" @click="appendNewPage(index + 1)">
                <hr>
            </div>
        </template>
    </div>
</template>

<script>
import Document from '../template/document.js'

//组件
import TemplatePage from './page.vue'

export default {
    props: {
        document: Document
    },
    computed: {
        pages(){
            return this.document.pages
        }
    },
    methods: {
        appendNewPage(index){
            this.document.appendNewPage(index)
        },
        movingBlock(e){
            let pages = this.$refs.pages
            pages.forEach(p => p.movingBlock(e))
        },
        insertBlock(e, block){
            let pages = this.$refs.pages
            pages.forEach(p => p.insertBlock(e, block))
        },
        dragBlock(e, block, blockRect){ //开始放置块
            //构建块
            let moveBlock = document.createElement("div")
            let blockLeft, blockTop
            moveBlock.className = "moving-template-block"
            if (blockRect){
                blockTop = blockRect.top
                blockLeft = blockRect.left
            } else { //以鼠标为中心
                blockTop = e.clientY - 25
                blockLeft = e.clientX - 40
            }
            moveBlock.style.width = '80px'
            moveBlock.style.height = '50px'
            moveBlock.style.top = blockTop + 'px'
            moveBlock.style.left = blockLeft + 'px'
            
            document.body.appendChild(moveBlock)
            
            //记录初始数据
            let startX = e.clientX
            let startY = e.clientY
            let startBlockPositionX = blockLeft
            let startBlockPositionY = blockTop

            let mousemove = e => {
                let nowBlockPositionX = e.clientX - startX + startBlockPositionX
                let nowBlockPositionY = e.clientY - startY + startBlockPositionY

                moveBlock.style.left = nowBlockPositionX + 'px'
                moveBlock.style.top = nowBlockPositionY + 'px'
                this.movingBlock(e)
            }

            let mouseup = e => {
                moveBlock.parentElement.removeChild(moveBlock)
                document.removeEventListener("selectstart", disSelect)
                document.removeEventListener("mousemove", mousemove)
                document.removeEventListener("mouseup", mouseup)
                this.insertBlock(e, block)
            }

            let disSelect = function(e){
                e.returnValue = false
            }
            
            document.addEventListener("mouseup", mouseup)
            document.addEventListener("mousemove", mousemove)
            document.addEventListener("selectstart", disSelect)
        },
        movingElement(e, element, offsets){
            let pages = this.$refs.pages
            pages.forEach(p => p.movingElement(e, element, offsets))
        },
        insertElement(e, element, offsets){
            let pages = this.$refs.pages
            pages.forEach(p => p.insertElement(e, element, offsets))
        },
        dragElement(e, element, elementRect){
            //构建元素
            let moveBlock = document.createElement("div")
            let blockLeft, blockTop
            moveBlock.className = "moving-template-block"
            if (elementRect){
                blockTop = elementRect.top
                blockLeft = elementRect.left
            } else { //以鼠标为中心
                blockTop = e.clientY - element.size.width / 2
                blockLeft = e.clientX - element.size.height / 2
            }
            moveBlock.style.width = element.size.width + 'px'
            moveBlock.style.height = element.size.height + 'px'
            moveBlock.style.top = blockTop + 'px'
            moveBlock.style.left = blockLeft + 'px'
            
            let offsets = {
                top: e.clientY - blockTop,
                left: e.clientX - blockLeft
            }
            document.body.appendChild(moveBlock)
            
            //记录初始数据
            let startX = e.clientX
            let startY = e.clientY
            let startBlockPositionX = blockLeft
            let startBlockPositionY = blockTop

            let mousemove = e => {
                let nowBlockPositionX = e.clientX - startX + startBlockPositionX
                let nowBlockPositionY = e.clientY - startY + startBlockPositionY

                moveBlock.style.left = nowBlockPositionX + 'px'
                moveBlock.style.top = nowBlockPositionY + 'px'
                this.movingElement(e, element, offsets)
            }

            let mouseup = e => {
                moveBlock.parentElement.removeChild(moveBlock)
                document.removeEventListener("selectstart", disSelect)
                document.removeEventListener("mousemove", mousemove)
                document.removeEventListener("mouseup", mouseup)
                this.insertElement(e, element, offsets)
            }

            let disSelect = function(e){
                e.returnValue = false
            }
            
            document.addEventListener("mouseup", mouseup)
            document.addEventListener("mousemove", mousemove)
            document.addEventListener("selectstart", disSelect)
        },
        elementActive(element){
            this.$emit("element-active", element)
        },
        cancelActiveElement(){
            this.$emit("element-cancel-active")
        }
    },
    components: {
        TemplatePage
    }
}
</script>

<style lang="less" scoped>
.document-preview-container{
    box-sizing: border-box;
    padding: 20px;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    overflow: auto;
}

.append-new-page{
    cursor: pointer;
    height: 20px;
    padding: 10px;
    hr{
        cursor: pointer;
        border: 1.5px dashed white;
    }
}

</style>

<style lang="less">
.moving-template-block{
    cursor: move;
    z-index: 100;
    position: fixed;
    background: red;
    pointer-events: none;
}
</style>
