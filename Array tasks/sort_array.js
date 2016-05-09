'use strict';
var obj1 = { a: 2, c: 3, d: 3};
var obj2 = { a: 1 };
var obj3 = { a: 2, c: 3};
var arOfObj = [obj1, obj2, obj3];


function getPropSum(obj){
    var propSum = 0;
    for(var prop in obj){
        propSum += obj[prop];
    }
    return propSum;

}

function objSort(arOfObj,direction){
    arOfObj.sort((function(a,b){return  getPropSum(a)- getPropSum(b)}))
    if(direction === 'asc'){
        return arOfObj;
    } else if (direction === 'desc'){
        return arOfObj.reverse();
    }
}

console.log(objSort(arOfObj,'asc'));
console.log(objSort(arOfObj,'desc'));
