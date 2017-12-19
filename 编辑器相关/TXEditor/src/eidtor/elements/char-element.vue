<template>
  <span class="tx-element-char" :style="charStyle">{{element.char}}</span>
</template>

<script>
import {CharElement} from "@template/elements.js"

export default {
    props: {
        element: {
            type: CharElement,
            required: true
        }
    },
    computed: {
        charStyle(){
            let element = this.element
            let style = element.style
            return {
                top: element.position.top + 'px',
                left: element.position.left + 'px',
                width: element.size.width + 'px',
                height: element.size.height + 'px',
                fontSize: style.fontSize + 'px',
                lineHeight: style.fontSize + 'px',
                fontFamily: style.fontFamily
            }
        }
    }
}
</script>

<style lang="less" scoped>
.tx-element-char{
    position: absolute;
}
</style>
