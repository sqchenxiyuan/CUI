<template>
    <TextEditor :initData="initData"></TextEditor>
</template>

<script>
import TextEditor from "./text-editor/editor.vue"

export default {
    data(){
        return {
            initData: ""
        }  
    },
    components: {
        TextEditor
    }
}
</script>
