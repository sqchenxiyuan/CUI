<template>
    <el-collapse v-model="activeNames">
        <el-collapse-item title="图片数据" name="data">
            <div class="tx-image-element-info-image-preview">
                <img v-if="element.imageData" :src="element.imageData"></img>
                <div :style="{display: element.imageData?undefined: 'block'}" class="tx-image-element-info-image-upload" @click="selectFile"></div>
            </div>
        </el-collapse-item>
    </el-collapse>
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
            activeNames: "data",
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
        }
    },
}
</script>

<style lang="less" scoped>
.tx-image-element-info-image-preview{
    position: relative;
    display: block;
    width: 80%;
    min-height: 100px;
    margin: auto;

    img{
        width: 100%;
    }

    &:hover{
        .tx-image-element-info-image-upload{
            display: block;
        }
    }

    .tx-image-element-info-image-upload{
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
}
</style>
