'use strict';
var data = ';key,value;key1,value1;arrayHere:k1,v1;k2,v2;k3,v3';
console.log('Input data ',data)

function createObjectOutput(data){
	var bufOutput = {}	;
	var splitData = data.split(';');
	for(var i = 0; i<splitData.length; i++){
		if (splitData[i]){
			var splitItem = splitData[i].split(',');
			bufOutput[splitItem[0]]=splitItem[1];
		} 
	}

	return bufOutput
}

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
function getResult(data){
	var output;
	var prepareData = data.split(':');
	if (prepareData.length==1){
		output = createObjectOutput(data);
	} else {
		var cleanData = prepareData[0].split(';');    			 //prepare data for create object with array field
		var arr_name = cleanData.pop();                          //find array name and delete array field name from array
		output = createObjectOutput(prepareData[0]);
		output[arr_name] = createArrayOutput(prepareData[1]);
	}
	return output;
}
console.log('Result data',JSON.stringify(getResult(data)));

