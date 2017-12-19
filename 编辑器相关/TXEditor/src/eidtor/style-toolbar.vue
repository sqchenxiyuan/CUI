<template>
    <div>
        <el-checkbox :value="bold" label="加粗" @change="blodChange"></el-checkbox>
    </div>
</template>

<script>
export default {
    props: {
        charStyle: Object
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
                window._textStyleBus.activeText.activeEditor()
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
        }
    }
}
</script>
