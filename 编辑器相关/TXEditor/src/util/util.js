function getCharSize(char, options = {}) {
    let {
        fontSize = 14, //px为单位
        fontFamily = "Microsoft YaHei",
    } = options
    let scale = 1 //倍数

    if (fontSize < 12){ //兼容chrome浏览器
        scale = fontSize / 12
        fontSize = 12
    }
    let span = document.createElement("span")
    span.innerHTML = char
    span.style.fontSize = `${fontSize}px`
    span.style.lineHeight = `${fontSize}px`
    span.style.display = "inline-block"
    span.style.fontFamily = fontFamily
    if (scale !== 1) span.style.transform = `scale(${scale})`
    document.body.appendChild(span)
    let rect = span.getBoundingClientRect()
    document.body.removeChild(span)

    return {
        height: rect.height,
        width: rect.width,
    }
}

export {
    getCharSize
}