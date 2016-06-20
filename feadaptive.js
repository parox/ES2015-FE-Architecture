#!/usr/bin/env node

function TaskResponse(taskResponseArgs){
	if (!taskResponseArgs){
		taskResponseArgs = {};
	}

	this.status = taskResponseArgs.status || 'Success';
	this.operationSuccess = taskResponseArgs.operationSuccess || true;
}

exports.build = function() {
  

  return new TaskResponse();
}

exports.sassCompile = function() {
  

  return new TaskResponse();
}

exports.jsHint = function() {
  

  return new TaskResponse();
}

exports.jsMinified = function() {
  

  return new TaskResponse();
}

exports.cssMinified = function() {
  

  return new TaskResponse();
}

exports.createIso = function() {
  

  return new TaskResponse();
}

exports.deploy = function() {
  

  return new TaskResponse();
}

exports.test = function() {
  

  return new TaskResponse();
}

//	TODO: 
//	Remove above code and implement inheritance
//----------------------------------------------------------------


var args 	= process.argv;
var params	= args.slice(2, args.length);
var methods = Object.keys(this);


//	==============================================================================
//						CLI Validations
//	==============================================================================
if (!Array.isArray(params) || !params.length) {

	console.log('\nMissing arguments. Please try one of the options bellow:\n');

	for (var i = methods.length - 1; i >= 0; i--) {
		console.log('     - ' + methods[i]);
	}

	
	return;
}


for (var i = params.length - 1; i >= 0; i--) {

	if (!this[params[i]]){
		console.log('Invalid argument. "' + params[i] + '"');
		return;
	}
}


//	==============================================================================
//						CLI Execution
//	==============================================================================

var i = 0;

while (i < params.length) {

	console.log('\n... Starting feadaptive task ["' + params[i] + '"]');
	
	var taskResult = this[params[i]]();

	console.log('Task ["'+ params[i] +'"] finish with status ' + taskResult.status);

	if (!taskResult.operationSuccess) {
		//	Show trace
		console.log('Trace');
		return;
	}

	i++;
}

console.log('\n\nDone\n');