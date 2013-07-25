/*
* check a new communication element has been added correclty
*/
var baseUrl = "http://localhost/ll/opensportproject/swimtraintimer/communication/src/trainprogramme.html";

casper.test.comment("Scenaro: new communication element add and then removed");

casper.start(baseUrl, function() {
	this.test.comment('click on make navigation link');
	this.mouseEvent('click', '#make');

});

casper.then(function() {
	this.test.comment('click on date to open the date tools');
	this.mouseEvent('Click', '#datecontext');

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
//this.echo(this.getHTML());
});

casper.then(function() {
	this.test.comment('click on the remove button');
	this.mouseEvent('click', '#remove');
	
});

casper.then(function() {
	this.test.comment('the HTML element should be remove');
	casper.test.assertDoesntExist('commlistitem');
	uniqueidadded = this.getGlobal('uniqueelementids');
this.echo(uniqueidadded);
	casper.test.assertEquals(uniqueidadded.length, 0, "the number of element is correct");
	
});

casper.then(function() {
	this.test.comment('click on the new element button twice');
	this.mouseEvent('click', 'a#newelement');
	this.mouseEvent('click', 'a#newelement');
	
});

casper.then(function() {
	this.test.comment('click on the first edit button and then remove');
//this.echo(this.getHTML());	
	liveids = this.getGlobal('uniqueelementids');
//	this.echo(liveids[0]); #editdate1374762235053.editswimelement a#edit
	firstid = '#editdate' + liveids[0]  + '.editswimelement a#edit';
	this.echo(firstid);	
//this.echo(this.getGlobal('uniqueelementids'));
	this.mouseEvent('click', firstid);	
	firstremove = '#communicationelement' + liveids[0] + '.commlistitem a#remove';
	//#communicationelement1374762138261.commlistitem a#remove
	this.mouseEvent('click', firstremove);
	
});

casper.then(function() {
	this.test.comment('the unique array and tracking order array count should equal 1');
//this.echo(this.getHTML());		
this.echo(this.getGlobal('uniqueelementids'));
this.echo(this.getGlobal('currentliveelementid'));	
	uniqueidadded = this.getGlobal('uniqueelementids');
	currentliveelementid = this.getGlobal('currentliveelementid');
	casper.test.assertEquals(uniqueidadded.length, 1, "the number of element is correct");	
	casper.test.assertEquals(currentliveelementid.length, 2, "the number of element is correct");	
	
});

casper.then(function() {
	this.test.comment('click on the remaining edit button and then remove');
	liveids = this.getGlobal('uniqueelementids');
//	this.echo(liveids[0]);
	firstid = "#editdate" + liveids[0] + " #edit";
//this.echo(firstid);	
//this.echo(this.getGlobal('uniqueelementids'));
	this.mouseEvent('click', firstid);	
	//#communicationelement1374402868393.commlistitem div.communicationedit div.removeel a#remove
	this.mouseEvent('click', "#communicationelement" +  liveids[0] + " #remove");
	
});

casper.then(function() {
	this.test.comment('the communication content should be clear');
	casper.test.assertDoesntExist('.commlistitem', 'the element exists');
	casper.test.assertDoesntExist('.editswimelement', 'the element exists');
	
});

casper.run(function() {
//this.echo(this.getHTML());
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});