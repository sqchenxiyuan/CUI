<template>
    <div class="tx-eidtor-element-info-frame">
        <div class="tx-eidtor-element-info-frame-title">{{elementTypeName}}</div>
        <div class="tx-editor-element-info-frame-body"></div>
        <div class="tx-editor-element-info-frame-footer">
            <el-button type="danger" @click="deleteElement">删除</el-button>
            <el-button type="success" @click="close">完成</el-button>
        </div>
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
    computed: {
        elementTypeName(){
            switch (this.element.eType){
                case 1: return "图片元素"
            }
        }
    },
    methods:{
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
    overflow: auto;
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
