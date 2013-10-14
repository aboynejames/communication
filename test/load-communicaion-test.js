/*
* load and playback swim commuication
*/
var baseUrl = "http://localhost/ll/opensportproject/swimtraintimer/communication/src/index.html";

casper.test.comment("Scenario: Load swim communication and playback");

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
	this.test.comment('save the whole communication programme to pouchdb');
	this.mouseEvent('click', '#savecommunication');	
	
	// need to mock up response from after pouchdb save
		this.evaluate(function() {
		
			var datein = $( "#datepicker" ).datepicker( "getDate" );
			var dateid = '<div class="swimcommdate"><a href="" id="fpdate" data-dcommid="' + Date.parse(datein) + '" >' + datein + '</a></div>';
				$(dateid).appendTo(".pastfuturecomm");
				$(".communicationelement").empty();
		});
	
});

casper.then(function() {
	this.test.comment('press an existing communication set');
	this.mouseEvent('click', '#fpdate');	
	
	
	this.evaluate(function() {
		
		// empty the existing live communication
		$(".liveswimset").empty();
	
		// need to fake up the returned Pouchdb query object and produce HTML

			$(".liveswimset").append('<div id="livedate1381359600000" class="liveswimelement"><div id="swimrepetition">1</div> <div id="swimtype">warmup</div> <div id="swimstroke">freestyle</div> <div id="swimdistance">25</div> <div id="swimtechnique">swim</div></div>');

							// empty the commuication on screen.
			$(".communicationelement").empty();
		
	});	
	
});

casper.then(function() {
	this.test.comment('element of communication content should be presented');
	// the default setting should be dispaly ie. warmup  freestyle swim 25 1
//require('utils').dump(this.getElementInfo('.liveswimset'));
	// each liveste should have a container
	casper.test.assertExists('.liveswimelement', 'the element exists');
	//html body div.liveswimset div#livedate1373905620000.liveswimelement div#swimtype
//require('utils').dump(this.getElementInfo('.liveswimelement #swimtype'));
	this.type = this.fetchText('.liveswimelement #swimtype');
//console.log(this.type);
	casper.test.assertEquals(this.type, 'warmup', "the same");
	
	this.swimstroke = this.fetchText('.liveswimelement  #swimstroke');
	casper.test.assertEquals(this.swimstroke, 'freestyle', "the same");

	this.swimtech = this.fetchText('.liveswimelement  #swimtechnique');
	casper.test.assertEquals(this.swimtech, 'swim', "the same");
	
	this.distance = this.fetchText('.liveswimelement  #swimdistance');
	casper.test.assertEquals(this.distance, '25', "the same");	
	
	this.reps = this.fetchText('.liveswimelement  #swimrepetition');
	casper.test.assertEquals(this.reps, '1', "the same");	

});

casper.run(function() {
//this.echo(this.getHTML());
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});