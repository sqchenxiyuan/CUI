// unsigned int BKDRHash1(char *str)
// {
//     unsigned int seed = 131; // 31 131 1313 13131 131313 etc..
//     unsigned int hash = 0;
 
//     while (*str) {
//         hash = hash * seed + (*str++);
//     }
 
//     return (hash & 0x7FFFFFFF); // long int 的上限值，这里可以替换为得到的数据与散列表的大小NHASH进行mod运算
// }

console.log(BKDRHash1('关于腾讯视频_彩蛋'))

function BKDRHash1(str){
    let seed = 131 // 31 131 1313 13131 131313 etc..
    let hash = 0

    for(let i = 0; i < str.length; i++){
        let code = str.charCodeAt(i)
        console.log(code & 0xFF)
        hash = (((hash * seed) & 0xFFFFFFFF) + str.charCodeAt(i)) & 0xFFFFFFFF
        // console.log(str.charCodeAt(i), hash)
    }

    return hash  & 0x7FFFFFFF
}

