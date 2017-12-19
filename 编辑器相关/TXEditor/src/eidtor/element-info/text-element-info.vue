<template>
    <el-collapse v-model="activeNames">
        <el-collapse-item title="文本样式" name="data">
        </el-collapse-item>
    </el-collapse>
</template>

<script>
import TxBaseElement from "@template/base.js"

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
    created(){
    },
    methods: {
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
