var hash={};

let num=parseInt('11111',7);
let arr=getF_loop(num);

arr.sort((a,b)=>{
 return a-b;
});

arr.forEach((data)=>{
    console.log(data,data.toString(2));
})
console.log(num,num.toString(2));

// console.time('recursion');
// for(let i=0;i<1000000;i++){
//     // if(i%10000===0)console.log(i/10000+'%');
//     getF_recursion(i);
// }
// console.log( getF_recursion(100000000001))
// console.timeEnd('recursion');
// console.time('loop');
// for(let i=0;i<1000000;i++){
//     // if(i%10000===0)console.log(i/10000+'%');
//     getF_loop(i);
// }
// console.log( getF_loop(100000000001))
// console.timeEnd('loop');

function getF_loop(num){
    var arr=[];
    var sqrtnum=Math.sqrt(num);
    for (i=2;i<=sqrtnum;i++){
        j=num/i;
        if(Math.floor(j)===j){
            arr.push(i);
            if(i!==j){
                arr.push(j);
            }
        }
    }
    return arr;
}


function getF_recursion(num,hashmap){
    var g2=hashmap;
    if(!hashmap)hashmap={};
    var arr;
    var arrhash={};
    var mindivisor=null;
    if(hash[num]!==undefined){
         mindivisor=hash[num];
    }

    if(!mindivisor){
        var sqrtnum=Math.sqrt(num);
        for(i=2;i<=sqrtnum;i++){
            j=num/i;
            if(Math.floor(j)===j){
                mindivisor=i;
                hash[num]=mindivisor;
                break;
            }
        }
        if(!mindivisor){
            return [];
        }
    }

    if(!hashmap[num/mindivisor]){
        hashmap[num/mindivisor]=getF_recursion(num/mindivisor,hashmap);
    }
    arr=hashmap[num/mindivisor].slice();
    for(i=arr.length-1;i>=0;i--){
        arrhash[arr[i]]=true;
        if(!arrhash[arr[i]*mindivisor]){
            arr.push(arr[i]*mindivisor);
        }
    }

    arr.push(num/mindivisor);
    if(Math.floor(num/(mindivisor*mindivisor))!==num/(mindivisor*mindivisor)){
        arr.push(mindivisor);
    }
    return arr;
}

// var mem = process.memoryUsage();
// var format = function(bytes) {
//   return (bytes/1024/1024).toFixed(2)+'MB';
// };
// console.log('Process: heapTotal '+format(mem.heapTotal) + ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss));
// console.log('----------------------------------------');
