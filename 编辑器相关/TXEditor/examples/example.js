import Txeditor from '@src/txeditor.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

new Vue({
    el: "#test",
    template: "<Txeditor></Txeditor>",
    components: {
        Txeditor
    }
})