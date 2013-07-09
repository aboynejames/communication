/*
* check the homepage index.html webpage has been displayed
*/
var baseUrl = "http://localhost/sites/playground/html5/canvas/trainprogramme/trainprogramme.html";

casper.test.comment("Scenario: A base layout of communcation builder");

casper.start(baseUrl, function() {
	this.test.comment('contrainer for communication');
	casper.test.assertExists('#communication', 'the element exists');

});

casper.then(function() {
	this.test.comment('play back set live for stopwatch timing');
	casper.test.assertExists('.liveswimset', 'the element exists');
	
});


casper.then(function() {
	this.test.comment('container for past/future communication');
	casper.test.assertExists('.pastfuturecomm', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('container for communcation authoring');
	casper.test.assertExists('.communicationelement', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('set date or stop communication');
	casper.test.assertExists('#communicationdate', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('add/start swim communication');
	casper.test.assertExists('#newelement', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('save a new communication programme');
	casper.test.assertExists('#savecommunication', 'the element exists');
	
});


casper.run(function() {
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});