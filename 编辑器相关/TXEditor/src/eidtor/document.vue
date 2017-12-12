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
import TxDocument from '@template/document.js'
import TxPage from '@template/page.js'

//组件
import TemplatePage from './page.vue'

export default {
    props: {
        document: TxDocument
    },
    computed: {
        pages(){
            return this.document.getPages()
        }
    },
    methods: {
        appendNewPage(index){
            this.document.appendPage(new TxPage(), index)
        },
        movingBlock(e){
            let pages = this.$refs.pages
            pages.forEach(p => p.movingBlock(e))
        },
        insertBlock(e, block){
            let pages = this.$refs.pages
            pages.forEach(p => p.insertBlock(e, block))
        },
        dragBlock(e, block, currentTarget){ //开始放置块
            //构建块
            let moveBlock = currentTarget.cloneNode(true)
            let blockRect = currentTarget.getBoundingClientRect()
            let blockLeft, blockTop
            blockTop = e.clientY
            blockLeft = e.clientX
            moveBlock.style.position = "fixed"
            moveBlock.style.width = blockRect.width + 'px'
            moveBlock.style.height = blockRect.height + 'px'
            moveBlock.style.top = blockTop + 'px'
            moveBlock.style.left = blockLeft + 'px'
            moveBlock.classList.add("moving-template-block")
            document.body.appendChild(moveBlock)
            if (blockRect){
                moveBlock.style.transform = `translate(${blockRect.left - blockLeft}px, ${blockRect.top - blockTop}px)`
                setTimeout(_ => {
                    moveBlock.style.transform = ""
                }, 1)
            }
            
            document.body.style.cursor = "move"

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
        dragElement(e, element, currentTarget){
            //构建元素
            let moveElement = currentTarget.cloneNode(true)
            let elementRect = currentTarget.getBoundingClientRect()
            let blockLeft, blockTop
            blockTop = e.clientY
            blockLeft = e.clientX

            moveElement.style.width = element.size.width + 'px'
            moveElement.style.height = element.size.height + 'px'
            moveElement.style.top = blockTop + 'px'
            moveElement.style.left = blockLeft + 'px'
            moveElement.classList.add("moving-template-block")
            document.body.appendChild(moveElement)
            if (elementRect){
                moveElement.style.transform = `translate(${elementRect.left - blockLeft}px, ${elementRect.top - blockTop}px)`
                setTimeout(_ => {
                    moveElement.style.transform = ""
                }, 1)
            }

            let offsets = {
                top: e.clientY - blockTop,
                left: e.clientX - blockLeft
            }
            
            //记录初始数据
            let startX = e.clientX
            let startY = e.clientY
            let startBlockPositionX = blockLeft
            let startBlockPositionY = blockTop

            let mousemove = e => {
                let nowBlockPositionX = e.clientX - startX + startBlockPositionX
                let nowBlockPositionY = e.clientY - startY + startBlockPositionY

                moveElement.style.left = nowBlockPositionX + 'px'
                moveElement.style.top = nowBlockPositionY + 'px'
                this.movingElement(e, element, offsets)
            }

            let mouseup = e => {
                moveElement.parentElement.removeChild(moveElement)
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
    z-index: 100;
    margin: 0;
    position: fixed;
    transition: transform .3s;
    pointer-events: none;
}
</style>
