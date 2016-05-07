'use strict';


//Insertion sort
var arr = [5, 20, 7, 11, 6, 17, 22, 12, 13, 88];
function insertionSort(arr){
    var valInsert;
    var positionToInsert;
    var i;
    for(i=1;i<arr.length;i++){
        valInsert = arr[i];
        positionToInsert = i;

        while(positionToInsert>0 && arr[positionToInsert-1]>valInsert){
            var temp = arr[positionToInsert];
            arr[positionToInsert] = arr[positionToInsert-1];
            arr[positionToInsert-1] = temp;
            positionToInsert--;
        }
        if(positionToInsert !=1){
            arr[positionToInsert]=valInsert;
        }

    }
   return arr;
}
console.log('Insertion sort :',insertionSort(arr));


//Quicksort
arr = [15, 4, 7, 14, 6, 71, 22, 8, 13, 88];

function swap(arr, indexFirst, indexSecond){
    var temp = arr[indexFirst];
    arr[indexFirst] = arr[indexSecond];
    arr[indexSecond] = temp;
}
function partition(arr, left, right) {
    var point   = arr[Math.floor((right + left) / 2)],i = left,j=right;
    while (i <= j) {
        while (arr[i] < point) {
            i++;
        }
        while (arr[j] > point) {
            j--;
        }
        if (i <= j) {
            swap(arr, i, j);
            i++;
            j--;
        }
    }
    return i;
}
function quickSort(arr, left, right) {
    var index;
    if (arr.length > 1) {
        index = partition(arr, left, right);
        if (left < index - 1) {
            quickSort(arr, left, index - 1);
        }
        if (index < right) {
            quickSort(arr, index, right);
        }
    }

    return arr;
}
console.log('Quicksort :',quickSort(arr,0,arr.length-1));


//Merge sort
arr = [15, 55, 7, 23, 45, 71, 11, -1, 13, -11];
function mergeSort(arr) {
    if (arr.length < 2){
        return arr;}
    var middle = arr.length / 2;
    var left   = arr.slice(0, middle);
    var right  = arr.slice(middle, arr.length);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var res = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            res.push(left.shift());
        } else {
            res.push(right.shift());
        }
    }

    while (left.length)
        res.push(left.shift());

    while (right.length)
        res.push(right.shift());

    return res;
}
console.log('Merge sort :',mergeSort(arr))




//Bubble sort
arr = [5, 244, 7, 14, 6, 8, 22, 1, 13, 88];
function bubbleSort(arr) {
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
        for (var j = 0; j < i; j++) {
            if (arr[j] > arr[j+1]) {
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}
console.log('Bubble sort :',bubbleSort(arr));



// Shell sort
arr = [345, 1, 4, 54, 26, 21, 11, 1, 8, 15];
var gaps = [701, 301, 132, 57, 23, 10, 4, 1];
function shellSort(arr) {
    for(var g = 0; g < gaps.length; g++) {
        var gap = gaps[g];
        for(var i = gap; i < arr.length; i++) {
            var temp = arr[i];
                for(var j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                    arr[j] = arr[j - gap];
                }
            arr[j] = temp;
        }
    }
    return arr;
}
console.log('Shell sort :',shellSort(arr));

//Counting sort
arr = [654,31, 80, 54, 21, 21, 35, 16, 18];

function countingSort(arr, maxValue) {
    var places = new Array(maxValue + 1);
    var sortedIndex = 0;
    var i;

    for (i = 0; i < arr.length; i++) {
        if (!places[arr[i]]) {
            places[arr[i]] = 0;
        }
        places[arr[i]]++;
    }

    for (i = 0; i < places.length; i++) {
        while (places[i] > 0) {
            arr[sortedIndex++] = i;
            places[i]--;
        }
    }

    return arr;
}

console.log('Counting sort :',countingSort(arr,654));