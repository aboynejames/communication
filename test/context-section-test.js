/*
* check the frame section are in order
*/
var baseUrl = "http://localhost/ll/opensportproject/swimtraintimer/communication/src/index.html";

casper.test.comment("Scenario: Select different elements of attention setting");

casper.start(baseUrl, function() {
	this.test.comment('default attention links are present');
	casper.test.assertExists('#datecontext', 'the element exists');
	casper.test.assertExists('#socialcontext', 'the element exists');
	casper.test.assertExists('#toolscontext', 'the element exists');
});


casper.then(function() {
	this.test.comment('default attention settings, todays date stream');
	casper.test.assertExists('.time', 'the element exists');
	casper.test.assertVisible('.time', 'the section is visable');

});
		
casper.then(function() {
	this.test.comment('the other attention sections shoud be hidden');
	casper.test.assertNotVisible('.dateset', 'the section is not visable');
	casper.test.assertNotVisible('.social', 'the section is not visable');
	casper.test.assertNotVisible('.tools', 'the section is not visable');	
});

casper.then(function() {
	this.test.comment('click on date attention setting link');
	this.mouseEvent('click', '#datecontext');
	
});

casper.then(function() {
	this.test.comment('the date section should be visable');
	casper.test.assertVisible('.dateset', 'the section is visable');
	
});

casper.then(function() {
	this.test.comment('click on date attention setting again to close section');
	this.mouseEvent('click', '#datecontext');
	
});

casper.then(function() {
	this.test.comment('the date section should not be visable');
	casper.test.assertNotVisible('.dateset', 'the section is  not visable');
	
});

casper.then(function() {
	this.test.comment('click on social ie people attention setting link');
	this.mouseEvent('click', '#socialcontext');
	
});

casper.then(function() {
	this.test.comment('the date social section should be visable');
	casper.test.assertVisible('.social', 'the section is visable');
	
});

casper.then(function() {
	this.test.comment('click on social attention setting again to close section');
	this.mouseEvent('click', '#socialcontext');
	
});

casper.then(function() {
	this.test.comment('the social section not should be visable');
	casper.test.assertNotVisible('.social', 'the section is  not visable');
	
});

casper.then(function() {
	this.test.comment('click on tools links');
	this.mouseEvent('click', '#toolscontext');
	
});

casper.then(function() {
	this.test.comment('the tools section should be visable');
	casper.test.assertVisible('.tools', 'the section is visable');
	
});

casper.then(function() {
	this.test.comment('click on tools link to close');
	this.mouseEvent('click', '#toolscontext');
	
});

casper.then(function() {
	this.test.comment('the tools section not should be visable');
	casper.test.assertNotVisible('.tools', 'the section is  not visable');
	
});

casper.run(function() {
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});