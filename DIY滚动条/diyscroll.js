const CONTAINER_CLASSNAME = "_diy-container"
const CONTENTCONTAINER_CLASSNAME = "_diy-content-container"
const ITEM_ARRAY = []

class Rect{
    constructor(x,y,w,h){
        this.left = x
        this.top = y
        this.width = w
        this.height = h
    }
}

class DIYScroll{

    constructor(contentE){
        ITEM_ARRAY.push(this)
        this.contentE = contentE
        this.contentContainerE = contentE.parentElement
        this.containerE = contentE.parentElement.parentElement

        this.contentContainerE.classList.add(CONTENTCONTAINER_CLASSNAME)
        this.containerE.classList.add(CONTAINER_CLASSNAME)

        this.Ybar = document.createElement("div")
        this.Ybar.className = "_diy-y-right"
        this.YSlider = document.createElement("div")
        this.YSlider.className = "_diy-y-slider"
        this.Ybar.appendChild(this.YSlider)

        this.scrollTop = 0
        this.scrollLeft = 0

        this.maxTop = 0
        this.maxLeft = 0
        
        this.init()
        this.bind()
    }

    //初始化
    init(){
        let containerE = this.containerE
        let contentE = this.contentE

        this.containerSize = containerE.getBoundingClientRect()
        this.contentSize = contentE.getBoundingClientRect()
        this.build()
    }

    //绑定事件
    bind(){
        this.contentContainerE.addEventListener('wheel', e => {
            let dy = e.deltaY

            this.scrollTop = this.scrollTop + dy

            this.draw()
        })

        this.YSlider.addEventListener('mousedown', e => {
            let startY = e.clientY
            let YbarRect = this.Ybar.getBoundingClientRect()
            let YsliderRect = this.YSlider.getBoundingClientRect()

            let moveHanle = e => {
                let nowY = e.clientY
                let dy = nowY - startY

                let p = (YsliderRect.top + dy - YbarRect.top) / (YbarRect.height - YsliderRect.height)

                if(p < 0) p = 0
                if(p > 1) p = 1
                this.moveToByPercentY(p)
            }

            let upHandle = function(e){
                document.removeEventListener('mousemove',moveHanle)
                document.removeEventListener('mouseup',upHandle)
            }

            document.addEventListener('mousemove',moveHanle)
            document.addEventListener('mouseup',upHandle)
        })

        // this.contentE.addEventListener('touch', function(e){
        //     console.log(e)
        // })
    }
    
    //检查是否有变动
    check(){
        let containerE = this.containerE
        let contentE = this.contentE

        let containerSize = this.containerSize
        let contentSize = this.contentSize

        let newContainerSize = containerE.getBoundingClientRect()
        let newContentSize = contentE.getBoundingClientRect()

        let reflowFlag = false

        if(containerSize.width !== newContainerSize.width 
            ||containerSize.height !== newContainerSize.height
            ||containerSize.top !== newContainerSize.top
            ||containerSize.left !== newContainerSize.left ){
                console.log(`container resize`)
                this.containerSize = newContainerSize
                reflowFlag = true
            }
        
        if(contentSize.width !== newContentSize.width
            ||contentSize.height !== newContentSize.height
            ||contentSize.top !== newContentSize.top
            ||contentSize.left !== newContentSize.left ){
                console.log(`content resize`)
                this.contentSize = newContentSize
                reflowFlag = true
            }
        
        if(reflowFlag){
            this.build()
        }
    }

    //是否显示等
    build(){
        let containerSize = this.containerSize
        let contentSize = this.contentSize
        
        //Y轴检查
        if(containerSize.height < contentSize.height){
            // console.log(`show Y`)
            this.containerE.appendChild(this.Ybar)
        }else{
            // console.log(`hide Y`)
            this.containerE.removeChild(this.Ybar)
        }

        //X轴检查
        if(containerSize.width < contentSize.width){
            // console.log(`show X`)
        }else{
            // console.log(`hide X`)
        }
        this.computeData()
        this.draw()
        this.check()
    }

    computeData(){
        let containerSize = this.containerSize
        let contentSize = this.contentSize

        this.maxTop = contentSize.height - containerSize.height
        if(this.maxTop < 0) this.maxTop = 0
    }

    draw(){
        let containerSize = this.containerSize
        let contentSize = this.contentSize
        let YbarRect = this.Ybar.getBoundingClientRect()

        //Y轴
        this.contentContainerE.style.right = YbarRect.width + 'px'
        let scrollTop = this.scrollTop
        if(scrollTop < 0) scrollTop = 0
        if(scrollTop > this.maxTop) scrollTop = this.maxTop
        this.scrollTop = scrollTop

        let vp = containerSize.height / contentSize.height * 100 //滑动条默认比例
        let p = this.scrollTop / contentSize.height * 100  //当前展示
        this.YSlider.style.height = vp + '%'
        this.YSlider.style.top = p + '%'

        this.contentE.style.top = - this.scrollTop + 'px'
    }

    //百分比跳转
    moveToByPercentY(percent){
        let containerSize = this.containerSize
        let contentSize = this.contentSize

        this.scrollTop = - (containerSize.height - contentSize.height) * percent

        this.draw()
    }   
}


function checkSize(){
    ITEM_ARRAY.forEach(function(item){
        item.check()
    })
    requestAnimationFrame(checkSize)
}

checkSize()