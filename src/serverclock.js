/**
* Communication contex mixer
*
* Server clock  timing on the server
* @class serverClock
*
* @package    Communication Mixer part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var serverClock = function() {
	this.status = 'default';
	this.mastertime = [0,0,0,0,0,0,0,0];
	this.contextcontroller = {};
	this.serverTimeHolder = [];
	this.multicontext = {};
	this.spliteventcounter = 0;
	this.starteventcounter = 1;	
	this.elementHolder = {};
		
	/*
	 * inner structure inherieted from serverClock object 
	 * I found this code on a few sites and am unsure of the original author.
	 * If you know please inform me so I can credit them here.
	 *
	 * 0 = start time
	 * 1 = accumulative time / end time
	 * 2 = state (stopped or counting)
	 * 3 = total elapsed time in ms
	 * 4 = spit time / timer (interval object)
	 * 5 = epoch (January 1, 1970)
	 * 6 = element (not used here, normally stores the DOM element to update with the time)
	 * 7 = split count
	 */
};

/**
* Sets up data model object and array holders
* @method setupHolders		
*
*/	
serverClock.prototype.setupHolders = function(startIDin) {

	this.splitidlive = startIDin;			

	// keep track of the live start events
	if(!this.elementHolder[this.splitidlive])
	{
		//this.elementHolder = {};
		this.elementHolder[this.splitidlive] = [];
		
		this.activesplitter = [];
	}
	// keep track of how many times the stop button has been click
	if(!this.stoppedlist)
	{
		this.stoppedlist = [];
	}
		
	

};

/**
* Handles start events coming from the server manages display
* @method startClock		
*
*/	
serverClock.prototype.startClock = function(startimeID) {
	
	this.mastertime[5] = new Date(1970, 1, 1, 0, 0, 0, 0).valueOf();
	this.mastertime[0] = (+new Date()).valueOf();
	this.mastertime[4] = setInterval(function(){liveServerclock.displayClock();}, 43);
	return false;

};

/**
* Manages the display of the UI clock
* @method displayClock		
*
*/	
serverClock.prototype.displayClock = function() {
	
	// create a local independent instance of class array
	this.delaymaster = this.mastertime;
	
	this.delaymaster[2] = 1;
		
	if (this.delaymaster[2]) {
		
		this.delaymaster[1] = (new Date()).valueOf();

	}

	$("#timer").text(this.formatDisplay(this.delaymaster[3] + this.delaymaster[1] - this.delaymaster[0]));
		
};

/**
* format a digital number string to time format presentation
* @method formatDisplay
*/
serverClock.prototype.formatDisplay = function(ms) {
	var d = new Date(ms + this.mastertime[5]).toString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
	var x = String(ms % 1000);

	while (x.length < 3) {
		x = '0' + x;
	}
	d += '.' + x;
	return d.substr(0, d.length - 1);
};

/**
* identity time management controller
* @method IDtimeController
*/
serverClock.prototype.IDtimeController = function(eventdataIN) {

	var inEvent = JSON.parse(eventdataIN);
	// get ID key
	var IDin = Object.keys(inEvent);
	var holdtempory = {};
		
	if(inEvent[IDin[0]][0] == "startpress")
	{
		this.setupHolders(IDin[0]);

		this.contextcontroller[IDin[0]] = this.starteventcounter;	
		holdtempory[this.spliteventcounter] = inEvent[IDin[0]][1];
		this.elementHolder[IDin[0]].push(holdtempory);

		
		$(".splitbutton" + IDin[0]).css("background", 'green');
		// $(".splitbutton" + IDin[0]).fadeTo( 500, 1, function() {
		//	$(".splitbutton" + IDin[0]).css( "background", "blue" );
		
		//});
				
		liveHTML.clearIDdisplay(IDin[0]);

				
	}
	else if(inEvent[IDin[0]][0] == "secondpress")
	{	
		// need to add elementholder for this idtime event
		var StartcounterNow = this.elementHolder[IDin[0]];  //.slice(-1)[0];	
		var StartcounterNumbers = Object.keys(StartcounterNow);
		// need to sort object low to highest and extract the highest number
		orderedStartnos = StartcounterNumbers.sort(function(a,b){return b-a});
			
		var StartcounterValue =  parseInt((orderedStartnos[0] ),10);	
		var ElementcounterNumber = Object.keys(this.elementHolder[IDin[0]][StartcounterValue]);		
		var elementCounter = ElementcounterNumber.slice(-1)[0];	
		var ElementcounterValue =  parseInt((elementCounter),10)  + 1;
		
		holdtempory = inEvent[IDin[0]][1];

		this.elementHolder[IDin[0]][StartcounterValue][ElementcounterValue] = holdtempory;	

		// inform the UI of the data need to present
		presentationData = this.presentationPrepare(IDin[0], StartcounterValue, ElementcounterValue);
		liveHTML.displaySeverClockdata(IDin[0], presentationData);
			
	}
	else if(inEvent[IDin[0]][0] == "startend")
	{
		// need to add elementholder for this idtime event
		var StartcounterNow = this.elementHolder[IDin[0]];  //.slice(-1)[0];
		var StartcounterNumbers = Object.keys(StartcounterNow);
		// need to sort object low to highest and extract the highest number
		orderedStartnos = StartcounterNumbers.sort(function(a,b){return b-a});
			
		var StartcounterValue =  parseInt((orderedStartnos[0] ),10);
	
		var ElementcounterNumber = Object.keys(this.elementHolder[IDin[0]][StartcounterValue]);		

		var elementCounter = ElementcounterNumber.slice(-1)[0];
	
		var ElementcounterValue =  parseInt((elementCounter),10) + 1;
		
		holdtempory = inEvent[IDin[0]][1];

		this.elementHolder[IDin[0]][StartcounterValue][ElementcounterValue] = holdtempory;
		// inform the UI of the data need to present
		presentationData = this.presentationPrepare(IDin[0], StartcounterValue, ElementcounterValue);
		liveHTML.displaySeverClockdata(IDin[0], presentationData);

		$(".splitbutton" + IDin[0]).css("background", 'blue');
		
		// save the element and broadcastout via pi
		this.saveLocal(IDin[0]);
		// TODO  need to localise to per ID
		this.recordmanagement();
		liveLogic.setNameID(IDin[0], IDin[0]);
		
	}
	
};


/**
* holding the split difference for future comparision
* @method setsplitDifference
*/
serverClock.prototype.setsplitDifference = function(splitin, timeINid, startcounter, elementcounter) {

	var diffHolder = {};
	diffHolder[timeINid][startcounter][elementcounter]= splitin;
	
	this.splitdifferenceHolder.push(diffHolder);

};

/**
* prepares time data for analysis and coloring
* @method presentationPrepare
*/
serverClock.prototype.presentationPrepare = function(timeINid, startcounter, elementcounter) {
	
	var timePrepared = {};
	var lastcounterelement = '';
	// extract the current time	
	if(elementcounter == 1)
	{
		// extract starttime
		timePrepared['splitno'] = elementcounter;
		lastcounterelement = 0;
		var previousSettime = this.elementHolder[timeINid][startcounter][elementcounter][0];
		// setup split calculate
		timePrepared['accumtime'] = this.elementHolder[timeINid][startcounter][elementcounter][3] - previousSettime;
		 this.elementHolder[timeINid][startcounter][elementcounter][1] = timePrepared['accumtime'];

	}
	else
	{
		// get the previous split time
		timePrepared['splitno'] = elementcounter;
		lastcounterelement = elementcounter - 1;
		var previousSettime = this.elementHolder[timeINid][startcounter][lastcounterelement][1];
		timePrepared['accumtime'] = this.elementHolder[timeINid][startcounter][elementcounter][3] - this.elementHolder[timeINid][startcounter][elementcounter][0];
		this.elementHolder[timeINid][startcounter][elementcounter][1] = timePrepared['accumtime'];			

	}	
	
	// calculate split 
	 timePrepared['splitdifftime'] = timePrepared['accumtime'] - (this.elementHolder[timeINid][startcounter][lastcounterelement][1]);

	//set the difference for future comparison
	this.elementHolder[timeINid][startcounter][elementcounter][4] = timePrepared['splitdifftime'];
	// calculate faster slower and color
	if(elementcounter == 1)
	{
		var previousDiffsplit = 0;
	}
	else
	{
		var previousDiffsplit = this.elementHolder[timeINid][startcounter][lastcounterelement][4] - timePrepared['splitdifftime'];		
	}
	
	if(timePrepared['splitdifftime'] > previousDiffsplit)
	{
		timePrepared['colortime'] = "red";
	}
	else
	{
		timePrepared['colortime'] = "green";
	}	
	
	return  timePrepared;

};

/**
* holding the split difference for future comparision
* @method saveLocal
*/
serverClock.prototype.saveLocal = function(statusin) {
	// first workout previous elements data
	var fixedOnData = this.elementHolder[statusin];
	
	var StartcounterNumbers = Object.keys(fixedOnData);
	// need to sort object low to highest and extract the highest number
	var orderedStartnos = StartcounterNumbers.sort(function(a,b){return b-a});
	var StartcounterValue =  parseInt((orderedStartnos[0] ),10);// - 1;
	if(StartcounterValue > 0)

	{

		var splitaccTime = this.splitDataextract(this.elementHolder[statusin][StartcounterValue]);
	
		//var sptoday = new Date();
		var datesplitnumber = fixedOnData[StartcounterValue][0][0]; //Date.parse(sptoday);	

		swimdatastatus = {};		
		
		// need to identify live swim element
		var liveelementrecord = $(".recordcount").parent().attr('id');		
		swimtype = $("#" + liveelementrecord + ".liveswimelement #swimtype").text();
		swimstroke = $("#" + liveelementrecord + ".liveswimelement #swimstroke").text();
		swimtechnique = $("#" + liveelementrecord + ".liveswimelement #swimtechnique").text();
		swimdistance = $("#" + liveelementrecord + ".liveswimelement #swimdistance").text();
		swimsplit = $("#swimsplit").val();
		// form swim data
		var d = new Date(datesplitnumber);
		swimdatastatus.swimdate = d.toString(); 
		swimdatastatus.swimtype = swimtype;
		swimdatastatus.swimstroke = swimstroke;
		swimdatastatus.swimtechnique = swimtechnique;
		swimdatastatus.swimdistance = swimdistance;
		swimdatastatus.swimsplit = swimsplit;
	
		// save to localpouchdb need to prepare buld array json structure 
		newjsonswim = {};								
		newjsonswim.swimmerid = '';
		newjsonswim.swimmername = '';					
		newjsonswim.session = {};
		newjsonswim.swimmerid = statusin;
		newjsonswim.swimmername = statusin;					
		newjsonswim.session.sessionid = datesplitnumber;	
		newjsonswim.session.swiminfo = swimdatastatus;	
		newjsonswim.session.splittimes = splitaccTime;

		livepouch.singleSave(newjsonswim);
			
		// emitt socket back to pi server
		starttiming.classSocket.emit('contextMixer', newjsonswim);
		// emitt identity timing event trigger
		//starttiming.classSocket.emit('checkSplitID', newjsonswim);			

	}
};

/**
* extract out the accumaltive times and splits
* @method splitDataextract
*/
serverClock.prototype.splitDataextract = function(liveTimedata) {
	
	var timeData = [];
	var ElemeantcounterNumbers = Object.keys(liveTimedata);
	
	
	ElemeantcounterNumbers.forEach(function(elemID) {
		
		timeData.push(liveTimedata[elemID][1]);
		
	});
	
	return timeData;
};


/**
*  Master record management
* @method recordmanagement
*/
serverClock.prototype.recordmanagement = function() {
			// need to keep a counter of element order start if with one
	var norepetitionsobject = $('#swimrepetition.recordlive');	
	
	var totalelementrec = $(".liveswimelement").length -1;
	// add one to recordcounter
	var newcounter = parseInt($(".recordcount").text());
	nextcount = newcounter + 1;

	norepetitionsobject = $('#swimrepetition.recordlive');		
	var norepetitions =norepetitionsobject[elementliverecid].innerHTML;
	
	if(nextcount > norepetitions)
	{	
		// check if more record element or time to finish recording
		if(elementliverecid == totalelementrec)
		{
		$(".recordfeedback").text('Finished recording');
			// need to reset / clear record variables
			elementliverecid = 0;

		}
		else
		{
			elementliverecid++;
			//remove record live from current element and add it to the next
			$('.recordcount').remove();
			// add it to the next item				
			$('#' + norepetitionsobject[elementliverecid].parentNode.id).append('<div class="recordcount" >1</div>');		
		}
	}
	else
	{
		$(".recordcount").text(nextcount);
	}
	
};

/**
*  Master record management back one set element
* @method backrecordmanagement
*/
serverClock.prototype.backrecordmanagement = function() {
			// need to keep a counter of element order start if with one
	var norepetitionsobject = $('#swimrepetition.recordlive');	
	
	var totalelementrec = $(".liveswimelement").length -1;
	// add one to recordcounter
	var newcounter = parseInt($(".recordcount").text());
	nextcount = newcounter - 1;

	norepetitionsobject = $('#swimrepetition.recordlive');		
	var norepetitions = norepetitionsobject[elementliverecid].innerHTML;

	if(nextcount == 0)
	{	
		if(elementliverecid === 0)
		{
			$(".recordfeedback").text('Ready to start recording');
		}
		else
		{
		// then need to go back one whole set rather than a set element
		elementliverecid--;
		$('.recordcount').remove();
			// add it to the previous set				
			$('#' + norepetitionsobject[elementliverecid].parentNode.id).append('<div class="recordcount" >1</div>');		
		//if there is no precious set then, the start of the training set has been reached
		}
	}
	else
	{
		$(".recordcount").text(nextcount);
	}
	
};
