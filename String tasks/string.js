'use strict';
//Reverse String
var str1 = 'Reverse String';
function reverseStr(str){
    return str.split('').reverse().join('');
}

console.log('Reverse string :',reverseStr(str1));




//Check if string ends with
var str2 = 'Check if string ends with';
var check_word = 'with';
function isEndsWith(str,suffix){
    return str.indexOf(suffix,str.length - suffix.length) !==-1;
}

console.log('Check ends of string :',isEndsWith(str2,check_word));



//Check if string begins with
var str3 = 'Check if string begins with';
check_word = 'Check';
function isStartsWith(str,preffix){
    return str.indexOf(preffix,0) !== -1;
}
console.log('Check starts of string :',isStartsWith(str3,check_word));



//Check if string is in camelCase (CamelClass)
var str4 = 'checkCamelClass';
function isCamelCase(str){
    str = str.trim(' ');
    if (str.indexOf('_') !== -1){
        return false;
    }
    return str.indexOf(' ') === -1;

}

console.log('If string is in camel case :',isCamelCase(str4));



//Check if string is in Pascal_Case (pascal_case_to)
var str5 = 'Pascal_Case'
function isFirstLettersSameCase(words){
    var letterFlag = (words[0][0] === words[0][0].toUpperCase());
    for (var i=1;i < words.length;i++){
        if (letterFlag !==(words[i][0]===words[i][0].toUpperCase())){
            return false;
        }
    }
    return true;
}

function checkPascalCase(str){
    str = str.trim(' ');
    if (str.indexOf('_') === -1 || str.indexOf(' ')!==-1){
        return false;
    }
    if (!isFirstLettersSameCase(str.split('_'))){
        return false;
    }
    return true;
}
console.log('if string is in pascal case :',checkPascalCase(str5));
