/**
* Train Timer
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
//console.log('start setup');
//console.log(this.elementHolder);			
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
//console.log(this.delaymaster);		
	if (this.delaymaster[2]) {
//console.log('new timer interval value');		
		this.delaymaster[1] = (new Date()).valueOf();
//console.log(this.delaymaster[1]);		
	}
//console.log(this.delaymaster);	
//console.log(this.delaymaster[3] + this.delaymaster[1] - this.delaymaster[0]);	
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
//console.log(inEvent);
	// get ID key
	var IDin = Object.keys(inEvent);
//console.log(IDin[0]);	
//console.log(inEvent[IDin[0]][0]);	
	var holdtempory = {};
		
	if(inEvent[IDin[0]][0] == "startpress")
	{
//console.log('start event');
		this.setupHolders(IDin[0]);

		this.contextcontroller[IDin[0]] = this.starteventcounter;	
//console.log(inEvent[IDin[0]][1]);
		holdtempory[this.spliteventcounter] = inEvent[IDin[0]][1];
//console.log(IDin[0]);		
//console.log(this.elementHolder[IDin[0]]);
		this.elementHolder[IDin[0]].push(holdtempory);
		liveHTML.clearIDdisplay(IDin[0]);
		
		// save the previous element and broadcastout via pi
		
				
	}
	else if(inEvent[IDin[0]][0] == "secondpress")
	{
		// need to add elementholder for this idtime event
		var StartcounterNow = this.elementHolder[IDin[0]];  //.slice(-1)[0];
//console.log(StartcounterNow);		
		var StartcounterNumbers = Object.keys(StartcounterNow);
//console.log(StartcounterNumbers);
		// need to sort object low to highest and extract the highest number
		orderedStartnos = StartcounterNumbers.sort(function(a,b){return b-a});
			
		var StartcounterValue =  parseInt((orderedStartnos[0] ),10);
//console.log(StartcounterValue + 'start counter');		
//console.log(this.elementHolder[IDin[0]][StartcounterValue]);	
		var ElementcounterNumber = Object.keys(this.elementHolder[IDin[0]][StartcounterValue]);		
//console.log(ElementcounterNumber); 
		var elementCounter = ElementcounterNumber.slice(-1)[0];
//console.log(elementCounter);		
		var ElementcounterValue =  parseInt((elementCounter),10)  + 1;
//console.log(ElementcounterValue + 'element counter now');
		
		holdtempory = inEvent[IDin[0]][1];
//console.log(IDin[0]);		
//console.log(this.elementHolder[IDin[0]]);
		this.elementHolder[IDin[0]][StartcounterValue][ElementcounterValue] = holdtempory;	

		// inform the UI of the data need to present
		presentationData = this.presentationPrepare(IDin[0], StartcounterValue, ElementcounterValue);
		liveHTML.displaySeverClockdata(IDin[0], presentationData);
			
	}
	else if(inEvent[IDin[0]][0] == "startend")
	{
		// need to add elementholder for this idtime event
		var StartcounterNow = this.elementHolder[IDin[0]];  //.slice(-1)[0];
//console.log(StartcounterNow);		
		var StartcounterNumbers = Object.keys(StartcounterNow);
//console.log(StartcounterNumbers);
		// need to sort object low to highest and extract the highest number
		orderedStartnos = StartcounterNumbers.sort(function(a,b){return b-a});
			
		var StartcounterValue =  parseInt((orderedStartnos[0] ),10);
//console.log(StartcounterValue + 'start counter');		
//console.log(this.elementHolder[IDin[0]][StartcounterValue]);	
		var ElementcounterNumber = Object.keys(this.elementHolder[IDin[0]][StartcounterValue]);		
//console.log(ElementcounterNumber); 
		var elementCounter = ElementcounterNumber.slice(-1)[0];
//console.log(elementCounter);		
		var ElementcounterValue =  parseInt((elementCounter),10)  + 1;
//console.log(ElementcounterValue + 'element counter now');
		
		holdtempory = inEvent[IDin[0]][1];
//console.log(IDin[0]);		
//console.log(this.elementHolder[IDin[0]]);
		this.elementHolder[IDin[0]][StartcounterValue][ElementcounterValue] = holdtempory;
		// inform the UI of the data need to present
		presentationData = this.presentationPrepare(IDin[0], StartcounterValue, ElementcounterValue);
		liveHTML.displaySeverClockdata(IDin[0], presentationData);
		
	}
	
//console.log(this.serverTimeHolder);	
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
//console.log(this.elementHolder[timeINid][startcounter][elementcounter]);
		
	
	if(elementcounter == 1)
	{
		// extract starttime
		timePrepared['splitno'] = elementcounter;
		var previousSettime = timePrepared['accumtime'] = this.elementHolder[timeINid][startcounter][elementcounter][0];
		// setup split calculate
		timePrepared['accumtime'] = this.elementHolder[timeINid][startcounter][elementcounter][3] - previousSettime;
//console.log(timePrepared['accumtime']);	
	}
	else
	{
		// get the previous split time
		timePrepared['splitno'] = elementcounter;
		lastcounterelement = elementcounter -1;
		var previousSettime = this.elementHolder[timeINid][startcounter][lastcounterelement][3];
		timePrepared['accumtime'] = this.elementHolder[timeINid][startcounter][elementcounter][3] - this.elementHolder[timeINid][startcounter][elementcounter][0];
//console.log(timePrepared['accumtime']);		

	}
		
	
	// calculate split 
//console.log(timePrepared['accumtime']);
//console.log(previousSettime);	
	 timePrepared['splitdifftime'] = timePrepared['accumtime'] - (previousSettime - this.elementHolder[timeINid][startcounter][elementcounter][0]);
//console.log(timePrepared['splitdifftime']); 
	//set the difference for future comparison
	//this.setsplitDifference(timePrepared['splitdifftime'], timeINid, startcounter, elementcounter);
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
//console.log(timePrepared['colortime']);		
	return  timePrepared;

};





