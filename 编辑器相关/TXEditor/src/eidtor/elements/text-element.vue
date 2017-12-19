<template>
    <TxElementFrame :element="element" @resize="resizeElement" @move="moveElement">
        <TextEditor :textElement="element" :charStyle="charStyle"></TextEditor>
    </TxElementFrame>
</template>

<script>
import TxBaseElement from "@template/base.js"
import TxElementFrame from "./element-frame.vue"
import TextEditor from "../../text-editor/editor.vue"

import { 
    CharStyle
} from "../../text-editor/text.js"

export default {
    props: {
        element: {
            type: TxBaseElement,
            required: true
        }
    },
    watch:{
        'element.size.height'(){
            this.$emit("resize", this.element.size)
        }
    },
    data(){
        return {
            charStyle: new CharStyle()
        }
    },
    methods: {
        resizeElement(size){
            this.$emit("resize", size)
        },
        moveElement(e, rect){
            this.$emit("move", e, rect)
        }
    },
    components: {
        TxElementFrame,
        TextEditor,
    }
}
</script>

<style lang="less" scoped>
.tx-element-text{
    cursor: text;
    position: absolute;
    width: 100%;
    height: 100%;
}

.tx-element-text-textarea{
    position: absolute;
    width: 0;
    border: 0;
    padding: 0;
    resize: none;
    
    &:focus{
        outline: 0;
    }
}

.tx-element-text-cursor{
    position: absolute;
    width: 2px;
    background: black;
    animation: cute-cursor .6s linear 0s infinite alternate;
}
@keyframes cute-cursor{
    0%{
        opacity: 0;
    }

    100%{
        opacity: 1;
    }
}
</style>