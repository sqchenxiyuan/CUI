<template>
    <div class="tx-eidtor-element-info-frame">
        <div class="tx-eidtor-element-info-frame-title">{{elementTypeName}}</div>
        <div class="tx-editor-element-info-frame-body">
            <el-collapse v-model="activeNames">
                <el-collapse-item title="元素尺寸" name="size">
                    宽度：
                    <el-input-number v-model="element.size.width" placeholder="宽" :controls="false">
                    </el-input-number>
                    <br>
                    高度：
                    <el-input-number v-model="element.size.height" placeholder="高" :controls="false">
                    </el-input-number>
                </el-collapse-item>
                <el-collapse-item title="元素位置" name="position">
                    X：
                    <el-input-number v-model="element.position.left" placeholder="X" :controls="false">
                    </el-input-number>
                    <br>
                    Y：
                    <el-input-number v-model="element.position.top" placeholder="Y" :controls="false">
                    </el-input-number>
                </el-collapse-item>
            </el-collapse>
            <component :is="infoElement" :element="element"></component>
        </div>
        <div class="tx-editor-element-info-frame-footer">
            <el-button type="danger" @click="deleteElement">删除</el-button>
            <el-button type="success" @click="close">完成</el-button>
        </div>
    </div>
</template>

<script>
import TxBaseElement from "@template/base.js"

import TxTextElementInfo from "./text-element-info.vue"
import TxImageElementInfo from "./image-element-info.vue"

export default {
    props: {
        element: {
            type: TxBaseElement,
            required: true
        }
    },
    data(){
        return {
            activeNames: ""
        }
    },
    computed: {
        elementTypeName(){
            switch (this.element.eType){
                case 100: return "文本元素"                
                case 102: return "图片元素"
            }
        },
        infoElement(){
            switch (this.element.eType){
                case 100: return null
                case 102: return TxImageElementInfo
            }
        }
    },
    methods: {
        deleteElement(){
            this.element.remove()
            this.close()
        },
        close(){
            this.$emit("close")
        }
    }
}
</script>

<style lang="less" scoped>
@toolbar-width:300px;

.tx-eidtor-element-info-frame{
    position: absolute;
    top:0;
    bottom: 0;
    width: @toolbar-width;
}

.tx-eidtor-element-info-frame-title{
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    text-align: center;
    border-bottom: 1px solid black;
}

.tx-editor-element-info-frame-body{
    position: absolute;
    width: 100%;
    bottom: 110px;
    top: 30px;
    overflow-x: hidden;
    overflow-y: auto;
}

.tx-editor-element-info-frame-footer{
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 110px;
    border-top: 1px solid black;

    .el-button{
        display: block;
        width: 80%;
        margin: 10px auto;
    }
}
</style>
