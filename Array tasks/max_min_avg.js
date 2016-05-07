'use strict';

var arr = [[3,4,6],[5,6,7],[2,3,4]];

function getMinValue(arr){
    var minValue = arr[0][0];
    var bufMin;
    for(var i = 0; i < arr.length; i++){
        bufMin = arr[i].sort( function(a, b){return a-b})[0];
        if (bufMin < minValue){
            minValue = bufMin;
        }

    }
    return minValue;

}

function getMaxValue(arr){
    var maxValue = arr[0][0];
    var bufMax;
    for(var i = 0; i<arr.length; i++){
        var bufMax = arr[i].sort((function(a,b){return b-a}))[0];
        if(bufMax>maxValue){
               maxValue = bufMax;
        }
    }
    return maxValue;


}
function getArrSum(arr){
    var sumArr = 0;
    for(var i = 0; i<arr.length; i++){
        sumArr +=arr[i];
    }
    return sumArr;
}

function getTotalLength(arr){
    var total = 0
    for(var i=0; i <arr.length; i++){
        total += arr[i].length;
    }
    return total;
}

function getAvgValue(arr){
    var sumArr = 0;
    for(var i = 0; i<arr.length; i++){
        sumArr += getArrSum(arr[i]);
    }
    return sumArr/getTotalLength(arr);
}

console.log('Min value of array :',getMinValue(arr));
console.log('Max value of array :',getMaxValue(arr));
console.log('Avg value of array :', getAvgValue(arr));