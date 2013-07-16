/*
* load, select, range etc date testing
*/
var baseUrl = "http://localhost/ll/opensportproject/swimtraintimer/communication/src/trainprogramme.html";

casper.test.comment("Scenario: select dates and organisation tests");

casper.start(baseUrl, function() {
	this.test.comment('base datepicker div container');
	casper.test.assertExists('#datepicker', 'the element exists');
	

});

casper.then(function() {
	
});

casper.run(function() {
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});