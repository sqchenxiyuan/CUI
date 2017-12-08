<template>
    <div class="editor-container">
        <div class="editor-toolbar">
            <el-collapse v-model="activeNames">
                <el-collapse-item title="块" name="blocks">
                    <div class="template-block" @mousedown="createBlock">空块</div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="editor-document-preview">
            <TemplateDocument ref="document" :document="document"></TemplateDocument>
        </div>
    </div>
</template>

<script>
import Document from './template/document.js'
import Block from './template/block.js'

//组件
import TemplateDocument from './eidtor/document.vue'

export default {
    data(){
        return {
            document: null,
            activeNames: "blocks"
        }
    },
    created(){
        this.document = new Document()
    },
    methods: {
        appendNewPage(index){
            this.template.appendNewPage(index)
        },
        createBlock(e){ //开始放置块
            this.$refs.document.dragBlock(e, new Block(), e.target.getBoundingClientRect())
        }
    },
    components: {
        TemplateDocument
    }
}
</script>

<style lang="less">
html, body{
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
}

@toolbar-width:300px;

.editor-container{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: auto;

    .editor-toolbar{
        position: absolute;
        left: 0;
        top: 0;
        width: @toolbar-width;
        bottom: 0;
    }

    .editor-document-preview{
        position: absolute;
        left: @toolbar-width;
        top: 0;
        right: 0;
        bottom: 0;
    }
}

.template-block{
    cursor: move;
    margin: 10px;
    width: 80px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1px solid black;
}

</style>

