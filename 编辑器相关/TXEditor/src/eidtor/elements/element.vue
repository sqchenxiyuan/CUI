<template>
    <div class="tx-element" :style="elementStyle" @mousedown="moveElement" @click.stop="selectElement">
        <div class="tx-element-handles">
            <div class="tx-element-resize-height" @mousedown.stop="resizeElement($event, false, true)"></div>
            <div class="tx-element-resize-width" @mousedown.stop="resizeElement($event, true, false)"></div>
            <div class="tx-element-resize-freedom" @mousedown.stop="resizeElement($event, true, true)"></div>
        </div>
        <div v-if="resizing" class="tx-element-resize-preview" :style="resizeReviewStyle"></div>
        <slot></slot>
    </div>
</template>

<script>
import Element from "@template/element.js"

export default {
    props: {
        element: {
            type: Element,
            required: true
        }
    },
    data(){
        return {
            //调整大小相关
            resizing: false,
            resizeWidth: 0,
            resizeHeight: 0
        }
    },
    computed: {
        elementStyle(){
            let element = this.element
            return {
                width: element.size.width + 'px',
                height: element.size.height + 'px',
                top: element.position.top + 'px',
                left: element.position.left + 'px'
            }
        },
        resizeReviewStyle(){
            return {
                width: this.resizeWidth + 'px',
                height: this.resizeHeight + 'px',
            }
        }
    },
    methods: {
        resizeElement(e, resizeX = true, resizeY = true){
            this.resizing = true
            let startX = e.clientX
            let startY = e.clientY
            let element = this.element
            let startElementWidth = element.size.width
            let startElementHeight = element.size.height

            this.resizeWidth = startElementWidth
            this.resizeHeight = startElementHeight

            let mousemove = e => {
                if (resizeX) this.resizeWidth = e.clientX - startX + startElementWidth
                if (resizeY) this.resizeHeight = e.clientY - startY + startElementHeight
            }

            let mouseup = e => {
                this.resizing = false
                document.removeEventListener("selectstart", disSelect)
                document.removeEventListener("mousemove", mousemove)
                document.removeEventListener("mouseup", mouseup)
                this.$emit("resize", {
                    width: this.resizeWidth,
                    height: this.resizeHeight
                })
            }

            let disSelect = function(e){
                e.returnValue = false
            }
            
            document.addEventListener("mouseup", mouseup)
            document.addEventListener("mousemove", mousemove)
            document.addEventListener("selectstart", disSelect)
        },
        moveElement(e){
            let currentTarget = e.currentTarget
            let mousemove = e => {
                if (e.movementX === 0 || e.movementY === 0) return
                this.$emit("move", e, currentTarget)
                document.removeEventListener("selectstart", disSelect)
                document.removeEventListener("mousemove", mousemove)
                document.removeEventListener("mouseup", mouseup)
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
        selectElement(){
            this.$emit("active")
        }
    }
}
</script>

<style lang="less" scoped>
.tx-element{
    position: absolute;
    box-sizing: border-box;
    
    & .tx-element-handles{
        display: none;
    }

    &:hover{
        & .tx-element-handles{
            display: block;
        }
        outline: 1px solid green;
    }
}

@tx-element-resize-handler-size:9px;
@tx-element-resize-handler-size-hover:15px;

.tx-element-resize-handler(){
    cursor: pointer;
    width: @tx-element-resize-handler-size;
    height: @tx-element-resize-handler-size;
    border-radius: 50%;
    background: black;

    &:hover{
        width: @tx-element-resize-handler-size-hover;
        height: @tx-element-resize-handler-size-hover;
    }
}

.tx-element-resize-height{
    .tx-element-resize-handler();
    cursor: s-resize;
    position: absolute;
    bottom: -(@tx-element-resize-handler-size / 2);
    left: -(@tx-element-resize-handler-size / 2);

    &:hover{
        bottom: -(@tx-element-resize-handler-size-hover / 2);
        left: -(@tx-element-resize-handler-size-hover / 2);
    }
}

.tx-element-resize-width{
    .tx-element-resize-handler();
    cursor: e-resize;
    position: absolute;
    top: -(@tx-element-resize-handler-size / 2);
    right: -(@tx-element-resize-handler-size / 2);

    &:hover{
        top: -(@tx-element-resize-handler-size-hover / 2);
        right: -(@tx-element-resize-handler-size-hover / 2);
    }
}

.tx-element-resize-freedom{
    .tx-element-resize-handler();
    cursor: nw-resize;
    position: absolute;
    bottom: -(@tx-element-resize-handler-size / 2);
    right: -(@tx-element-resize-handler-size / 2);

    &:hover{
        bottom: -(@tx-element-resize-handler-size-hover / 2);
        right: -(@tx-element-resize-handler-size-hover / 2);
    }
}

.tx-element-move-handler{
    cursor: move;
    position: absolute;
    width:10px;
    height: 10px;
    top: -5px;
    left: -5px;
    background: black;
}

.tx-element-resize-preview{
    position: absolute;
    top:0;
    left:0;
    outline: 1px dashed green;
}
</style>
