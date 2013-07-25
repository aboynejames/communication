/*
* check a new communication element has been added correclty
*/
var baseUrl = "http://localhost/ll/opensportproject/swimtraintimer/communication/src/trainprogramme.html";
var commid = '';
var testdate = "";
casper.test.comment("Scenario: start adding communication elements and edit existing element");

casper.start(baseUrl, function() {
	this.test.comment('click on make navigation link');
	this.mouseEvent('click', '#make');
//this.echo(this.getHTML());
});

casper.then(function() {
//this.echo(this.getHTML("#attention"));
	this.test.comment('click on date to open the date tools');
	this.mouseEvent('Click', '#datecontext');
//this.echo(this.getHTML("#attention"));
});

casper.then(function() {
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
	this.mouseEvent('click', 'a#newelement');
	// html body section#makeflow div#communication div#newelement a#newelement
		this.wait(2000, function() {
		this.echo("I've waited for a second.");
	});
//this.echo(this.getHTML());
//this.echo(this.getHTML("#makeflow"));
});

casper.then(function() {
	this.test.comment('the group element of conversation exist');
//this.echo(this.getHTML("#makeflow"));
		this.commid = this.getElementAttribute('.commlistitem', 'data-commid');
console.log(this.commid);
	casper.test.assertExists('.communicationelement', 'the element exists');
	casper.test.assertExists('#comel' + this.commid, 'the element exists');
	casper.test.assertExists('.communicationpool', 'the element exists');
	casper.test.assertExists('.communicationedit', 'the element exists');
	// element of a swim set
	casper.test.assertExists('#swimtype', 'the element exists');
	casper.test.assertExists('#swimstroke', 'the element exists');
	casper.test.assertExists('#swimtechnique', 'the element exists');
	casper.test.assertExists('#swimdistance', 'the element exists');
	casper.test.assertExists('#swimrepetition', 'the element exists');
	
	// the plain view for when not active edit element
	casper.test.assertNotVisible('.editswimelement');	
	
	// the edit options
	//casper.test.assertExists('#save', 'the element exists');
	casper.test.assertExists('#remove', 'the element exists');
	
});


casper.then(function() {
console.log(this.commid);
	this.test.comment('click on save button / or new element button');
	//this.mouseEvent('click', '#save');	
	
});

casper.then(function() {
	this.test.comment('click on new element, ensure id is difference from the first');
	this.mouseEvent('click', 'a#newelement');	
	this.wait(2000, function() {
		this.echo("I've waited for a second.");
	});
});

casper.then(function() {
	this.test.comment('check the edit button is now present');
	//casper.test.assertExist('#edit', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('ensure both ids are different');
//require('utils').dump(this.getElementsAttribute('.commlistitem', 'data-commid')); 
//console.log('new list of element tribues');	
//require('utils').dump(this.getElementsInfo('.commlistitem'));
	this.commid = this.getElementAttribute('.commlistitem', 'data-commid');
	this.id2 = this.getElementAttribute('.commlistitem:last-child', 'data-commid');

	casper.test.assertNotEquals(this.id2, this.commid, "ids are different");
	
});

casper.then(function() {
	this.test.comment('previous element goes to text view');
	
	this.commide = this.getElementsAttribute('.commlistitem', 'data-commid');
console.log(this.commide);
console.log('is list in order authored???');
console.log(this.commide[0]);


	// first assert previous edit mode is not visable and text view is visiable
	casper.test.assertNotVisible('#editswimelement' + this.commide[1] );	
	casper.test.assertVisible('#editdate' + this.commide[0]);	
		
	
	casper.test.assertExists('#edit', 'the element exists');
	 //this.getElementAttribute('.elementeditid', 'data-commid');
	casper.test.assertExists('.editswimelement', 'the element exists');
	casper.test.assertExists('#editdate' + this.commide[0] + ' #swimrepetition', 'the element exists');
	casper.test.assertExists('#editdate' + this.commide[0] + ' #swimtype', 'the element exists');
	casper.test.assertExists('#editdate' + this.commide[0] + ' #swimstroke', 'the element exists');
	casper.test.assertExists('#editdate' + this.commide[0] + ' #swimdistance', 'the element exists');
	casper.test.assertExists('#editdate' + this.commide[0] + ' #swimtechnique', 'the element exists');	
	
	// also make sure the selected values set are present
	this.previousdataelementset = this.fetchText('#editdate' + this.commide[0] + ' #swimrepetition');
console.log(this.previousdataelementset + 'any text');
casper.test.assertTruthy(this.previousdataelementset > 0 );
	
});

casper.then(function() {
	this.test.comment('click on edit to turn element back into input form mode');
		this.mouseEvent('click', '#edit');	
//this.echo(this.getHTML());
	
	// assert the form view is now visable
	casper.test.assertVisible('#communicationelement' + this.commide[0]);	
	// the text view now not visable
	casper.test.assertNotVisible('#editswimelement' + this.commide[0] );	
	
	// all the elements of the form view are now set again
	casper.test.assertExists('#communicationelement' + this.commide[0], 'the element exists');
	casper.test.assertExists('#comel' + this.commide[0], 'the element exists');
	casper.test.assertExists('.communicationpool', 'the element exists');
	casper.test.assertExists('.communicationedit', 'the element exists');
	// element of a swim set
	casper.test.assertExists('#swimtype', 'the element exists');
	casper.test.assertExists('#swimstroke', 'the element exists');
	casper.test.assertExists('#swimtechnique', 'the element exists');
	casper.test.assertExists('#swimdistance', 'the element exists');
	casper.test.assertExists('#swimrepetition', 'the element exists');
	// the edit options
	casper.test.assertExists('#save', 'the element exists');
	casper.test.assertExists('#remove', 'the element exists');
});

casper.then(function() {
	this.test.comment('check the current edit item is swtich to text view');

	// assert the form view is now visable
	casper.test.assertVisible('#editdate' + this.commide[1]);	
	// the text view now not visable
	casper.test.assertNotVisible('#communicationelement' + this.commide[1] );	

});

casper.then(function() {
	this.test.comment('save the whole communication programme to pouchdb');
	this.mouseEvent('click', '#newcommunication a#savecommunication');
	// html body section#makeflow div#communication div#communicationdate div#newcommunication a#savecommunication
	
});

casper.then(function() {
	this.test.comment('click date to view date list');
	this.mouseEvent('click', '#datecontext');	

});

casper.then(function() {
	this.test.comment('a new date link should be present in the pastfuture bar');
	casper.test.assertExist('.swimcommdate', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('there should only be one date present');
//require('utils').dump(this.getElementInfo('.swimcommdate'));
	
	this.firstdate = this.getElementAttribute('.swimcommdate:first-child a', 'data-dcommid');
console.log(this.firstdate);	
	casper.test.assertEquals(this.firstdate, "1381359600000", "dates are the same");

	this.test.assertDoesntExist(this.getElementAttribute('.swimcommdate:nth-child(2)', 'data-dcommid'), 'there is no second child date');
	
	});

casper.then(function() {
	this.test.comment('communication container should now be empty');
//this.echo(this.getHTML());
	// pouchdb save involed so need to manually clear	
	this.evaluate(function() {
				$(".communicationelement").empty();
		});
	casper.test.assertDoesntExist('.commlistitem', 'the element exists');

});



casper.run(function() {
//this.echo(this.getHTML());
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});