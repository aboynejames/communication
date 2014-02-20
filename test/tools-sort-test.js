/*
* check the frame section are in order
*/
var baseUrl = "http://localhost/ll/opensportproject/swimtraintimer/communication/src/index.html";

casper.test.comment("Scenario: select the tools menu to edit order of the swimmers");

casper.start(baseUrl, function() {
	this.test.comment('ensure the tools menu button exists');
	casper.test.assertExist('#toolscontext', 'element exists');

});

casper.then(function() {
	this.test.comment('click on the tools menu button');
	this.mouseEvent('click', '#toolscontext');

});

casper.then(function() {
	this.test.comment('check the sub tools edit order option is live');
	casper.test.assertExist('#startsort', 'element exists');
	
});

casper.then(function() {
	this.test.comment('click on the edit order button');
	this.mouseEvent('click', '#startsort');
	
});


casper.run(function() {
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});