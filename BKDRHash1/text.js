// unsigned int BKDRHash1(char *str)
// {
//     unsigned int seed = 131; // 31 131 1313 13131 131313 etc..
//     unsigned int hash = 0;
 
//     while (*str) {
//         hash = hash * seed + (*str++);
//     }
 
//     return (hash & 0x7FFFFFFF); // long int 的上限值，这里可以替换为得到的数据与散列表的大小NHASH进行mod运算
// }

const UTF81 = 0x7f
const UTF82 = 0x7ff
const UTF83 = 0xffff
const UTF84 = 0x10ffff

const UTF8 = [
    "10000000",
    '00000000',
    '11000000',
    '11100000',
    '11110000'
]


console.log(BKDRHash1('xxx'))

function BKDRHash1(str){
    let seed = 131 // 31 131 1313 13131 131313 etc..
    let hash = 0
    let nums = UTF8_UNIC(str)

    for(let i = 0; i < nums.length; i++){
        let code = nums[i]
        hash = ((hash * seed) + code) & 0xFFFFFFFF
        console.log(code, hash)
    }

    return hash  & 0x7FFFFFFF
}


// let x = UTF8_UNIC('xxx')

function UTF8_UNIC(str){
    return Array.from(str).reduce((s,c) => {
        s.push(...UTF8_UNIC_CHAR(c))
        return s
    },[])
}

function UTF8_UNIC_CHAR(str){
    let utf8code = str.codePointAt(0)
    let l = 0
    if(utf8code < UTF81){
        l = 1
    }else if(utf8code < UTF82){
        l = 2
    }else if(utf8code < UTF83){
        l = 3
    }else if(utf8code < UTF84){
        l = 4
    }
    let arr = []

    utf8code = utf8code.toString(2)
    let num1 = utf8code.substr(0, utf8code.length - (l-1)*6)
    arr.push(num1.padStart(8,UTF8[l]))
    for(let i = 0; i < l - 1; i++){
        arr.push(utf8code.substr(num1.length + i*6, 6).padStart(8,UTF8[0]))
    }
    arr = arr.map(u => {
        if(u[0] === '1'){
            return parseInt(u.substr(1),2) - 128
        }else {
            return parseInt(u.substr(1),2)
        }
    })
    return arr
}