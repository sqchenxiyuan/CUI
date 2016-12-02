var handler = {
    get: function(target, name){
        return target[name];
    }
};

var obj={};
var p = new Proxy(obj, handler);
p.a = 1;
p.b = undefined;

console.log(obj);
console.log(p.a, p.b); // 1, undefined
console.log('c' in p, p.c); // false, 37
