 /**
 *  Js tasks
 *  @version 0.1
 *  @author Aliaksei Harbuz
 *  @module STKit
 */


var STKit = (function(){

    /**
    * @function publicGetMemoizerSingleArg
    * @param {function} func Any function to cache with single argument
    * @returns {function}
    * @description Return function with cache for single argument function
    */
    function publicGetMemoizerSingleArg(func){
        var memory = {};
        return function() {
            if (arguments.length < 1  || arguments.length > 1){
                return 'Incorrect data';
            }
            var arg = arguments[0];
            if (arg in memory){
                console.log('From memory');
                return memory[arg];
            } else {
                var result = func.apply(this,arguments);
                memory[arg]= result;
                return result;
            }
        };

    }

    /**
    * @function publicGetMemoizerMultipleArg
    * @param {function} func Any function to cache with multiple arguments
    * @returns {function}
    * @description Return function with cache for multiple arguments function
    */
    function publicGetMemoizerMultipleArg(func){
        var memory = {};
        return function(){
            if (arguments.length <= 1 ){
                return 'Incorrect data';
            }
            var argsToStr = JSON.stringify(arguments);
            if(argsToStr in memory){
                console.log('From memory');
                return memory[argsToStr];
            } else{
                var result = func.apply(this,arguments);
                memory[argsToStr] = result;
                return result;
            }

        };
    }

    /**
    * @function publicIsObjLikeArray
    * @param {object} obj Object to check if it is like array
    * @returns {boolean}
    * @description Check object if it is like array
    */
    function publicIsObjLikeArray(obj) {
        if (Object.prototype.toString.call(obj) === '[object Array]'){
            return true;
        }
        if (!!obj  && typeof(obj) === 'object' && typeof(obj.length) === 'number'){

            if(obj.length >=0 ){
                var keys = Object.keys(obj);
                keys.pop('length');
                for(var k = 0; k < keys.length;k++){
                    if (!(/^\+?(0|[1-9]\d*)$/).test(keys[k])){
                        return false;
                    }
                }
                var intKeys = [];
                for (k = 0; k < keys.length;k++){
                    intKeys.push(parseInt(keys[k]));
                }
                if(intKeys[intKeys.length-1]>obj.length - 1){
                    return false;
                }
                return true;
            }
        }
        return false;
    }

    /**
    * @function cloneObject
    * @private
    * @param {object} obj Object to clone
    * @returns {object}
    * @description Clone object
    */
     function cloneObject(obj) {
        var clone = {};
        for(var i in obj) {
            if(typeof(obj[i])==='object' && obj[i] !== null){
                clone[i] = cloneObject(obj[i]);
            } else{
                clone[i] = obj[i];
                }
        }
        return clone;
     }

    /**
    * @function isFrozenSealed
    * @private
    * @param {object} obj Object to check if it is frozen or sealed
    * @returns {boolean}
    * @description Check object if it is frozen or sealed
    */
    function isFrozenSealed(obj){
        return Object.isFrozen(obj) || Object.isSealed(obj);
    }

    /**
    * @function debehaviorizeNewObj
    * @private
    * @param {object} obj
    * @returns {object} New object
    * @description Create new object with same properties as obj but without functions
    */
    function debehaviorizeNewObj(obj){
        var newObj = {};
        if(isFrozenSealed(obj)){
             return  cloneObject(obj);
        }
        for(var prop in obj){
            if (obj.hasOwnProperty(prop)) {
                if (typeof obj[prop] === 'function'){
                    if(isFrozenSealed(obj[prop])){
                        newObj[prop] = obj[prop];
                    }
                }
                if (typeof obj[prop] === 'object'){
                    newObj[prop] = debehaviorizeNewObj(obj[prop]);
                }
                if ( typeof obj[prop] !== 'function' && typeof obj[prop] !== 'object'){
                    newObj[prop] = obj[prop];
                }
            }
        }
        return newObj;
    }

    /**
    * @function debehaviorizeBehavior
    * @public
    * @param {object} obj
    * @returns {array} Array with functions
    * @description Return array of functions and delete methods
    * from given object
    */
    function debehaviorizeBehavior(obj){
        var behavior = [];
        if(isFrozenSealed(obj)){
            return ;
        }

        for(var prop in obj){
            if (obj.hasOwnProperty(prop)) {
                if (typeof obj[prop] === 'function'){
                    if(isFrozenSealed(obj[prop])){
                        continue;
                    }
                        behavior.push(obj[prop]);
                        delete obj[prop];
                    }
                    if (typeof obj[prop] === 'object'){
                        var bufBeh = debehaviorizeBehavior(obj[prop]);
                        if (bufBeh){
                            behavior = behavior.concat(bufBeh);
                        }
                    }
                }
        }
        return behavior;

    }

    /**
    * Exception for publicDebehaviorize method
    * @constructor DebehaviorizeException
    * @private
    * @param {string} message - Message of exception
    */
    function DebehaviorizeException (message){
             this.message = message;
             this.name = 'DebehaviorizeException';
    }

    /**
    * @function publicDebehaviorize
    * @public
    * @param {object} obj
    * @param {boolean} isBehaviorSeparate
    * @returns {object|array}
    * @description Return new object or array of functions and delete methods
    * from given object if isBehaviorSeparate is true
    * @throws {DebehaviorizeException}
    */
    function publicDebehaviorize(obj,isBehaviorSeparate){

        if(arguments.length===1 && !obj ){
            throw new DebehaviorizeException ('Invalid data');
        }
        if(arguments.length===2 && !!isBehaviorSeparate && typeof(isBehaviorSeparate)!=='boolean'){
            throw new DebehaviorizeException ('Invalid data');
        }
        if ( arguments.length<1 || arguments.length>2 || typeof(obj)!=='object'){
            throw new DebehaviorizeException ('Invalid data');
        }
        if(isBehaviorSeparate){
            return debehaviorizeBehavior(obj);
        } else {
            return debehaviorizeNewObj(obj);
        }

    }

    /**
    * Exception for publicApplyBehavior method
    * @constructor ApplyException
    * @private
    * @param {string} message - Message of exception
    */
    function ApplyException(message){
        this.message = message;
        this.exception = 'ApplyException';
    }

    /**
    * @function isInCorrectBehavior
    * @private
    * @param {array} behavior
    * @returns {boolean}
    * @description Return true if behavior is not  array or length is 0 or not exist
    */
    function isInCorrectBehavior(behavior){
        return !behavior  ||  behavior.length === 0 || !Array.isArray(behavior) ;

    }

    /**
    * @function isInCorrectObj
    * @private
    * @param {object} obj
    * @returns {boolean}
    * @description Return true if obj is not  object or not exist
    */
    function isInCorrectObj(obj){
        return !obj ||  typeof(obj) != 'object';

    }

    /**
    * @function publicApplyBehavior
    * @public
    * @param {array} behavior
    * @param {object} obj
    * @description Apply behavior to another object
    * @throws {ApplyException}
    */
    function publicApplyBehavior(behavior,obj){

        if( arguments.length !==2 || isInCorrectBehavior(behavior) || isInCorrectObj(obj)){
                throw new ApplyException('Incorrect data');
            }
        var func = 'func';
        var funcName;
        for (var i = 0; i<behavior.length;i++){
            if(behavior[i].name){
                funcName = behavior[i].name;
            }
            else{
                funcName = func + i;
            }
            obj[funcName]=behavior[i];
        }


    }

    /**
    * @function createFunction
    * @private
    * @param {string} strFunc
    * @returns {function}
    * @description Convert string to the function. Use Function according the task despite jshint warnings are exist
    */
    function createFunction(strFunc){
        if(strFunc.indexOf('function') !==-1){
            return new Function('return ' + strFunc)();
        }else{
            return new Function(strFunc);
        }
    }

    /**
    * @function spliter
    * @private
    * @param {string} str
    * @returns {array}
    * @description Split properties of object from the string
    */
    function spliter(str){
        var res =[],bufStr='',flag=false;
        for(var i=0;i<str.length;i++){
            if(str[i]!==';' || flag ){
                bufStr += str[i];
                if (str[i]==='|'){
                    flag = !flag;
                }
            } else{
                res.push(bufStr);
                bufStr = '';
            }
        }
        res.push(bufStr);
        return res;
    }

    /**
    * @function createObjectOutput
    * @private
    * @param {string} data
    * @returns {object}
    * @description Create object from the string
    */
    function createObjectOutput(data){
        var bufOutput = {}	;
        var splitData = spliter(data);
        for(var i = 0; i<splitData.length; i++){
            if (splitData[i]){
                var splitItem = splitData[i].split(',');
                var str = splitItem[1];
                if (!!str && str.indexOf('|')!==-1){
                    var strFunc = str.trim();
                    strFunc = strFunc.replace(/\|/g,'');
                    bufOutput[splitItem[0]] = createFunction(strFunc);
                }else{
                    bufOutput[splitItem[0]]=splitItem[1];
                }
            }
        }

        return bufOutput;
    }

    /**
    * @function createArrayOutput
    * @private
    * @param {string} data
    * @returns {array}
    * @description Create array from the string
    */
    function createArrayOutput(data){
        var bufArray = [];
        var splitData = data.split(';');
        for(var i = 0; i<splitData.length; i++){
            if (splitData[i]){
                var splitItem = splitData[i].split(',');
                var buf={};
                buf[splitItem[0]]=splitItem[1];
                bufArray.push(buf);
            }
        }
        return bufArray;
    }

    /**
    * Exception for publicParseSemiColonSON method
    * @constructor ParseSemiColonSONException
    * @private
    * @param {string} message - Message of exception
    */
    function ParseSemiColonSONException (message){
        this.message = message;
        this.name = 'ParseSemiColonSONException';
    }

    /**
    * @function  publicParseSemiColonSON
    * @public
    * @param {string} data
    * @description Create object from the string
    * @throws {ParseSemiColonSONException}
    */
    function publicParseSemiColonSON(data){

        if (arguments.length !==1 ||!data || typeof(data)!=='string'){
            throw new ParseSemiColonSONException('Incorrect data');
        }
        var output;
        var prepareData = data.split(':');
        if (prepareData.length==1){
            output = createObjectOutput(data);
        } else {
            var cleanData = prepareData[0].split(';');
            var arrName = cleanData.pop();
            output = createObjectOutput(prepareData[0]);
            output[arrName] = createArrayOutput(prepareData[1]);
        }
        return output;
    }

     /**
    * @function itemsFunctionToStr
    * @private
    * @param {string} prop
    * @param {function}
    * @returns {string}
    * @description Create string from property and function of object
    */
    function itemsFunctionToStr(prop,value){
        var itemStr;
        itemStr = prop.toString()+',|'+value.toString();
        if(itemStr.indexOf('anonymous')!==-1){
            itemStr = itemStr.replace('function anonymous() {','');
            itemStr = itemStr.slice(0,itemStr.length-1);
        }
        itemStr = itemStr+'|;';
        return itemStr;
    }

    /**
    * @function itemsArrayToStr
    * @private
    * @param {string} prop
    * @param {array} Array of objects
    * @returns {string}
    * @description Create string from property and array of objects
    */
    function itemsArrayToStr(prop,value){
        var arrStr='',itemStr;
        for(var i=0;i<value.length;i++){
            for(var propInArr in value[i]){
                if(value[i].hasOwnProperty(propInArr)){
                    arrStr+=propInArr.toString()+','+value[i][propInArr];
                }
            }
        }
        itemStr = prop.toString()+':'+arrStr+';';
        return itemStr;
    }

    /**
    * Exception for publicStringifyObject method
    * @constructor StringifyObjectException
    * @private
    * @param {string} message - Message of exception
    */
    function StringifyObjectException(message){
        this.message = message;
        this.name = 'StringifyObjectException';

    }

    /**
    * @function checkPublicStringifyObject
    * @private
    * @param {number} argsCount Count of arguments in  publicStringifyObject
    * @param {object} obj
    * @param {function} callback
    * @throws {StringifyObjectException}
    */
    function checkPublicStringifyObject(argsCount,obj,callback){
        if(argsCount===1 && !obj ){
              throw new StringifyObjectException('Invalid data');
        }
        if(argsCount===2 && !callback && typeof(callback)!=='function'){
            console.log('excep');
            throw new StringifyObjectException('Invalid data');
        }
        if ( argsCount<1 || argsCount>2 || typeof(obj)!=='object'){
            throw new StringifyObjectException('Invalid data');
        }

    }

    /**
    * @function  publicStringifyObject
    * @public
    * @param {object} obj
    * @param {function} callback
    * @description Stringify object, can have function as a second argument to modify object
    */
    function publicStringifyObject(obj,callback){
        checkPublicStringifyObject(arguments.length,obj,callback);
        if(callback){
            callback(obj);
        }
        var str=';', itemStr;
        for (var prop in obj){
            if(obj.hasOwnProperty(prop)){
                itemStr = '';
                if(typeof(obj[prop]) === 'function'){
                    itemStr = itemsFunctionToStr(prop,obj[prop]);
                } else if(Array.isArray(obj[prop])){
                    itemStr = itemsArrayToStr(prop,obj[prop]);
                } else {
                   itemStr = prop.toString()+','+obj[prop].toString()+';';
                }

                str += itemStr;
            }
        }
        return str;

    }



    /**
    * @function  publicRemoveMethods
    * @public
    * @param {object} obj
    * @description Remove methods from the object
    */
    function publicRemoveMethods(obj){
        for(var prop in obj){
            if(obj.hasOwnProperty(prop)){
                if( typeof(obj[prop]) === 'function'){
                    delete obj[prop];
                }
            }
        }
    }

   return {
        memoizerSingleArg : publicGetMemoizerSingleArg,
        memoizerMultipleArg : publicGetMemoizerMultipleArg,
        isObjLikeArray : publicIsObjLikeArray,
        debehaviorize : publicDebehaviorize,
        applyBehavior: publicApplyBehavior,
        parseSemiColonSON:publicParseSemiColonSON,
        stringifyObject:publicStringifyObject,
        callback : publicRemoveMethods
    };

})();
module.exports = STKit;