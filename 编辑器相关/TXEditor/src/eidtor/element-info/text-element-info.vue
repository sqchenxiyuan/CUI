<template>
    <el-collapse v-model="activeNames" @click.native="clickText">
        <el-collapse-item title="变量集合" name="data">
            <el-row v-for="variable in variables" :key="variable.id">
                <el-col :span="5">
                    {{variable.id}}:
                </el-col>
                <el-col :span="14">
                    <el-input @click.native.stop="" v-model="variable.value" placeholder=""></el-input>
                </el-col>
                <el-col :span="5">
                    <el-button type="" @click="appendVariable(variable)">插入</el-button>
                </el-col>
            </el-row>
            <el-button type="success" @click="createVariable">新建变量</el-button>
        </el-collapse-item>
    </el-collapse>
</template>

<script>
import { TextVariable } from "../../text-editor/text.js"

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
    computed: {
        variables(){
            return window._textStyleBus.variables
        },
        activeText(){
            return window._textStyleBus.activeText
        }
    },
    created(){
    },
    methods: {
        createVariable(){
            return window._textStyleBus.variables.push(new TextVariable())
        },
        clickText(){
            this.$nextTick(_ => {
                window._textStyleBus.activeText.activeEditor()
            })
        },
        appendVariable(v){
            window._textStyleBus.activeText.appendVariable(v)
        }
    }
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
