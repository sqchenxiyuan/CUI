<template>
    <div class="editor-container">
        <div class="editor-toolbar">
            <el-collapse v-model="activeNames">
                <el-collapse-item title="块" name="blocks">
                    <div class="template-block" @mousedown="createBlock">空块</div>
                </el-collapse-item>
                <el-collapse-item title="元素" name="elements">
                    <div class="template-block" @mousedown="createElement($event, 1)">图片</div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div :style="{width: activeElement?undefined:0}" class="tx-editor-element-info">
            <TxEditorElementInfoFrame v-if="activeElement" :element="activeElement" @close="activeElement = null"></TxEditorElementInfoFrame>
        </div>
        <div class="editor-document-preview">
            <TemplateDocument ref="document" :document="document"
                @element-active="elementActive" @element-cancel-active="activeElement = null"></TemplateDocument>
        </div>
    </div>
</template>

<script>
import Document from './template/document.js'
import Block from './template/block.js'
import {
    Element,
    TextElement,
    ImageElement
} from './template/element.js'

//组件
import TemplateDocument from './eidtor/document.vue'
import TxEditorElementInfoFrame from './eidtor/element-info/element-info-frame.vue'

export default {
    data(){
        return {
            document: null,
            activeNames: "blocks",
            activeElement: null //当前选中的元素
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
        },
        createElement(e, type){ //放置图片元素
            let element
            switch (type) {
                case 1:
                    element = new ImageElement()
                    break
            }
            if (!element) return 
            this.$refs.document.dragElement(e, element, e.target.getBoundingClientRect())
        },
        elementActive(element){
            this.activeElement = element
        }
    },
    components: {
        TemplateDocument,
        TxEditorElementInfoFrame
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

    .tx-editor-element-info{
        position: absolute;
        left: 0;
        top: 0;
        width: @toolbar-width;
        bottom: 0;
        background: white;
        transition: width .3s;
        overflow: hidden;
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

