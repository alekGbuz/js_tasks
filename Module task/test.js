var  STKit = require('./STKit.js');

console.log('______');
console.log('Check memoizer for single argument');
var memFactorial= STKit.memoizerSingleArg(factorial);
console.log(memFactorial(4));
console.log(memFactorial(4));
console.log(memFactorial(6,3));
console.log(memFactorial());

function factorial(n) {
    var res = 1;
    while(n !== 1) {
        res *= n--;
    }
    return res;
}


console.log('______');
console.log('Check memoizer for multiple arguments');
var memSum = STKit.memoizerMultipleArg(sum);
console.log(memSum(1,2));
console.log(memSum(1,2));
console.log(memSum(2));
console.log(memSum());

function sum(a,b){
    return a+b;
}

console.log('______');
console.log('Determine is given object array like or no');
var objArr = {
    '2':3,
     50:2,
    length: -11
 };

var objArr2 = {
     2:'1',
     50:2,
    length: 51
 };
var checkingArrayData = [objArr2,objArr,[],['1',2],'',null,20,'Array',true];
for(var i = 0; i < checkingArrayData.length; i++){
    console.log(STKit.isObjLikeArray(checkingArrayData[i]));
}
console.log('______');
console.log('Debehaviorizer and aplly behavior checker ');
var objInner2 ={
    prop:3,
    func: function(){
        return 'inner function 1';
    }
};
var objInner1 = {
        prop:'2',
        obj: objInner2,
        func: function(){
            return 'inner function 2';
        }

};

function func(){
        return 'function';
}
var obj = {
    prop: 1,
    arr :[1,2,3],
    func: func,
    propObj:objInner1

};

var newObj = STKit.debehaviorize(obj);
console.log(newObj);
console.log(obj);
var onlyBehavior = STKit.debehaviorize(obj,true);
console.log(onlyBehavior);
console.log(obj);

objInner1.prop =3;
console.log('Next result 2');
console.log(newObj.propObj.prop);
obj.prop = 2;
console.log('Next result 1');
console.log(newObj.prop);
obj.arr[0]=100;
console.log('Next result 1');
console.log(newObj.arr[0]);
var objBeh = {
    1:1,
};
console.log('Check working of behavior apply');
STKit.applyBehavior(onlyBehavior,objBeh);
console.log(objBeh);
console.log(objBeh.func());
console.log(objBeh.func1());
console.log(objBeh.func2());


console.log('______');
console.log('check SemiColonSON ');
var data = ';key,value;methodName,|return true|;';
// necessary to check different kinds of functions
var data2 = ';key,value;methodName1,|return true|;methodName2,|function (a) { return a + 1; }|;methodName3,|function (a) { a=3; return a + 1; }| ;arrayHere:k1,v1;';
var resObj =  STKit.parseSemiColonSON(data);
console.log(resObj);
parseObj =  STKit.parseSemiColonSON(data2);
console.log(parseObj);
console.log('Next data true');
console.log(parseObj.methodName1());
console.log('Next data 4');
console.log(parseObj.methodName3(2));

console.log('______');
console.log('Object to string');
var str = STKit.stringifyObject(parseObj);
console.log(str);
var objFromStr = STKit.parseSemiColonSON(str);
console.log(objFromStr);

str = STKit.stringifyObject(parseObj,STKit.callback);
console.log(str);
objFromStr = STKit.parseSemiColonSON(str);
console.log(objFromStr);
