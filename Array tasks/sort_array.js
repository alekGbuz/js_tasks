'use strict';
var obj1 = { a: 2, c: 3, d: 3};
var obj2 = { a: 1 };
var obj3 = { a: 2, c: 3};
var arOfObj = [obj1, obj2, obj3];


function getPropCount(obj){
    return Object.keys(obj).length;

}

function objSort(arOfObj,direction){
    arOfObj.sort((function(a,b){return  getPropCount(a)- getPropCount(b)}))
    if(direction === 'asc'){
        return arOfObj;
    } else if (direction === 'desc'){
        return arOfObj.reverse();
    }
}

console.log(objSort(arOfObj,'asc'));
console.log(objSort(arOfObj,'desc'));
