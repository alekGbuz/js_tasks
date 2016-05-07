'use strict';
function createLineForDouble(zeroCount,oneCount){
    var line = [];
    var i;
    for(i=0;i<zeroCount;i++){
        line.push(0);
    }
    for(i=0;i<oneCount;i++){
        line.push(1);
    }
    for(i=0;i<zeroCount;i++){
        line.push(0);
    }

    return line;
}

function createDoubleTriangles(size){
    var arr  = [];
    var zeroCount;
    var oneCount;
    var new_arr;
    for(var i = 0;i < size;i++){
        zeroCount = i;
        oneCount = size-i*2;
        if (oneCount<0){
            new_arr = arr.slice(0,arr.length-1);
            new_arr.reverse();
            arr = arr.concat(new_arr);
            return arr;
        } else {
            arr.push(createLineForDouble(zeroCount,oneCount));
        }
    }

    return arr;
}
function createLineForSingle(oneCount,size){
    var line = [];
    var i;
    for (i=0;i<oneCount;i++){
        line.push(1);
    }
    for(i=0; i<size-oneCount;i++){
        line.push(0);
    }
    return line;
}
function createSingleTriangle(size){
    var arr = [];
    var oneCount;
    var new_arr;
    for (var i=0; i < size;i++){
        oneCount = i+1;
        if (size - oneCount< Math.floor(size/2)){
            new_arr = arr.slice(0,arr.length-1);
            new_arr.reverse();
            arr = arr.concat(new_arr);
           return arr;
        } else {
          arr.push(createLineForSingle(oneCount,size));
        }
    }

    return arr;
}

function arrToStr(arr){
    var str = '';
    for(var i = 0; i<arr.length; i++){
        for(var j = 0; j < arr[i].length; j++){
            str +=arr[i][j];
        }
          str += '\n';
    }
    return str;
}

function drawSingleTriangle (size){
    return  arrToStr(createSingleTriangle(size));
}

function drawDoubleTriangles(size){
    return  arrToStr(createDoubleTriangles(size));
}

console.log(drawSingleTriangle(7));
console.log(drawDoubleTriangles(7));