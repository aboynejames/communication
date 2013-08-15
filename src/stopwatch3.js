/**
* Train TImer
*
* Start node.js  Train Timer
*
*
* @package    Train Timer part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    0.1.0
*/


/**
* Record swimmer controller class
* @class SwimtimeController
*/
 function SwimtimeController () {
//console.log('the swimmer controller');	 
	this.activetimeclock = new PerSwimmer();
	 
// need to set id of the swimmer thats split or stop has been click on the UI
	this.identifyswimmer = function(swimtitle, clickid) {
			
		this.identifer = swimtitle;
		this.clicktype = clickid;
//console.log('clickid= ' + this.clicktype);
//console.log('title = ' + this.identifer);		
		this.activetimeclock.startclock.load();	
			
		//if(clickid != "start" || clickid != "reset" || clickid != "save" ){
		if(clickid == "split" || clickid == "stop" || clickid == "peranalysisid" || clickid =="pereditidremove" ){
		this.activetimeclock.splitswimmerid(this.identifer);
	}
						
			switch(this.clicktype){

			case "start": 
			this.activetimeclock.startclock.startStop();
			break;
			
			case "split":
			this.activetimeclock.split(this.identifer);
			break;

			case "stop":	
			this.activetimeclock.stop(this.identifer);
			break;
				
			case "reset": 
			this.activetimeclock.startclock.reset();
			break;
				
			case "save":	
					setsaveallowed = $.cookie("traintimer");
									$("#confirmsave").show();
									$("#confirmsave").text('Saved');
									$("#confirmsave").fadeOut(1000);
									// prepare the data TODO abstract out to a function
									var sptoday = new Date();
									datesplitnumber = Date.parse(sptoday);//Date.parse(cleandata["swimstatus"]['swimdate']);
									
									swimstyle = $("#swimstyle").val();
									swimstroke = $("#swimstroke").val();
									swimtechnique = $("#swimtechnique").val();
									swimdistance = $("#swimdistance").val();
									swimsplit = $("#swimsplit").val();
									// form swim data
									swimdatastatus = {};
									swimdatastatus['swimdate'] = sptoday;
									swimdatastatus['swimstyle'] = swimstyle;
									swimdatastatus['swimstroke'] = swimstroke;
									swimdatastatus['swimtechnique'] = swimtechnique;
									swimdatastatus['swimdistance'] = swimdistance;
									swimdatastatus['swimsplit'] = swimsplit;

								// route to server side URL
								stxt = {};
								stxt['swimstatus'] = swimdatastatus;
								stxt['splitdata'] = this.activetimeclock.sparray;		
								stxtstring =  JSON.stringify(stxt);											
								// make socket send to get real time display anywhere
								//var socket = io.connect();
								//socket.emit('splitsdatalive', stxtstring);	
									
								// save to localpouchdb need to prepare buld array json structure 
									cleandatakey = {};
									bulksplits = [];
									i = 0;
								cleandatakey= Object.keys(stxt['splitdata']);
								cleandatakey.forEach(function(bulkkey){
									newjsonswim = {};

								if(stxt['splitdata'][bulkkey].length > 0 ) 
								{									

									newjsonswim["swimmerid"] = '';
									newjsonswim["session"] = {};
									activesplitsb  = [];	
									activesplitsb = stxt['splitdata'][bulkkey];
									newjsonswim["swimmerid"] = bulkkey;
									newjsonswim["session"]["sessionid"] = datesplitnumber;	
									newjsonswim["session"]["swiminfo"] = stxt['swimstatus'];	
									newjsonswim["session"]["splittimes"]	= activesplitsb;
									
									//livepouch.singleSave(newjsonswim);
									bulksplits[i] = newjsonswim;
									i++;
									}		
									// collect array and then do bulk save as single saving timing out.

								});

									livepouch.bulkSave(bulksplits);
							
								setsaveallowed = 
								$.post("/save/" + setsaveallowed, stxtstring ,function(result){
								// put a message back to UI to tell of a successful save TODO
								
								});
			break;
				
				case "addswimmer":
								
					addswimmerstatus = $("#addswimmer").attr("title");
//console.log(addswimmerstatus);
					if(addswimmerstatus == 'on') {
										
						lanelist = '<select id="thelaneoptionsnew" class="lanewidthnew" name="lanegroupnew" >';
						lanelist +=	'<option  selected="-" value="-1">-</option>';
						lanelist +=	'<option value="1">1</option>';
						lanelist +=	'<option value="2">2</option>';
						lanelist +=	'<option value="3">3</option>';
						lanelist +=	'<option value="4">4</option>';
						lanelist +=	'<option value="5">5</option>';
						lanelist +=	'<option value="6">6</option>';
						lanelist +=	'<option value="7">7</option>';
						lanelist +=	'<option value="8">8</option>';
						lanelist +=	'<option value="9">9</option>';
						lanelist +=	'<option value="10">10</option>';
						lanelist +=	'</select>';
							
						addswimform = '<form class="addswimmer-form" method="post" action="#" id="newmasteradd" >';
						addswimform += '<ul><li>Enter name and allocate to a lane</li>';
						addswimform += '<li><label for="name">Name:</label><input type="text"  id="newmastid" title="swimmername"  name="newmastid"  /><span class="form_hint">Please enter a name</span></li>';

						addswimform += '<li><label for="lane">Lane:</label>' + lanelist + '<span class="form_hint">Set a lane number</span></li>';
						addswimform += '<li><button class="submit" type="submit"  id="newmasteradd" >Add swimmer</button></li></ul></form>';
						addswimform += '<div id="newswimerror"></div>';						
						$("#newmaster").html(addswimform);
						$("#newmaster").show();						
						$("#addswimmer").attr("title", "off");
					}
					else
					{
						$("#newmaster").hide();
						$("#addswimmer").attr("title", "on");
					}			
				break;
				
				case "loadlane":
				
					setsavedallowed = '';
					loadname = '';
					//setsaveallowed = $.cookie("traintimer");
//console.log('has cookie been set?' + setsaveallowed);
					loadname = $("#loadlane").attr("title");
//console.log('loadlane on off::::' + loadname );
					if(loadname == 'on') {
						$("#loadlane").attr("title", "off");
						$("#thelaneoptions").val(-1);
						$("#theswimmeroptions").val(-1);
						$("#welcomesummary").hide();
						$("#loadlaneselect").show();
						$("#loadswimmers").show();
						$("#addnewswimmer").show();
						$("#loadclearswimmers").show();
						$("#controloptions").show();
						$(".ui-state-default").css("width", "100%");
						$("#loadlane").attr('class', 'control-textpressed');
						
						$("#startsort").attr("title", "on");
						$("#viewdata").attr("title", "on");
						$("#viewdata").attr('class', 'control-text');
						$("#startsort").attr('class', 'control-text');

					}
					else
					{
					// close the load	
						$("#loadlaneselect").hide();
						$("#loadswimmers").hide();
						$("#addnewswimmer").hide();
						$("#loadclearswimmers").hide();
						$("#controloptions").hide();
						$("#addalpha").hide();
						$("#addalpha2").hide();
						$("#loadlane").attr("title", "on");
						$("#loadlane").attr('class', 'control-text');
					}
				break;
				
				case "startsort":
				
					$("#sortable1").sortable( "option", "disabled", false );	
					editname = $("#startsort").attr("title");
//console.log('edit on off::::' + editname );
					if(editname == 'on') {
						// need to make live all the edit 
						$(".peredit").show();
						$(".peranalysis").hide();
						$("#startsort").attr("title", "off");
						$("#viewdata").attr("title", "on");
											
						$("#analysistype").hide();
						$(".historicalplace").hide();
						$(".historicalchart").hide();						
						$(".historicalsummary").hide();
						$(".historicalbio").hide();
						$("#viewdatalive").empty();
						$("#visualisedata").empty();
						$(".splitviewrep").remove();
						$(".splitview").remove();
						$(".splitviewcompare").remove();
							$("[class^='peranalysisid']").attr("data-statusanalysis", "on");
							$("[class^='peranalysisid']").css("color", "#1c94c4");
							$("[class^='pereditidremove']").attr("data-statusanalysis", "on");
							$("[class^='perchartid']").attr("data-statusanalysis", "on");
							$("[class^='perchartid']").css("color", "#1c94c4");
							$("[class^='persummaryid']").attr("data-statusanalysis", "on");
							$("[class^='persummaryid']").css("color", "#1c94c4");
							$("[class^='perbioid']").attr("data-statusanalysis", "on");
							$("[class^='perbioid']").css("color", "#1c94c4");
						$(".ui-state-default").css("width", "50%");
						$("#startsort").attr('class', 'control-textpressed');
						$("#viewdata").attr('class', 'control-text');
					}
					else
					{
						$(".peredit").hide();
							$(".peranalysis").hide();
							$(".analysislabel").hide();
							$(".historicalplace").hide();
							$(".historicalchart").hide();						
							$(".historicalsummary").hide();
							$(".historicalbio").hide();

						
						$("#startsort").attr("title", "on");
							$("[class^='peranalysisid']").attr("data-statusanalysis", "on");
							$("[class^='peranalysisid']").css("color", "#1c94c4");
							$("[class^='pereditidremove']").attr("data-statusanalysis", "on");
							$("[class^='perchartid']").attr("data-statusanalysis", "on");
							$("[class^='perchartid']").css("color", "#1c94c4");
							$("[class^='persummaryid']").attr("data-statusanalysis", "on");
							$("[class^='persummaryid']").css("color", "#1c94c4");
							$("[class^='perbioid']").attr("data-statusanalysis", "on");
							$("[class^='perbioid']").css("color", "#1c94c4");
						$("#sortable1").sortable( "option", "disabled", true );
						$(".ui-state-default").css("width", "100%");						
						$("#startsort").attr('class', 'control-text');
					}
				
				break;
					
				case "viewdata":
			// needs swimmerids and names
				$("#analysistype").show();
				
				analysisname = $("#viewdata").attr("title");
//console.log('analysislane on off::::' + analysisname );
					if(analysisname == 'on') {
						// need to make live all the edit / analysis feature options
						$(".peredit").hide();
						$(".peranalysis").show();
						$(".peranalysis").show();
						$("#perrealtime").show();
						$(".historicalplace").show();
						$("#viewdata").attr("title", "off");
						$("#startsort").attr("title", "on");
						$(".ui-state-default").css("width", "100%");
						$("#viewdata").attr('class', 'control-textpressed');
						$("#startsort").attr('class', 'control-text');
					}
					else
					{
							$(".peredit").hide();
							$(".peranalysis").hide();
							$(".analysislabel").hide();
							$(".historicalplace").hide();
							$(".historicalchart").hide();						
							$(".historicalsummary").hide();
							$(".historicalbio").hide();
							$("#viewdatalive").empty();
							$("#visualisedata").empty();
							$(".splitviewrep").remove();
							$(".splitview").remove();
							$(".splitviewcompare").remove();
						
							$("#viewdata").attr("title", "on");
							$("[class^='peranalysisid']").attr("data-statusanalysis", "on");
							$("[class^='peranalysisid']").css("color", "#1c94c4");
							$("[class^='pereditidremove']").attr("data-statusanalysis", "on");
							$("[class^='perchartid']").attr("data-statusanalysis", "on");
							$("[class^='perchartid']").css("color", "#1c94c4");
							$("[class^='persummaryid']").attr("data-statusanalysis", "on");
							$("[class^='persummaryid']").css("color", "#1c94c4");
							$("[class^='perbioid']").attr("data-statusanalysis", "on");
							$("[class^='perbioid']").css("color", "#1c94c4");
							$("#viewdata").attr('class', 'control-text');
					}

			break;
					
			case "peranalysisid":
				// get the swimmer id and then load up historical data
				historicalanalysisid = this.identifer; //$("#pereditid").attr("title");
//console.log('ananlysis id caught' + historicalanalysisid);		
				analysisstatus = $(".peranalysisid"+ historicalanalysisid).attr("data-statusanalysis");
//console.log('ananlysis status caught' + analysisstatus);		
					
					if(analysisstatus == 'on')
					{
						datacall = livepouch.returndatacallback(idname, "splitdatain");
						$(".peranalysisid" + historicalanalysisid ).attr("data-statusanalysis", "off");
						$(".peranalysisid" + historicalanalysisid ).css("color", "#090");
						
					}
					else
					{
						$("#historicalanalysis" + historicalanalysisid).empty();
						$(".peranalysisid" + historicalanalysisid).attr("data-statusanalysis", "on");
						$(".peranalysisid" + historicalanalysisid ).css("color", "#1C94C4");

					}
					
			break;
					
			case "perchartid":
				// gather data per swimmer to build chart from
				container = 'historicalchart' + this.identifer;
				chartstatus = $(".perchartid"+ this.identifer).attr("data-statusanalysis");
//console.log('ananlysis status caught' + analysisstatus);		
					
					if(chartstatus == 'on')
					{
						
						livepouch.returndatacallback(this.identifer, "chartdatain");
						$("#historicalchart" + this.identifer).show();			
						$(".perchartid" + this.identifer ).attr("data-statusanalysis", "off");
						$(".perchartid" + this.identifer ).css("color", "#090");
					
					}
					else
					{
						$("#historicalchart" + this.identifer).hide();
						$(".perchartid" + this.identifer).attr("data-statusanalysis", "on");
						$(".perchartid" + this.identifer).css("color", "#1C94C4");
					}

			break;

			case "persummaryid":
				// gather data per swimmer to build chart from
				container = 'historicalsummary' + this.identifer;
				chartstatus = $(".persummaryid"+ this.identifer).attr("data-statusanalysis");
//console.log('ananlysis status caught' + analysisstatus);		
					
					if(chartstatus == 'on')
					{
						
						livepouch.returndatacallback(this.identifer, "persummaryid");
						$("#historicalsummary" + this.identifer).show();			
						$(".persummaryid" + this.identifer ).attr("data-statusanalysis", "off");
						$(".persummaryid" + this.identifer ).css("color", "#090");
	
					}
					else
					{
						$("#historicalsummary" + this.identifer).hide();
						$(".persummaryid" + this.identifer).attr("data-statusanalysis", "on");
						$(".persummaryid" + this.identifer).css("color", "#1C94C4");
					}

			break;					

			case "perbioid":
				// gather data per swimmer to build chart from
				container = 'historicalbio' + this.identifer;
				chartstatus = $(".perbioid"+ this.identifer).attr("data-statusanalysis");
//console.log('ananlysis status caught' + analysisstatus);		
					
					if(chartstatus == 'on')
					{
						
						//livepouch.returndatacallback(this.identifer, "chartdatain");
						$("#historicalbio" + this.identifer).show();			
						$(".perbioid" + this.identifer ).attr("data-statusanalysis", "off");
						$(".perbioid" + this.identifer ).css("color", "#090");
						$("#historicalbio" + this.identifer).html('Age Height Weight Genome');
					
					}
					else
					{
						$("#historicalbio" + this.identifer).hide();
						$(".perbioid" + this.identifer).attr("data-statusanalysis", "on");
						$(".perbioid" + this.identifer).css("color", "#1C94C4");
					}

			break;										
					
			case "pereditidremove":
					// remove swimmer from active list
//console.log('remove is being called');
					removeid = this.identifer;
					$("#sortable1 li#" + removeid + ".ui-state-default").remove();
					
			break;
					
			case "setshow":
			// hide or show the set settings
					setshowstatus = $("#setshow").attr("title");
//console.log(setshowstatus);
					if(setshowstatus == 'on') {
						$(".swimsettings").show();
						$("#setshow").attr("title", "off");
						$("#setshow").attr('class', 'control-textpressed');
					}
					else
					{
						$(".swimsettings").hide();
						$("#setshow").attr("title", "on");
						currentsetset = 'int-' + $("#swiminterval").val() + 'sec ' + $("#swimstyle").val() + ' ' + $("#swimstroke").val() + ' ' + $("#swimtechnique").val() + ' ' + $("#swimdistance").val() + ' ' + $("#swimsplit").val();
$("#liveswimset").text('live: ' + currentsetset);
						$("#setshow").attr('class', 'control-text');
					}
						
	
			break;

			case "signupstart":
				// signup to data services
					signupstatus = $("#signupstart").attr("title");
//console.log(signupstatus);
					if(signupstatus == 'on') {
						$("#signupspace").show();
						$("#signupstart").attr("title", "off");
						$("#signupstart").css('color', '#090');
					}
					else
					{
						$("#signupspace").hide();
						$("#signupstart").attr("title", "on");
						$("#signupstart").css('color', '#1C94C4');
					}

			break;
					
			case "contactin":
//console.log("internal click contactin");
				// collect the form data
				incontact = {};
				incontact['name'] = $("#namein").val();
				incontact['email'] = $("#emailin").val();
				incontact['website'] = $("#websitein").val();
				incontact['inpassword'] = $("#inpassword").val();
				incontact['message'] = $("#messagein").val();
//console.log(incontact);
//console.log('post inconact');
				// validate there is name, email message
				if(incontact['name'].length > 0  && incontact['email'].length > 0 && incontact['message'].length > 0)
				{ 
						
				//formdata = {};
					formdata =  JSON.stringify(incontact);

				// make a POST call to node.js url
					$.post("/signupstart/", formdata ,function(resultb){
						// put a message back to UI to tell of a successful save TODO
console.log(resultb);
						
						$("#signupspace").hide();
						$("#namein").val("");
						$("#emailin").val("");
						$("#websitein").val("");
						$("#messagein").val("");
						$("#signupspacereply").text(resultb["startbackupreply"]);
						$("#formfeedback").empty();
						$("#signupstart").remove();
					
					}, "json");
				

				}
				else
				{
					formfeedback = "Please enter ";
					if(incontact['name'].length === 0)
					{
						formfeedback += " a Name ";
					}
					if(incontact['email'].length === 0)
					{
							formfeedback += " Email ";
					}
					if(incontact['message'].length === 0)
					{
						formfeedback += " Swim Club";
					}
						$("#formfeedback").html(formfeedback);
					
				}

			break;
					
			case "touchpadmode":
			// show the touchpad status as on or OFF
					currenttpstatus = $("#touchpadmode").attr("title");
//console.log(setshowstatus);
					if(currenttpstatus == 'on') {
						$("#touchpadstatus").text('On');
						$("#touchpadmode").attr("title", "off");
					}
					else
					{
						$("#touchpadstatus").text('Off');
						$("#touchpadmode").attr("title", "on");
					}
					
			break;			

						
			} // closes switch		
			
 }; // closes id function
			
}  // closes controller class


/**
* Master Stop Watch Class
* @class MasterWatch
*/
var MasterWatch = function() {
//console.log('master class called');
	// one universal start and reset button
	this.$start = $('#start');
	this.$reset = $('#reset');
	this.$timer = $('#timer');
	this.startText = this.$start.text();
	this.stopText = this.$start.attr('alternate');

	/*
	 * I found this code on a few sites and am unsure of the original author.
	 * If you know please inform me so I can credit them here.
	 *
	 * 0 = start time
	 * 1 = end time
	 * 2 = state (stopped or counting)
	 * 3 = total elapsed time in ms
	 * 4 = timer (interval object)
	 * 5 = epoch (January 1, 1970)
	 * 6 = element (not used here, normally stores the DOM element to update with the time)
	 * 7 = split count
	 */
	this.t = [0, 0, 0, 0, 0, 0, 0, 0];

/**
* format a digital number string to time format presentation
* @method format
*/
	this.format = function(ms) {
		var d = new Date(ms + this.t[5]).toString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
		var x = String(ms % 1000);

		while (x.length < 3) {
			x = '0' + x;
		}
		d += '.' + x;
		return d.substr(0, d.length - 1);
	},
	
	this.zero = function(num) {
		if (parseInt(num) < 0) var neg = true;
		if (Math.abs(parseInt(num)) < 10) {
			num = '0' + Math.abs(num);
		}
		if (neg) num = '-' + num;
		return num;
	},
	
	/**
	* reset the master stopwatch to ZERO
	* @method reset
	*/
	this.reset = function() {
		// re enable the drag and drop sorting
$("#sortable1").sortable( "option", "revert", true );//sortable( "option", "disabled", false );	
		
		// this needs updated to clear all splits for multiple active swimmers
		
		if (this.t[2]) {
			this.startStop();
		}
		
		this.t[4] = this.t[3] = this.t[2] = this.t[1] = this.t[0] = 0;
		
		this.display();
		
		this.$start.text(this.startText);
		
		// resets all the split arrays  (NB if NIL will break TODO)
		starttiming.activetimeclock.activesplitter.forEach(function(restswimid)
			{
				starttiming.activetimeclock.spid[restswimid][0] = 1;
				starttiming.activetimeclock.spid[restswimid][1] = 0;
				starttiming.activetimeclock.spid[restswimid][2] = 0;
				starttiming.activetimeclock.sparray[restswimid] = [];
				starttiming.activetimeclock.spdiffarray[restswimid] = [];
				starttiming.activetimeclock.activesplitter[restswimid] = [];
		
				$splivereset = $('#splits'+restswimid);
				$splivereset.empty();
				$splivereset.append("<li></li>");
				$diffreset = $('#analysis'+restswimid);
				$diffreset.empty();
				$diffreset.append("<li></li>");

		});
		// and this needs move to per swimmer basis
		this.t[7] = 0;

		starttiming.activetimeclock.splitswimmerid(0);
		
		return false;
	},
	
	this.display = function() {
		if (this.t[2]) {
//console.log('display function called and if t2');
			this.t[1] = (new Date()).valueOf();
		}
//console.log('display function set timer after formatting time.');		
		this.$timer.text(this.format(this.t[3] + this.t[1] - this.t[0]));
	},
	
	
	this.displaymaster = function() {
		
		this.delaymaster = starttiming.activetimeclock.startclock.t;
		
		if (this.delaymaster[2]) {
//console.log('display function called and if t2');
			this.delaymaster[1] = (new Date()).valueOf();
		}
		
		starttiming.activetimeclock.startclock.$timer.text(starttiming.activetimeclock.startclock.format(this.delaymaster[3] + this.delaymaster[1] - this.delaymaster[0]));
	},
	
	this.load = function() {
		this.t[5] = new Date(1970, 1, 1, 0, 0, 0, 0).valueOf();

		this.display();
	},
	
	/**
	*  Master stopwatch START
	* @method startStop
	*/
	this.startStop = function() {

		this.itp = 0;  // clear touchpad counter

	// set starting time
			this.t[this.t[2]] = (+new Date()).valueOf();
//console.log(this.t);

		this.t[2] = 1 - this.t[2];
//console.log(this.t);
			if (this.t[2] === 0)
			{
	// a split time being set
				clearInterval(this.t[4]);
				this.t[3] += this.t[1] - this.t[0];

				this.$start.text(this.startText);
				this.t[7]++;
				this.display();
			}
			else
			{
				this.$start.text(this.stopText);
				this.t[4] =  setInterval(this.displaymaster, 43);

			}

		// disable drag and drop when start press, then reset when stopped.
		$("#sortable1").sortable( "option", "disabled", true );		

		// need to pickup set element from the liveswimset div area
		//first identify liverecord set element
		this.liverecordelement = $(".recordcount").parent().data('recordid');
console.log(this.liverecordelement);			
		this.swiminterval = '';
		this.swiminterval = $("#swiminterval").val();
		//this.swiminterval = $("#swiminterval").val();
console.log(this.swiminterval  + 'interval  set');			
		this.swimdistance = '';
			//#livedate1374329671919.liveswimelement #swimdistance
			formidentifer = '#livedate' + this.liverecordelement;
console.log($(formidentifer).children("#swimdistance").text());
			this.swimdistance = $(formidentifer).children("#swimdistance").text()
console.log(this.swimdistance + 'distance from live record');			
		//this.swimdistance = $("#swimdistance").val();
		this.swimsplit = '';
		this.swimsplit = $("#swimsplit").val();
console.log(this.swimsplit + 'split distance set');		
		//this.swimsplit = $("#swimsplit").val();
//console.log('dist' + this.swimdistance + 'and split' + this.swimsplit);
		this.stopsplitstatus = (this.swimdistance/this.swimsplit);
		// if the swim distance is 50m and split is 50m  change split button to also say stop
		if(this.stopsplitstatus == 1)
		{
			$("[class^='splitbutton']").text("STOP");
		}
		else
		{
			$("[class^='splitbutton']").text("Split");
		}
		// need to identify active swimmers from UI
		// what order did the swimmers go off 
		this.activeswimmers = [];
		//var noswimmerlive = $("a#stop").length;

		var listactives = [];

		listactives = $('#sortable1').sortable('toArray');
//console.log(listactives);
		countswimmers = listactives.length;
//console.log(countswimmers + 'the count of swiimm');	
		
		this.activeswimmers = listactives;
//console.log('the starting list');
//console.log(this.activeswimmers);		
		// if in touchpad mode
		starttpstatus = $("#touchpadmode").attr("title");
//console.log('in master start fuction status of touchpad' + starttpstatus);
		if(starttpstatus == 'on')
		{
			// setup split time capture arrays
			this.activeswimmers.forEach(function(livetbswimmers) {	
				// need to setup split arrays/objects to hold data
				//starttiming.activetimeclock.splitswimmerid(livetbswimmers);
			});


			// need to build swimmer/order array
			this.totalsplitarray = [];
			notimesperswimmer = this.swimdistance/this.swimsplit;
			totalnosplits = (this.activeswimmers.length * notimesperswimmer) -1;
//console.log(notimesperswimmer + 'the no splits per swimer' );
//console.log(totalnosplits + 'the total no. spliters' );
			si = 0;
			countswi = 0;
			for (si=0;si<=totalnosplits;si++)
			{
//console.log(si + 'the info');
				this.totalsplitarray[si] = this.activeswimmers[countswi];
				countswi++;
				
				if(countswi == (this.activeswimmers.length ))
				{
					countswi = 0;
				}
			}
//console.log(this.totalsplitarray);
//console.log('the order above');
				
				
			}  // closes if touchpad on
			

		return false;
	};
	
		/**
	*  Master record management
	* @method recordmanagement
	*/
	this.recordmanagement = function() {
				// need to keep a counter of element order start if with one
		var norepetitionsobject = $('#swimrepetition.recordlive');	
//console.log(norepetitionsobject);				
		//var norepetitionselements = $('#swimrepetition.recordlive').length;
		
		var totalelementrec = $(".liveswimelement").length -1;
		// add one to recordcounter
		var newcounter = parseInt($(".recordcount").text());
		nextcount = newcounter + 1;
//console.log(nextcount + 'next count');		
		//html body div.liveswimset div#livedate1374053681000.liveswimelement div#swimrepetition.recordlive
		var norepetitionsobject = $('#swimrepetition.recordlive');		
		var norepetitions =norepetitionsobject[elementliverecid].innerHTML;
//console.log(norepetitions + 'repetitions');		
		
		if(nextcount > norepetitions)
		{
//console.log(elementliverecid + 'on which record element');
//console.log(totalelementrec + 'total no of record elements');			
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
				//$().html('<div class="recordcount">1</div>');
				//$("#livedate1374053688000").append('<div class="recordcount" >1</div>');
//console.log(norepetitionsobject[elementliverecid].parentNode.id);				
				$('#' + norepetitionsobject[elementliverecid].parentNode.id).append('<div class="recordcount" >1</div>');

//console.log(elementliverecid + 'the liverecord count');				
			}
		}
		else
		{
			$(".recordcount").text(nextcount);
		}
		
	};

}; // closes master class
	
	
/**
*  Per swimmer timer class 
*  acting as sub class of Master Timer
* @class PerSwimmer
*/
var PerSwimmer = function() {

	this.startclock = new MasterWatch();
//	this.swimmer = swimid;	
	
/*
* need to identify swimmer split or stop that has been clicked on the UI
*/	
	this.splitswimmerid = function(splitid) {
	this.splitidlive = splitid;			

// keep track of the live split swimmers that are active
			if(!this.activesplitter)
			{
			this.activesplitter = [];
			}
// keep track of how many times the stop button has been click
			if(!this.stoppedlist)
			{
			this.stoppedlist = [];
			}
			
			if(!this.activesplitter[this.splitidlive]){
				this.activesplitter.push(this.splitidlive);
			}
			
			
// need to defin array for all local split stop times array
			if(!this.spid)
			{
			this.spid = {};	
			this.sparray = {};	
			this.spdiffarray = {};
			}
			
// if an individual swimmer id array has not been set set it
		if(!this.spid[this.splitidlive]){			
//console.log('should be only first time set of this');			
		this.spid[this.splitidlive] =  [1,0,0];
		this.sparray[this.splitidlive] =  [];
		this.spdiffarray[this.splitidlive] = [];	
		
	/*
	 * setting for each swimmer  array of array [idofswimmer][splits time where:
	 *
	 * 0 = default swimmer time is set to 1 i.e. live
	 * 1 = total time elapse in ms for each stop / split?  need to check for split logic
	 * 2 = the stop/split number local to each swimmer
	*/		
		}	
};	

	/**
	* the last split ie the per stop button 
	* @method stop
	*/
	this.stop = function(stoploc) {
// contorl logic, has the main timer been started? If you proceed if not do nothing.		
	if(this.startclock.t[1] === 0) {
		// nothing start do nothing.
	}
	else
	{
//console.log('what t arrays are set start after resetbutton pressed?');
	// form stop location div
			

			this.t =  this.startclock.t;

			
			this.t[this.t[2]] = (+new Date()).valueOf();

	// need to make this stop logic local to this swimmer
			this.spid[stoploc][0] = 1 - this.spid[this.splitidlive][0];
			
				if (this.spid[stoploc][0] === 0)
				{
					liveHTML.realtimestop(this, stoploc);

				}

		if(this.stoppedlist.length == (this.startclock.activeswimmers.length)){
		// stop the main stopwatch
//console.log('all watches have been stopped');		
			clearInterval(this.t[4]);
		// /reset/clear stoppedlist counter
			this.stoppedlist = [];
			}	

		}
		
	},

	/**
	*  Splits and calculations	
	* @method split
	*/
	this.split = function(spidin) {
//console.log('split clicked');	
//console.log(spidin + 'incoming splitid');
	// contorl logic, has the main timer been started? If yes proceed if not do nothing.		
	if(this.startclock.t[1] === 0) {
		// nothing start do nothing.
	}
	else
	{	
		this.t =  this.startclock.t;	
//console.log(this.t);
		// need array to hold each swimmer id along with their times/splits info.
		this.t[2] = 1;		
		if (this.t[2] !== 0)
		{
			this.spid[spidin][2]++;
//console.log(this);				
			liveHTML.realtimesplitsdiff(this, spidin);
		}


		// if the second last split then change button to say stop for the last
		stopsplitstatuslast = '';
		stopsplitstatuslast = (this.startclock.stopsplitstatus - this.spid[spidin][2]);
//console.log(this.startclock.stopsplitstatus + 'start  and  live ' + this.spid[spidin][2] + 'difference' + stopsplitstatuslast);
		// if the swim distance is 50m and split is 50m  change split button to also say stop
		if(stopsplitstatuslast == 1)
		{
			$(".splitbutton" + spidin).text("STOP");
		}
		else if(stopsplitstatuslast === 0)
		{
			$(".splitbutton" + spidin).text("Finished");
			this.stoppedlist.push(spidin);		
			// save the splits to pouchdb
			var sptoday = new Date();
				datesplitnumber = Date.parse(sptoday);

				swimstyle = $("#swimstyle").val();
				swimstroke = $("#swimstroke").val();
				swimtechnique = $("#swimtechnique").val();
				swimdistance = $("#swimdistance").val();
				swimsplit = $("#swimsplit").val();
				// form swim data
				swimdatastatus = {};
				swimdatastatus['swimdate'] = sptoday;
				swimdatastatus['swimstyle'] = swimstyle;
				swimdatastatus['swimstroke'] = swimstroke;
				swimdatastatus['swimtechnique'] = swimtechnique;
				swimdatastatus['swimdistance'] = swimdistance;
				swimdatastatus['swimsplit'] = swimsplit;

			// make socket send to get real time display anywhere
			//var socket = io.connect();
			//socket.emit('splitsdatalive', stxtstring);	
//console.log(this.sparray[spidin]);				
			// save to localpouchdb need to prepare buld array json structure
				newjsonswim = {};								
				newjsonswim["swimmerid"] = '';
				newjsonswim["session"] = {};
				newjsonswim["swimmerid"] = spidin;
				newjsonswim["session"]["sessionid"] = datesplitnumber;	
				newjsonswim["session"]["swiminfo"] = swimdatastatus;	
				newjsonswim["session"]["splittimes"]	= this.sparray[spidin];

				livepouch.singleSave(newjsonswim);


			// need to stop the master stopwatch if all swimmers have finished
			if(this.stoppedlist.length == (this.startclock.activeswimmers.length)){
		// stop the main stopwatch
				clearInterval(this.t[4]);
		// /reset/clear stoppedlist counter
				this.stoppedlist = [];
				
				// forward on recordlive counter
				this.startclock.recordmanagement();
				
			}
		}		
		else if(stopsplitstatuslast < 0)
		{
				// if the finished button keeps on being press, could be a split button was press twice. TODO
				// give ability to edit input and update pouchdb
				$(".splitbutton" + spidin).text("Edit splits");
				$('<a href="" id="splitedit">Split Edit</a>').appendTo($("#splits"+ spidin)).slideDown('fast');

		}


			return false;

		}

	};

	
}; // closes Per Swimmer