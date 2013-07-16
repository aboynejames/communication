/*
* check a new communication element has been added correclty
*/
var baseUrl = "http://localhost/ll/opensportproject/swimtraintimer/communication/src/trainprogramme.html";
var commid = '';
var testdate = "";
casper.test.comment("Scenario: A base layout of communcation builder");

casper.start(baseUrl, function() {	
	this.test.comment('click on the datepicker button');
	this.mouseEvent('Click', 'input#datepicker');

});

casper.thenEvaluate(function() {
	this.testdate = "10/10/2013"
	$( "input#datepicker" ).datepicker( "setDate", this.testdate);
			return document;

});

casper.then(function() {
	this.test.comment('click on the new element button');
	this.mouseEvent('click', '#newelement');
	
});


casper.then(function() {
	this.test.comment('the group element of conversation exist');
	
		this.commid = this.getElementAttribute('.commlistitem', 'data-commid');
//console.log(this.commid);
	
	casper.test.assertExists('#communicationelement' + this.commid, 'the element exists');
	casper.test.assertExists('#comel' + this.commid, 'the element exists');
	casper.test.assertExists('.communicationpool', 'the element exists');
	casper.test.assertExists('.communicationedit', 'the element exists');
	// element of a swim set
	casper.test.assertExists('#swimtype', 'the element exists');
	casper.test.assertExists('#swimstroke', 'the element exists');
	casper.test.assertExists('#swimtechnique', 'the element exists');
	casper.test.assertExists('#swimdistance', 'the element exists');
	casper.test.assertExists('#swimrepetition', 'the element exists');
	// the edit options
	casper.test.assertExists('#sketchpad' + this.commid, 'the element exists');
	casper.test.assertExists('#save', 'the element exists');
	casper.test.assertExists('#remove' + this.commid, 'the element exists');
	
});

casper.then(function() {
	this.test.comment('click on sketchpad');
	this.mouseEvent('click', '#sketchpad' + this.commid);	
	
});

casper.then(function() {
	this.test.comment('check sketchpad canvas div exists');
	casper.test.assertExist('#canvasDiv', 'the element exists');
	
});

casper.then(function() {
console.log(this.commid);
	this.test.comment('click on save button / or new element button');
	this.mouseEvent('click', '#save');	
	
});

casper.then(function() {
	this.test.comment('check the edit button is now present');
	casper.test.assertExist('#edit' + this.commid, 'the element exists');
	
});

casper.then(function() {
	this.test.comment('click on new element, ensure id is difference from the first');
	this.mouseEvent('click', '#newelement');	
	this.wait(2000, function() {
		this.echo("I've waited for a second.");
	});
});

casper.then(function() {
	this.test.comment('ensure both ids are different');
//console.log(this.getElementAttribute('.commlistitem:last-child', 'data-commid'));
	
	this.commid = this.getElementAttribute('.commlistitem', 'data-commid');
	this.id2 = this.getElementAttribute('.commlistitem:last-child', 'data-commid');
//console.log(this.id2);	
	//casper.test.assertTruthy(this.id2 !== this.commid);
	casper.test.assertNotEquals(this.id2, this.commid, "ids are different");
	
});

casper.then(function() {
	this.test.comment('save the whole communication programme to pouchdb');
	this.mouseEvent('click', '#savecommunication');	
	
});

casper.then(function() {
	this.test.comment('a new date link should be present in the pastfuture bar');
	casper.test.assertExist('.swimcommdate', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('there should only be one date present');
//require('utils').dump(this.getElementInfo('.swimcommdate'));
	
	this.firstdate = this.getElementAttribute('.swimcommdate:first-child a', 'data-dcommid');
//console.log(this.firstdate);	
	casper.test.assertEquals(this.firstdate, "1381359600000", "dates are the same");

	this.test.assertDoesntExist(this.getElementAttribute('.swimcommdate:nth-child(2)', 'data-dcommid'), 'there is no second child date');
	
	});

casper.then(function() {
	this.test.comment('communication container should now be empty');
	casper.test.assertDoesntExist('#communicationelement' + this.commid, 'the element exists');
	
});



casper.run(function() {
//this.echo(this.getHTML());
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});