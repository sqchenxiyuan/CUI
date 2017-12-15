import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import Txeditor from '@src/txeditor.vue'
// new Vue({
//     el: "#test",
//     template: "<Txeditor></Txeditor>",
//     components: {
//         Txeditor
//     }
// })

import editor from '@src/text-editor.vue'
new Vue({
    el: "#test",
    template: "<editor></editor>",
    components: {
        editor
    }
})