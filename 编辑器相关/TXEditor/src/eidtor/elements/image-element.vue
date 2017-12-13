<template>
    <TxElement :element="element" @resize="resizeElement" @move="moveElement" @active="$emit('active')">
        <div v-if="!element.imageData" class="tx-image-element-default">
            <div class="tx-image-element-image-reupload" @click="selectFile"></div>
        </div>
        <div v-else class="tx-image-element-image-container">
            <img :src="element.imageData" class="tx-image-element-image"/>
            <div class="tx-image-element-image-reupload" @click="selectFile"></div>
        </div>
    </TxElement>
</template>

<script>
import TxBaseElement from "@template/base.js"

import TxElement from "./element.vue"

export default {
    props: {
        element: {
            type: TxBaseElement,
            required: true
        }
    },
    data(){
        return {
            input: document.createElement('input')
        }
    },
    created(){
        this.input.type = 'file'
        this.input.accept = "image/png, image/jpg"
        this.input.onchange = e => {
            this.uploadFile(this.input.files[0])
            this.input.value = ""
        }
    },
    methods: {
        selectFile(e){
            this.input.click()
            e.stopPropagation()
        },
        uploadFile(file){
            let fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = e => {
                this.element.imageData = fileReader.result
            }
        },
        resizeElement(size){
            this.$emit("resize", size)
        },
        moveElement(e, rect){
            this.$emit("move", e, rect)
        }
    },
    components: {
        TxElement
    }
}
</script>

<style lang="less" scoped>
.tx-image-element-default{
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 255, 0.5)
}

.tx-image-element-image-container{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;

    .tx-image-element-image{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;//TODO: 自适应
        // height: 100%;
    }

    
}

.tx-image-element-default,.tx-image-element-image-container{
    &:hover{
        .tx-image-element-image-reupload{
            display: block;
        }
    }
}

.tx-image-element-image-reupload{
    display: none;
    cursor: pointer;
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    line-height: 50px;
    border: 1px solid red;
    border-radius: 50%;

    &:hover{
        background: rgba(255, 0, 0, 0.5);
    }
}
</style>

