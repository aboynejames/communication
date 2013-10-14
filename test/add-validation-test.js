/*
* check a new communication element has been added correclty
*/
var baseUrl = "http://localhost/ll/opensportproject/swimtraintimer/communication/src/index.html";
var commid = '';
var testdate = "";
casper.test.comment("Scenario: add a new communication element but with no date, pick up validation");

casper.start(baseUrl, function() {	
	this.test.comment('click on the datepicker button');
	this.mouseEvent('Click', 'input#datepicker');

});

casper.then(function() {
	this.test.comment('show that the date field is empty');
	this.datetext = this.fetchText('input#datepicker');
	casper.test.assertEquals(this.datetext, "", "there is no date-v");
	
});

casper.then(function() {
	this.test.comment('save the whole communication programme to pouchdb');
	this.mouseEvent('click', '#savecommunication');	
	
});

casper.then(function() {
	this.test.comment('prompt to ask for date to be added');
	casper.test.assertExists('.commfeedback', 'the element exists');
	this.feedbacktext = this.fetchText('.commfeedback');
	casper.test.assertEquals(this.feedbacktext, "Please add a date Please add a communication element", "feedback is correct");
	
});

casper.thenEvaluate(function() {
	this.testdate = "10/10/2013"
	$( "input#datepicker" ).datepicker( "setDate", this.testdate);
			return document;

});

casper.then(function() {
	this.test.comment('save the whole communication programme to pouchdb');
	this.mouseEvent('click', '#savecommunication');	
	
});

// check if a date is present
casper.then(function() {
	this.test.comment('prompt to ask for a communication element to be added');
	casper.test.assertExists('.commfeedback', 'the element exists');
	this.feedbacktext = this.fetchText('.commfeedback');
	casper.test.assertEquals(this.feedbacktext, " Please add a communication element", "feedback is correct");
	
});

casper.then(function() {
	this.test.comment('click on the new element button');
	this.mouseEvent('click', '#newelement');
	
});

casper.then(function() {
	this.test.comment('press savecommunication again and save to pouch');
	this.mouseEvent('click', '#savecommunication');	
	
});

casper.then(function() {
	this.test.comment('there should only be one date present');
//require('utils').dump(this.getElementInfo('.swimcommdate'));
	
	this.firstdate = this.getElementAttribute('.swimcommdate:first-child a', 'data-dcommid');
//console.log(this.firstdate);	
	casper.test.assertEquals(this.firstdate, "1381366800000", "dates are the same");

	this.test.assertDoesntExist(this.getElementAttribute('.swimcommdate:nth-child(2)', 'data-dcommid'), 'there is no second child date');
	
	});

casper.run(function() {
//this.echo(this.getHTML());
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});