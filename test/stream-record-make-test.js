/*
* check the frame section are in order
*/
var baseUrl = "http://localhost/ll/opensportproject/swimtraintimer/communication/src/trainprogramme.html";

casper.test.comment("Scenario: The framework section layout");

casper.start(baseUrl, function() {
	this.test.comment('holder for framework three sections');
	casper.test.assertExists('#framework', 'the element exists');

});

casper.then(function() {
	this.test.comment('placer for identity information');
	casper.test.assertExists('.identity', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('UI for lifestyle stream');
	casper.test.assertExists('.stream', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('UI for recording life');
	casper.test.assertExists('.record', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('UI for making the future');
	casper.test.assertExists('.make', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('covers all context settings sections');
	casper.test.assertExists('#attention', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('date setting place');
	casper.test.assertExists('.dateset', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('Current time/date and navigation using time');
	casper.test.assertExists('.time', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('social context');
	casper.test.assertExists('.social', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('tools context');
	casper.test.assertExists('.tools', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('context setting area');
	casper.test.assertExists('#context', 'the element exists');
	
});
casper.then(function() {
	this.test.comment('the context UI for life');
	casper.test.assertExists('.lifestyle', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('identity content');
	casper.test.assertExists('#meflow', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('stream content flow ');
	casper.test.assertExists('#streamflow', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('record live content');
	casper.test.assertExists('#recordflow', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('connectivity / networking status life to tech');
	casper.test.assertExists('#connectivity', 'the element exists');
	
});

casper.run(function() {
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});