/*
* check a new communication element has been added correclty
*/
var baseUrl = "http://localhost/sites/playground/html5/canvas/trainprogramme/trainprogramme.html";
var commid = '';

casper.test.comment("Scenario: A base layout of communcation builder");

casper.start(baseUrl, function() {	
	this.test.comment('click on the new element button');
	this.mouseEvent('click', '#newelement');	

});

casper.then(function() {
	this.test.comment('the group element of conversation exist');
	
	// extract commuication id
		//this.test.comment('collect the id of the communication');
//	require('utils').dump(this.getElementInfo('.commlistitem'));
		this.commid = this.getElementAttribute('.commlistitem', 'data-commid');
console.log(this.commid);
	
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
/*
casper.then(function() {
	this.test.comment('click on remove button for first element');
	this.mouseEvent('click', '#remove1');	
	
});

casper.then(function() {
	this.test.comment('the group element of conversation exist');
	casper.test.assertDoesntExist('#communicationelement1', 'the element exists');
	
});
*/

casper.then(function() {
	this.test.comment('save the whole communication programme to pouchdb');
	this.mouseEvent('click', '#savecommunication');	
	
});

casper.then(function() {
	this.test.comment('a new date link should be present in the pastfuture bar');
	casper.test.assertDoesntExist('.swimcommdate', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('communication container should now be empty');
	casper.test.assertDoesntExist('#communicationelement' + this.commid, 'the element exists');
	
});



casper.run(function() {
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});