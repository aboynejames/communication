/*
* check a new communication element has been added correclty
*/
var baseUrl = "http://localhost/ll/opensportproject/swimtraintimer/communication/src/index.html";

casper.test.comment("Scenario: record data and keep live communication set in sync");

casper.start(baseUrl, function() {	
	this.test.comment('mock adding a liveswimelement');
	
		this.evaluate(function() {
		
		// need to fake up the returned Pouchdb query object and produce HTML
		$(".liveswimset").append('<div id="livedate1374053681000" class="liveswimelement"><div class="recordcount">1</div><div class="recordlive" id="swimrepetition">2</div> <div id="swimtype">warmup</div> <div id="swimstroke">backcrawl</div> <div id="swimdistance">200</div> <div id="swimtechnique">swim </div></div><div id="livedate1374053688000" class="liveswimelement"><div class="recordlive" id="swimrepetition">4</div> <div id="swimtype">warmup</div> <div id="swimstroke">backcrawl</div> <div id="swimdistance">500</div> <div id="swimtechnique">fins </div></div><div id="livedate1374053702000" class="liveswimelement"><div class="recordlive" id="swimrepetition">6</div> <div id="swimtype">warmdown</div> <div id="swimstroke">butterfly</div> <div id="swimdistance">150</div> <div id="swimtechnique">swim </div></div>');
		});
			
});

casper.then(function() {
	this.test.comment('count how many individual communication elements to record');
	casper.test.assertExists('.liveswimelement:nth-child(1)', 'the element exists');
	casper.test.assertExists('.liveswimelement:nth-child(2)', 'the element exists');
	casper.test.assertExists('.liveswimelement:nth-child(3)', 'the element exists');	
//require('utils').dump(this.getElementInfo('.liveswimelement'));
//require('utils').dump(this.getElementInfo('.liveswimelement:nth-child(2)'));
//console.log(this.getElementAttribute('.liveswimelement:nth-child(2)', 'id') + 'child 2');	
//console.log(this.repetitionnumber = this.fetchText('.liveswimelement:nth-child(2)') + 'text');
	this.numberofelementslive = '3';
	casper.test.assertEquals(this.numberofelementslive, "3", "the number of element is correct");
	
});

casper.then(function() {
	this.test.comment('only the first record element should have a counter');
	casper.test.assertExists('.recordcount:nth-child(1)', 'the element exists');
	this.test.assertDoesntExist('.recordcount:nth-child(2)', 'the does not element exists');
	
});


casper.then(function() {
	this.test.comment('first collect the first element repetition number');
	this.repetitionnumber = this.fetchText('.recordcount');
	casper.test.assertEquals(this.repetitionnumber, "1", "the repetition number is correct");
//this.echo(this.getHTML());
});

casper.then(function() {
	this.test.comment('click #record button to simulate finish of a recording element');
	//this.mouseEvent('click', '#record');
	this.evaluate(function() {
	 starttiming.activetimeclock.startclock.recordmanagement();
	});
//this.echo(this.getHTML());
});

casper.then(function() {
	this.test.comment('the record counter should now read 2');
//this.echo(this.getHTML());	
	this.repetitionnumbernext = this.fetchText('.recordcount');
console.log(this.repetitionnumbernext + 'rep after one record');
	casper.test.assertEquals(this.repetitionnumbernext, "2", "the repetition number is correct");

});

casper.then(function() {
	this.test.comment('click #record button to simulate finish of a recording element');
		this.evaluate(function() {
	 starttiming.activetimeclock.startclock.recordmanagement();
	});
	//this.mouseEvent('click', '#record');

});

casper.then(function() {
	this.test.comment('recordcount switch back next element, counter at 1 again');
	this.repetitionnumbersecond = this.fetchText('.recordcount');
	casper.test.assertEquals(this.repetitionnumbersecond, "1", "the repetition number is reset to 1");
// make sure the recordcount class has been removed from first element
		this.test.assertDoesntExist('.liveswimelement:nth-child(1).recordcount', 'the does not element exists');

});

casper.then(function() {
	this.test.comment('click #record button 3 times to complete 2nd element and 6 times for third');
	this.evaluate(function() {
		starttiming.activetimeclock.startclock.recordmanagement();
		starttiming.activetimeclock.startclock.recordmanagement();		
		starttiming.activetimeclock.startclock.recordmanagement();
		starttiming.activetimeclock.startclock.recordmanagement();			
		starttiming.activetimeclock.startclock.recordmanagement();
		starttiming.activetimeclock.startclock.recordmanagement();		
		starttiming.activetimeclock.startclock.recordmanagement();
		starttiming.activetimeclock.startclock.recordmanagement();
		starttiming.activetimeclock.startclock.recordmanagement();
		starttiming.activetimeclock.startclock.recordmanagement();						
	});
});


casper.then(function() {
	this.test.comment('the complete set is complete, finish feedback message');
	casper.test.assertExists('.recordfeedback', 'the element exists');
	this.recordfeedbacktext = this.fetchText('.recordfeedback');
//console.log(this.repetitionnumbernext + 'rep after one record');
	casper.test.assertEquals(this.recordfeedbacktext, 'Finished recording', "the recording set is over");
	
});


casper.run(function() {
//this.echo(this.getHTML());
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});