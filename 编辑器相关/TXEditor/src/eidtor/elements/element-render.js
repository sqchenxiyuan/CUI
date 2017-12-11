import Element from "@template/element.js"

import TxImageElement from './image-element.vue'

export default {
    functional: true,
    props: {
        element: {
            type: Element,
            required: true
        }
    },
    render(createElement, context){
        let component
        let element = context.props.element
        switch (element.eType){
            case 1: 
                component = TxImageElement
                break
        }
        context.data.props = context.props
        return createElement(component, context.data, context.children)
    }
}

