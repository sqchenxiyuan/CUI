import Page from './page'
import uuidv4 from 'uuid/v4'

class Document{
    constructor(){
        this.id = uuidv4()
        this.pages = []
        this.pages.push(new Page())
    }

    appendNewPage(index){
        this.pages.splice(index, 0, new Page())
    }

}

export default Document