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
function bubbleSort(arr) {
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
        for (var j = 0; j < i; j++) {
            if (getPropSum(arr[j]) > getPropSum(arr[j+1])) {
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}

function objSort(arOfObj,direction){
    var arr = bubbleSort(arOfObj);
    if(direction === 'asc'){
        return arr;
    } else if (direction === 'desc'){
        return arr.reverse();
    }
}

console.log(objSort(arOfObj,'asc'));
console.log(objSort(arOfObj,'desc'));
