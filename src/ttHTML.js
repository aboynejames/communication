/**
* Train TImer
*
* Train Timer settings, html code
* @class ttHTML
*
* @package    Train Timer part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var ttHTML = function() {
	this.template = 'default';
	this.realtimehold = {};

};

/**
* Display checkbox of swimmer
* @method fromswimmers		
*
*/	
ttHTML.prototype.fromswimmers = function(swname, swid) {
				
	var swimstarters = '<li class="ui-state-default"  id="' + swid + '">';

	swimstarters +=	'<div id="perswimmerset" >';
	swimstarters +=	'<ul id="percontrols">';
	//swimstarters +=	'<li><a href="#" id="stop" title="' + swid + '" >Stop</a></li>';
	swimstarters +=	'<li><a href="#" id="split" title="' + swid + '" class="splitbutton' + swid +'" >Split</a></li>';
	swimstarters +=	'</ul>';
	swimstarters +=  '<div id="pername" >' + swname + '</div>';
	swimstarters +=	'</div>';
	swimstarters +=	'<div id="perrealtime" >';
	swimstarters +=	'<ul id="splits' + swid + '" class="splits" >';
	swimstarters +=	'<li></li>';
	swimstarters +=	'</ul>';
	swimstarters +=	'<ul id="analysis' + swid + '" class="analysis" >';
	swimstarters +=	'<li></li>';
	swimstarters +=	'</ul>'; 
	swimstarters +=	'</div>';

	swimstarters += '<div class="peranalysis">';
	// call function to prepare all links now to 30 days and chart icon
	

	swimstarters += '<a href="" id="peranalysisid" class="peranalysisid'+ swid + '" title="' + swid + '" data-statusanalysis="on">Now</a>';
	swimstarters += '<a href="" id="perchartid" class="perchartid'+ swid + '" title="' + swid + '" data-statusanalysis="on"> Chart</a>';
	swimstarters += '<a href="" id="persummaryid" class="persummaryid'+ swid + '" title="' + swid + '" data-statusanalysis="on"> Summary</a>';
	swimstarters += '<a href="" id="perbioid" class="perbioid'+ swid + '" title="' + swid + '" data-statusanalysis="on"> Bio-stats</a>';
	swimstarters += '</div>';

	swimstarters += '<div class="peredit">';
	swimstarters += '<form class="biostats-form" id="' + swid + '" ><label>HR</label><input id="hrin' + swid + '" type="number" title="heartrate"  size="4" /><label>SC</label><input id="scin' + swid + '" type="number" title="strokecount"  size="4" /><label>Group</label><input id="lanein' + swid + '" type="number" title="changelane"  size="4" /></form>';
	
	swimstarters +=	'<div class="perdetails" >';
	swimstarters += '<a href="" id="pereditidremove" title="' + swid + '" class="pereditidremove'+ swid + '">Remove</a>';
//swimstarters += '<a href="" id="pereditiddelete" title="' + swid + '" class="pereditiddelete'+ swid + '">Delete</a>';
	
	swimstarters +=	'</div>';

	swimstarters += '</div><div style="clear:both;"></div>';

	swimstarters +=	'<div id="historicalanalysis' + swid + '" class="historicalplace" >';
	swimstarters +=	'</div>';

	swimstarters +=	'<div id="historicalchart' + swid + '" class="historicalchart" >';
	swimstarters +=	'</div>';
	swimstarters +=	'<div id="historicalsummary' + swid + '" class="historicalsummary" >';
	swimstarters +=	'</div>';
	swimstarters +=	'<div id="historicalbio' + swid + '" class="historicalbio" >';				
	swimstarters +=	'</div>';
	swimstarters += '<div style="clear:both;"></div></li> ';
		
	return swimstarters;
};

/**
* Display checkbox of swimmer
* @method checkboxswimmers		
*
*/	
ttHTML.prototype.checkboxswimmers = function(swname, swid) {
				
				var swimliststarters =  '<input type = "checkbox"   id = "'+swid+'"  class="check-style" value = "'+swname+'"  />'+swname + ' <br >';
	
				return swimliststarters;
};			

/**
* Display analysis data
* @method checkboxswimmers		
*
*/			
ttHTML.prototype.viewdataHeader = function(swimmerlist) {
	
	var viewdatahead = '<br />';
	viewdatahead += '<select id="theswimmerview">';
	viewdatahead += '<option value="-">-</option>';
	
	var swimids = Object.keys(swimmerlist);
	swimids.forEach(function(swlist) {
	
		viewdatahead += '<option value="'+ swlist +'">'+ swimmerlist[swlist] +'</option>';
	
	});
	
	viewdatahead += '</select>';

	return viewdatahead;
};

/**
* Display of splilt and diffence color coded
* @method realtimesplitsdiff
*
*/	
	ttHTML.prototype.realtimesplitsdiff = function(thisin, spidint) {
	
				$splive = '#splits'+spidint;
				$analysislive = '#analysis'+spidint;
		
				// what order did this swimmer go off?
				swimpos = thisin.startclock.activeswimmers.indexOf(spidint);
		
				// order position times interval time period
				splitlag = swimpos * (thisin.startclock.swiminterval * 1000);
		
				splittimelive = thisin.t[3] + thisin.t[1] - thisin.t[0] - splitlag;
				
				thisin.spid[thisin.splitidlive][1] = splittimelive;
				
				lastsplitpers = thisin.sparray[thisin.splitidlive].slice(-1)[0];
				if(lastsplitpers === undefined)
				{
					lastsplitpers = splittimelive;
				}
				
				thisin.sparray[thisin.splitidlive].push(thisin.spid[thisin.splitidlive][1]);
				// display splits
				var shortsplitreal = thisin.startclock.format(splittimelive).slice(3,11);
				$($splive).show();
				$('<li><span>' + thisin.startclock.zero(thisin.spid[spidint][2]) + '</span> ' + shortsplitreal + '</li>').appendTo($($splive)).slideDown('fast');
				$($splive).find('li').removeClass('first last');
				$($splive).find('li:first').addClass('first').end().find('li:last').addClass('last');
				// perform analysis & display

				lastsplitper = thisin.sparray[thisin.splitidlive].slice(-1)[0];

				lastdifftocompare = thisin.spdiffarray[thisin.splitidlive].slice(-1)[0];				
				if(lastdifftocompare === undefined)
				{
		
					lastsplitpers = 0;
				}

				thedifflive = splittimelive - lastsplitpers;
		
				thisin.spdiffarray[thisin.splitidlive].push(thedifflive);
				if(thedifflive > lastdifftocompare ) {
						thecolourdiff = 'red'; }
				else {
						thecolourdiff = 'green'; }
						
					shortsplitreal = thisin.startclock.format(thedifflive).slice(3,11);
					$($analysislive).show();
					$('<li><span>' + thisin.startclock.zero(thisin.spid[spidint][2]) + '</span> ' + shortsplitreal + '</li>').appendTo($($analysislive)).css("color", thecolourdiff).slideDown('fast');
					$($analysislive).find('li').removeClass('first last');
					$($analysislive).find('li:first').addClass('first').end().find('li:last').addClass('last');
					//.css("color", thecolourdiff)
						

};

/**
* Display of splilt and diffence color coded FROM STOP BUTTON
* @method realtimestop		
*
*/	
	ttHTML.prototype.realtimestop = function(thisin, stoploc) {
		
			$splitslive = '#splits'+stoploc;
			$stoplive = '#stop'+stoploc;
			$analysislive = '#analysis'+stoploc;
		
		// make the total time elasped in ms local to this swimerid
				// what order did this swimmer go off?
				swimpos = thisin.startclock.activeswimmers.indexOf(stoploc);
	
				lastsplitpers = '';
				lastsplitpers = thisin.sparray[stoploc].slice(-1)[0];
				// order position times interval time period
				stoplag = swimpos * (thisin.startclock.swiminterval * 1000);
		
				stoptimelive = thisin.t[1] - thisin.t[0] - stoplag;
					
				thisin.spid[stoploc][1] = stoptimelive;
				thisin.sparray[stoploc].push(thisin.spid[stoploc][1]);	
							
				(thisin.startclock.$start).text(thisin.startclock.startText);
				
	// make this stop/split id local to this swimmer				
				thisin.spid[thisin.splitidlive][2]++;
		
		// for splits

				if(lastsplitpers === undefined)
				{		
					lastsplitpers = stoptimelive;
				}
				
				var shortsplitreal = thisin.startclock.format(thisin.spid[stoploc][1]).slice(3,11);
				$($splitslive).show();
				$('<li><span>' + thisin.startclock.zero(thisin.spid[stoploc][2]) + '</span> ' + shortsplitreal + '</li>').appendTo($($splitslive)).slideDown('fast');
				$($splitslive).find('li').removeClass('first last');
				$($splitslive).find('li:first').addClass('first').end().find('li:last').addClass('last');
				
				thisin.t[1] = 0;
				thisin.stoppedlist.push(stoploc);
				thisin.startclock.display();
				
				lastsplitper = thisin.sparray[stoploc].slice(-1)[0];
				lastdifftocompare = thisin.spdiffarray[stoploc].slice(-1)[0];
				
				if(lastdifftocompare === undefined)
				{
					lastdifftocompare = stoptimelive;
				}

				thedifflive = stoptimelive - lastsplitpers;
		
				thisin.spdiffarray[stoploc].push(thedifflive);
				if(thedifflive > lastdifftocompare ) {
						thecolourdiff = 'red'; }
				else {
						thecolourdiff = 'green'; }
					if(thisin.spid[stoploc][2] == 1 )
					{
						thedifflive = stoptimelive;
					}
					shortsplitreal = thisin.startclock.format(thedifflive).slice(3,11);
					$($analysislive).show();
					$('<li><span>' + thisin.startclock.zero(thisin.spid[stoploc][2]) + '</span> ' + shortsplitreal + '</li>').appendTo($($analysislive)).css("color", thecolourdiff).slideDown('fast');
					$($analysislive).find('li').removeClass('first last');
					$($analysislive).find('li:first').addClass('first').end().find('li:last').addClass('last');
		
};
	
	
/**
* Display of Analysis post real time
* @method visualiseme		
*
*/	
ttHTML.prototype.visualiseme = function(livepouch, swimidin, historicaldata) {

	var lastdataid = {};
	var perswimmerdata = {};
	perswimmersort = {};
	// give back all data capture locally for now
	perswimmerdata = Object.keys(historicaldata);
	perswimmersort = perswimmerdata.sort(function(a,b){return a-b});
	var repcounter = '';
	repcounter = 0;
	
	perswimmersort.forEach(function(perswimmersp) {
		repcounter ++;
		// setout new divs
		visualnewdiv = '';
		visualnewdiv += '<div class="splitviewcompare" id="lastcomparesession' + perswimmersp + swimidin + '"></div>';
		visualnewdiv += '<div class="splitviewrep" id="lastrep' + perswimmersp + swimidin + '">' + repcounter +'</div>';
		visualnewdiv += '<div class="splitview" id="splittimeshistorical' + perswimmersp + swimidin + '"></div>';

		$("#historicalanalysis" + swimidin).prepend(visualnewdiv);
		
		var visualdata = '';
		visualdata = 'Date:' ;
		visualdata += historicaldata[perswimmersp].swiminfo.swimdate;
		visualdata += ' '; 
		visualdata += historicaldata[perswimmersp].swiminfo.swimstroke;
		visualdata += ' ';
		visualdata += historicaldata[perswimmersp].swiminfo.swimtechnique;
		visualdata += ' ';
		visualdata += historicaldata[perswimmersp].swiminfo.swimstyle;
		visualdata += ' ';			
		visualdata += historicaldata[perswimmersp].swiminfo.swimdistance;
		visualdata += ' ';		
		visualdata += historicaldata[perswimmersp].swiminfo.swimsplit;
		visualdata += '<br />';
	
		thesplitdiff = '';
		lastsplitforcompare = '';
		lasttimefornextcalc = '';
		actualsplitdiff = '';
					
		// itterate over each array split and format
			historicaldata[perswimmersp].splittimes.forEach(function (speratesplit) {

			// do some maths to get difference, if higher colour red, lower colour green
			// if not first number
			thesplitdiff = '';
			thesplitdiff =  speratesplit - lasttimefornextcalc;
	
			actualsplitdiff = speratesplit - lasttimefornextcalc;
			if(thesplitdiff > lastsplitforcompare ) {
			thecolourdiff = 'red'; }
			else {
			thecolourdiff = 'green'; }					
			// last split to keep
			lastsplitforcompare = actualsplitdiff;
			lasttimefornextcalc = speratesplit;
			
			var shortsplit = starttiming.activetimeclock.startclock.format(actualsplitdiff).slice(4,11);
			var shortactualtime = starttiming.activetimeclock.startclock.format(speratesplit).slice(3,11);
			visualdatasph = '<li>' + shortactualtime + ' ' + 'split ' + shortsplit + '</li>';
			$(visualdatasph).css("color", thecolourdiff).prependTo($(" #splittimeshistorical" + perswimmersp + swimidin ));
				
			thecolourdiff = '';
			visualdatasph = '';
			shortsplit = '';
				
			});
			
			$("#splittimeshistorical" + perswimmersp + swimidin).prepend(visualdata);
			var compareshortsplit = '';
				// visualise the stats between different sessions
			if(lastdataid.datasessionid)
			{
				// do some analaysis  
				netsetcompare =  lasttimefornextcalc - lastdataid.splitlasttime;
				if(netsetcompare > 0 ) {
					lasttimegetting = 'slower';
					comparecolor = 'red';					
					compareshortsplit = starttiming.activetimeclock.startclock.format(netsetcompare).slice(3,11);	
					}
				else {
					lasttimegetting = 'faster';
					comparecolor = 'green';
					compareshortsplit = (netsetcompare/1000) + ' seconds';
					}
				
				
			$(" #lastcomparesession" + perswimmersp+ swimidin  ).html(' ' +lasttimegetting + ' by ' + compareshortsplit).css("color", comparecolor);
			
			}	
			else
			{
				
			$(" #lastcomparesession" + perswimmersp+ swimidin ).html('can only compare itself');
			
			}
			
			//set data session id for mulit data comparison
			lastdataid.datasessionid = perswimmersp;
			lastdataid.splitlasttime = lasttimefornextcalc;	

	});  // closes perswimmer data
};

/**
* Display of splits appearing in real time
* @method reatimesplitdisplay		
*
*/	
ttHTML.prototype.reatimesplitdisplay = function(counterin, swimidin, realtimedatain) {

	var repcounter = counterin - 1;
	// setout new divs
	visualnewdiv = '';
	visualnewdiv += '<div class="splitviewcompare" id="lastcomparesession' + realtimedatain.session.sessionid + swimidin + '"></div>';
	visualnewdiv += '<div class="splitviewrep" id="lastrep' + realtimedatain.session.sessionid + swimidin + '">' + repcounter +'</div>';
	visualnewdiv += '<div class="splitview" id="splittimeshistorical' + realtimedatain.session.sessionid + swimidin + '"></div>';
	
	$("#historicalanalysis" + swimidin).prepend(visualnewdiv);
	
	// detail of the set being displayed
	var visualdata = '';
	visualdata = 'Date:' ;
	visualdata += realtimedatain.session.swiminfo.swimdate;
	visualdata += ' '; 
	visualdata += realtimedatain.session.swiminfo.swimstroke;
	visualdata += ' ';
	visualdata += realtimedatain.session.swiminfo.swimtechnique;
	visualdata += ' ';
	visualdata += realtimedatain.session.swiminfo.swimstyle;
	visualdata += ' ';			
	visualdata += realtimedatain.session.swiminfo.swimdistance;
	visualdata += ' ';		
	visualdata += realtimedatain.session.swiminfo.swimsplit;
	visualdata += '<br />';
	
		var thesplitdiff = '';
		var lastsplitforcompare = '';
		var lasttimefornextcalc = '';
		var actualsplitdiff = '';
		var lasttimelive = this.realtimehold.lasttime;
					
		var splitsorder = realtimedatain.session.splittimes.sort(function(a,b){return a-b});	
		
			// save the end time for comparison
			var lengthspiltsdata = splitsorder.length;
			this.realtimehold.lasttime = splitsorder[lengthspiltsdata-1];

		// itterate over each array split and format
			splitsorder.forEach(function (speratesplit) {

				// do some maths to get difference, if higher colour red, lower colour green	
				thesplitdiff = '';
				thesplitdiff =  speratesplit - lasttimefornextcalc;

				actualsplitdiff = speratesplit - lasttimefornextcalc;
				if(thesplitdiff > lastsplitforcompare ) {
				thecolourdiff = 'red'; }
				else {
				thecolourdiff = 'green'; }
					
				// last split to keep
				lastsplitforcompare = actualsplitdiff;
				lasttimefornextcalc = speratesplit;
				
				var shortsplit = starttiming.activetimeclock.startclock.format(actualsplitdiff).slice(4,11);
				var shortactualtime = starttiming.activetimeclock.startclock.format(speratesplit).slice(3,11);
				visualdatasph = '<li>' + shortactualtime + ' ' + 'split ' + shortsplit + '</li>';
				$(visualdatasph).css("color", thecolourdiff).appendTo($(" #splittimeshistorical" + realtimedatain.session.sessionid + swimidin ));
					
				thecolourdiff = '';
				visualdatasph = '';
				shortsplit = '';
				
			});
		$("#splittimeshistorical" + realtimedatain.session.sessionid + swimidin).prepend(visualdata);
			
			var compareshortsplit = '';
				// visualise the stats between different sessions
				// need to collect previous time		
			if(lasttimelive)
			{
				// do some analaysis 
				netsetcompare =  this.realtimehold.lasttime - lasttimelive;
				if(netsetcompare > 0 ) {
					lasttimegetting = 'slower';
					comparecolor = 'red';					
					compareshortsplit = starttiming.activetimeclock.startclock.format(netsetcompare).slice(3,11);	
					}
				else {
					lasttimegetting = 'faster';
					comparecolor = 'green';
					compareshortsplit = (netsetcompare/1000) + ' seconds';
					}

				$(" #lastcomparesession" +  realtimedatain.session.sessionid + swimidin  ).html(' ' +lasttimegetting + ' by ' + compareshortsplit).css("color", comparecolor);
			
			}	
			else
			{
				$(" #lastcomparesession" +  realtimedatain.session.sessionid + swimidin ).html('can only compare itself');
			}
			

};


/**
* Display of chart data
* @method visualisechart		
*
*/	
ttHTML.prototype.visualisechart = function(livepouch, swimidin, historicaldata) {
	
	// need to form x and y axis data array
	var d1 = [];
	var  d22 = [ [0, 3], [4, 8], [8, 5], [9, 44]];

	var lastdataid = {};
	var perswimmerdata = {};
	perswimmersort = {};
	// give back all data capture locally for now
	perswimmerdata = Object.keys(historicaldata);
	perswimmersort = perswimmerdata.sort(function(a,b){return a-b});

	var repcounter = '';
	repcounter = 0;
	
	perswimmersort.forEach(function(perswimmersp) {
		// extract last time from each split object
		lasttimetotal = '';
		lasttimetotal = historicaldata[perswimmersp].splittimes.pop();
		d1[repcounter] = [perswimmersp, (lasttimetotal/1000)];
		repcounter++;
	});
	
				(function basic(container, d1) {
						// Draw Graph
						graph = Flotr.draw(container, [d1], {
								xaxis: {
										//majorTickFreq: 1
									mode: 'time',
									labelsAngle: 45
								},
								grid: {
										//minorVerticalLines: true
								},
								yaxis: {
									min: 0
								},
								title: 'Current Times'
						});
						
				})(document.getElementById(container), d1);
	
};

/**
* Display summary stats
* @method summaryme		
*
*/	
ttHTML.prototype.summaryme = function(livepouch, swimidin, historicaldata) {

	totaltimearray = [];

	var repcounter = '';
	repcounter = 0;
	// get data info array and sort from there
		var perswimmerdata = Object.keys(historicaldata);
		perswimmerdata.forEach(function(perswimmertime) {
			lasttimein = '';
			lasttimein = historicaldata[perswimmertime].splittimes.pop();	
			totaltimearray.push(lasttimein);
			repcounter++;
		});
		
	fasttraining = '';
	slowtraining = '';
	avgtraining = '';
	notimesin = totaltimearray.length;
	sumoftimes = eval(totaltimearray.join('+'));
		
	// find fast time
	fastlist = totaltimearray.sort(function(a,b){return b-a});
	fasttraining = fastlist.pop();
	
	//find slowest time
	slowlist = totaltimearray.sort(function(a,b){return a-b});;
	slowtraining = slowlist.pop();
	
	// work out average
	avgtraining = sumoftimes/notimesin;
	
	summaryhtml = '';
	
	summaryhtml += '<div class="trainingstats">Training';
	summaryhtml += '	<div class="beststat">Best ' + starttiming.activetimeclock.startclock.format(fasttraining).slice(4,11) +'</div>';
	summaryhtml += '	<div class="slowstat">Slowest ' + starttiming.activetimeclock.startclock.format(slowtraining).slice(4,11) +'</div>';
	summaryhtml += '	<div class="avgstat">Average ' + starttiming.activetimeclock.startclock.format(avgtraining).slice(4,11) +'</div>';
	summaryhtml += '	</div>';
	summaryhtml += '	<div class="seasonbeststats">Current Season';
	summaryhtml += '	<div class="beststat">Best</div>';
	summaryhtml += '	<div class="slowstat">Slowest</div>';
	summaryhtml += '	<div class="avgstat">Average</div>';
	summaryhtml += '	</div>';
	summaryhtml += '	<div class="personalbeststats">Personal Bests';
	summaryhtml += '	<div class="beststat">Best</div>';
	summaryhtml += '	<div class="slowstat">Slowest</div>';
	summaryhtml += '	<div class="avgstat">Average</div>';
	summaryhtml += '	</div>';

	$("#historicalsummary" + swimidin).html(summaryhtml);
	
	
};  //closes function	

/**
* Display checkbox of swimmer
* @method checkboxswimmers		
*
*/	
ttHTML.prototype.checkboxswimmers = function(swname, swid) {
				
				var swimliststarters =  '<input type = "checkbox"   id = "'+swid+'"  class="check-style" value = "'+swname+'"  />'+swname + ' <br >';
	
				return swimliststarters;
};			

/**
* Display live communication set
* @method livecommunicationset		
*
*/			
ttHTML.prototype.livecommunicationset = function(commlive) {
	presentcommunication = '';
	commlivehtml = '';
						commlive.forEach(function(rowcomm){

							// format the date
							var formatdatelive = new Date(rowcomm.key);						
							var ssmonth = formatdatelive.getUTCMonth() +1;
							var ssday = formatdatelive.getUTCDate();
							var ssyear = formatdatelive.getUTCFullYear();
							ssdaterecord = ssday + '/' + ssmonth + '/' + ssyear;
								// get the communication data and display programme
								presentcommunication += 1;
								commlivehtml += '<div class="swimcommdate"> <a href="" id="fpdate" data-dcommid="' + rowcomm.key + '" >' + ssdaterecord + '</a> </div>';
								
						});
						
	return commlivehtml;
};

/**
* Display communication authoring
* @method commelementbuild		
*
*/			
ttHTML.prototype.commelementbuild = function(cci) {
	commelemhtml = '';
						
								commelemhtml += '<div class="commlistitem" id="communicationelement' + cci +'" data-commid="' + cci +'"><div id="comel' + cci + '" ><div id="elementcounter">' + cci + '</div><div class="communicationpool"><div id="setauthored' + cci + '"></div></div></div><div class="communicationedit"><div class="sketchpadel"><a href="" id="sketchpad" data-sketchid="' + cci + '"></a></div><div class="saveel"><a href="" id="save"  data-saveid="' + cci + '"></a></div><div class="removeel"><a href="" id="remove" data-removeid ="' + cci + '">remove</a></div></div></div>';
	
	// first get the input data 
					commelemhtml += '<div class="editswimelement" id="editdate' + cci + '"><div id="swimrepetition" ></div> ' + '<div id="swimtype"></div> <div id="swimstroke"></div> <div id="swimdistance"></div> <div id="swimtechnique"></div><a href="" id="edit" data-editid="' + cci + '">edit</a></div>';

	return commelemhtml;
};

