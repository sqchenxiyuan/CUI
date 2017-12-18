<template>
    <div>
        <el-row>
            <el-checkbox :value="bold" label="加粗" @change="blodChange"></el-checkbox>
            <el-button @click="appendVariable">添加变量</el-button>
        </el-row>
        <TextEditor ref="text" :initData="initData" :charStyle="charStyle" @styleChange="styleChange"></TextEditor>
        <el-row v-for="(v,index) in variables" :key="v.id">
            {{v.id}}:
            <el-input v-model="v.value" placeholder="" @input="variableChange(index, arguments[0])"></el-input>
        </el-row>
    </div>
</template>

<script>
import TextEditor from "./text-editor/editor.vue"
import { 
    TextChar,
    TextVariable,
    CharStyle } from "./text-editor/text.js"

export default {
    data(){
        return {
            initData: "",
            charStyle: new CharStyle(),
            variables: []
        }  
    },
    computed: {
        bold(){
            if (this.charStyle.fontWeight === "normal") return false
            return true
        }
    },
    watch: {
        charStyle: {
            deep: true,
            handler(){
                this.$refs.text.activeText()
            }
        }
    },
    methods: {
        blodChange(nv){
            if (nv){
                this.charStyle.fontWeight = "bold"
            } else {
                this.charStyle.fontWeight = "normal"
            }
        },
        styleChange(style){
            this.charStyle = style
        },
        appendVariable(){
            let id = Date.now()
            let value = parseInt(Math.random() * 10000) + ''
            this.variables.push({
                id,
                value
            })
            this.$refs.text.text.appendText(new TextVariable(id, value, new CharStyle()))
            this.$refs.text.text.renderChars()
        },
        variableChange(index, nv){
            this.$refs.text.text.setVariableValueById(this.variables[index].id, nv)
            this.$refs.text.text.renderChars()
        }
    },
    components: {
        TextEditor
    }
}
</script>
