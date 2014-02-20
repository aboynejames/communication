/*
* check the frame section are in order
*/
var baseUrl = "http://localhost/ll/opensportproject/swimtraintimer/communication/src/index.html";

casper.test.comment("Scenario: select the tools menu to remove a swimmer from the active list");

casper.start(baseUrl, function() {
	this.test.comment('ensure the tools menu button exists');
	casper.test.assertExist('#toolscontext', 'element exists');

});

casper.then(function() {
	this.test.comment('click on the tools menu button');
	this.mouseEvent('click', '#toolscontext');

});

casper.then(function() {
	this.test.comment('check the sub tools remove button is live');
	casper.test.assertExist('#startremove', 'element exists');
	
});

casper.then(function() {
	this.test.comment('click on the re move order button');
	this.mouseEvent('click', '#startremove');
	
});


casper.run(function() {
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});