/*
* load and playback swim commuication
*/
var baseUrl = "http://localhost/ll/opensportproject/swimtraintimer/communication/src/index.html";

casper.test.comment("Scenario: make sure the basic record UI feature are there");

casper.start(baseUrl, function() {	
	this.test.comment('click the record section');
	this.mouseEvent('Click', '#recordme');

});

casper.then(function() {
	this.test.comment('the skip and back button present');
	casper.test.assertExists('#skipelement', 'the element exists');
	casper.test.assertExists('#backelement', 'the element exists');
	
});

casper.run(function() {
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});