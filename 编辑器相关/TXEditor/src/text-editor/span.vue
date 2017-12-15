<template>
  <span class="tx-td-span" :style="charStyle">{{span.value}}</span>
</template>

<script>

export default {
    props: {
        span: Object
    },
    computed: {
        charStyle(){
            let span = this.span
            let style = span.style
            return {
                top: span.view.top + 'px',
                left: span.view.left + 'px',
                width: span.view.width + 'px',
                height: span.view.height + 'px',
                fontSize: style.fontSize + 'px',
                lineHeight: style.fontSize + 'px',
                fontFamily: style.fontFamily
            }
        }
    }
}
</script>

<style lang="less" scoped>
.tx-td-span{
    position: absolute;
}
</style>