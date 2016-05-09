'use strict';

function isHexadecimal(str){
    var num = parseInt(str,16);
    return (num.toString(16).toUpperCase() === str.toUpperCase());
}


function getNumber(str){
    var number;
    var new_str = '';
    if (isHexadecimal(str)){
        number =  parseInt(str,16);
        return number;

    }
    for(var i = 0; i<str.length; i++){
        if (Number.isInteger(str[i]*1)){
            new_str += str[i];
        }
    }
    return new_str*1;

}

function getSumStrings(str1,str2){
    return getNumber(str1)+getNumber(str2);

}

var str1 = '123x1z13';
var str2 = 'a123'

console.log(getSumStrings(str1,str2));

