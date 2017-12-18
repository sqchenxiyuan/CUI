<template>
    <div>
        <el-row>
            <el-checkbox :value="bold" label="加粗" @change="blodChange"></el-checkbox>
        </el-row>
        <TextEditor ref="text" :initData="initData" :charStyle="charStyle" @styleChange="styleChange"></TextEditor>
    </div>
</template>

<script>
import TextEditor from "./text-editor/editor.vue"
import { CharStyle } from "./text-editor/text.js"

export default {
    data(){
        return {
            initData: "",
            charStyle: new CharStyle()
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
        }
    },
    components: {
        TextEditor
    }
}
</script>
