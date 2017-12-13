import TxBaseElement from "@template/base.js"
import TxImageElement from './image-element.vue'
import TxTextElement from './text-element.vue'

export default {
    functional: true,
    props: {
        element: {
            type: TxBaseElement,
            required: true
        }
    },
    render(createElement, context){
        let component
        let element = context.props.element
        switch (element.eType){
            case 100: 
                component = TxTextElement
                break
            case 102: 
                component = TxImageElement
                break
        }
        context.data.props = context.props
        return createElement(component, context.data, context.children)
    }
}

