import TxBaseElement from './base.js'
import TxPage from './page.js'

class TxDocument extends TxBaseElement{
    constructor(){
        super()
        this.type = 1
        this.appendPage(new TxPage())
    }

    getPages(){
        return this.children.filter(c => c instanceof TxPage)
    }

    appendPage(page, index = this.children.length){
        if (page instanceof TxPage){
            this.appendChild(page, index)
        } else {
            throw new TypeError("page must be a TxPage")
        }
    }

    removePage(index){
        this.removeChild(index)
    }
}

export default TxDocument