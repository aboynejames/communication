/*
* check the frame section are in order
*/
var baseUrl = "http://localhost/ll/opensportproject/swimtraintimer/communication/src/index.html";

casper.test.comment("Scenario: ensure the stream is the default UI then click on each framework sections");

casper.start(baseUrl, function() {
	this.test.comment('the stream section is live');
	//casper.test.assertVisible('#streamflow', 'the section is visable');
	// also make sure background color set
//require('utils').dump(this.getElementInfo('.stream'));	
//this.echo(this.getElementAttribute('.stream', 'class'));
//console.log(this.getHTML('.stream'));
//	background: cyan;

});

casper.then(function() {
	this.test.comment('the other sections shoud be hidden');
//	casper.test.assertNotVisible('#meflow', 'the section is not visable');
	casper.test.assertVisible('#recordflow', 'the section is visable');
	casper.test.assertNotVisible('#makeflow', 'the section is not visable');	
});
/*
casper.then(function() {
	this.test.comment('click on "me"');
	this.mouseEvent('click', '#me');
	
});

casper.then(function() {
	this.test.comment('the me section should be visable');
	casper.test.assertVisible('#meflow', 'the section is visable');

});

casper.then(function() {
	this.test.comment('the other sections shoud be hidden');
	//casper.test.assertNotVisible('#streamflow', 'the section is not visable');
	casper.test.assertNotVisible('#recordflow', 'the section is not visable');
	casper.test.assertNotVisible('#makeflow', 'the section is not visable');	
});
*/
/*
casper.then(function() {
	this.test.comment('click on "stream"');
	this.mouseEvent('click', '#stream');
	
});

casper.then(function() {
	this.test.comment('the stream section should be visable');
	casper.test.assertVisible('#streamflow', 'the section is visable');


});

casper.then(function() {
	this.test.comment('the other sections shoud be hidden');
	//casper.test.assertNotVisible('#meflow', 'the section is not visable');
	casper.test.assertNotVisible('#recordflow', 'the section is not visable');
	casper.test.assertNotVisible('#makeflow', 'the section is not visable');	
});
*/
casper.then(function() {
	this.test.comment('click on "record"');
	this.mouseEvent('click', '#recordme');
	
});

casper.then(function() {
	this.test.comment('the record section should be visable');
	casper.test.assertVisible('#recordflow', 'the section is visable');

});

casper.then(function() {
	this.test.comment('the other sections shoud be hidden');
	casper.test.assertNotVisible('#streamflow', 'the section is not visable');
	casper.test.assertNotVisible('#meflow', 'the section is not visable');
	casper.test.assertNotVisible('#makeflow', 'the section is not visable');	
});

casper.then(function() {
	this.test.comment('click on "make"');
	this.mouseEvent('click', '#make');
	
});

casper.then(function() {
	this.test.comment('the make section should be visable');
	casper.test.assertVisible('#makeflow', 'the section is visable');

});

casper.then(function() {
	this.test.comment('the other sections shoud be hidden');
	casper.test.assertNotVisible('#streamflow', 'the section is not visable');
	casper.test.assertNotVisible('#recordflow', 'the section is not visable');
	casper.test.assertNotVisible('#meflow', 'the section is not visable');	
});



casper.run(function() {
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});