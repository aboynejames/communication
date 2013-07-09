/*
* load and playback swim commuication
*/
var baseUrl = "http://localhost/sites/playground/html5/canvas/trainprogramme/trainprogramme.html";

casper.test.comment("Scenario: Load swim communication and playback");

casper.start(baseUrl, function() {
	this.test.comment('create starting fpdate link');

	var jdfd = this.evaluate(function() {
			
			$(".pastfuturecomm").html('<div id="swimcommdate"> <a href="" id="fpdate" >16/06/2013</a></div>');
		
		return document;
								
		});

});

casper.then(function() {
	this.test.comment('click on the fpdate to display live communicatoin programme');
	this.mouseEvent('click', '#fpdate');	
	
	this.evaluate(function() {
		$(".liveswimset").text('warmup');
	});
	
});

casper.then(function() {
	this.test.comment('element of communication content should be presented');
//require('utils').dump(this.getElementInfo('.liveswimset'));
	this.stg2 = this.fetchText('.liveswimset');
	sptime2 = this.stg2.length;
	casper.test.assertTruthy(sptime2 > 0 );
});

casper.run(function() {
	//this.echo(this.getHTML());
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});