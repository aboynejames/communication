/**
* LifestyleLinking 
*
* Framework Logic controls
* @class llLogic
*
* @package    LifestyleLinking part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var llLogic = function() {
	this.status = 'default';
	this.nameholder = {};
	this.idname = '';
	this.tokenid = '';

};

/**
* Take in clicks/input intentions
* @method frameworklogic		
*
*/	
llLogic.prototype.frameworklogic = function(intentionin) {
	idclick = $(intentionin).attr("id");
	
	switch(idclick){

	case "me": 
	// make live section
	$("#meflow").show();
	$("#streamflow").hide();
	$("#recordflow").hide();
	$("#makeflow").hide();
	$(".identity").css('background', '#009900');
	$(".stream").css('background', 'white');
	$(".recordme").css('background', 'white');
	$(".make").css('background', 'white');		
	break;
	
	case "stream":
	$("#streamflow").show();
	$("#meflow").hide();
	$("#recordflow").hide();
	$("#makeflow").hide();
	$(".stream").css('background', '#009900');
	$(".identity").css('background', 'white');
	$(".record").css('background', 'white');
	$(".make").css('background', 'white');	
	break;

	case "recordme":	
	$("#recordflow").show();
	$("#meflow").hide();
	$("#streamflow").hide();
	$("#makeflow").hide();
	$(".record").css('background', '#009900');
	$(".stream").css('background', 'white');
	$(".identity").css('background', 'white');
	$(".make").css('background', 'white');	
	break;
		
	case "make": 
	$("#makeflow").show();
	$("#streamflow").hide();
	$("#recordflow").hide();
	$("#meflow").hide();
	$(".make").css('background', '#009900');
	$(".stream").css('background', 'white');
	$(".identity").css('background', 'white');
	$(".record").css('background', 'white');	
	break;

	case "datecontext": 
	// need to check for status of button
	var datesetstatus = $("#datecontext").data("datestatus");
		if(datesetstatus == "on")
		{
			$(".dateset").show();
			$("#datecontext").css('background', 'green');		
			$("#datecontext").data("datestatus", "off");
		}
		else
		{
			$(".dateset").hide();
			$("#datecontext").css('background', 'white');		
			$("#datecontext").data("datestatus", "on");
		}
	break;
		
	case "socialcontext": 
	// need to check for status of button
	var socialstatus = $("#socialcontext").data("socialstatus");
		if(socialstatus == "on")
		{
			$(".social").show();
			$("#socialcontext").css('background', 'green');		
			$("#socialcontext").data("socialstatus", "off");
			
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
			$("#startremove").attr("title", "on");
			$("#viewdata").attr("title", "on");
			$("#viewdata").attr('class', 'control-text');
			$("#startsort").attr('class', 'control-text');
			$("#startremove").attr('class', 'control-text');
		}
		else
		{
			$(".social").hide();
			$("#socialcontext").css('background', 'white');		
			$("#socialcontext").data("socialstatus", "on");
			
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
		
	case "toolscontext": 
	// need to check for status of button
	var toolsstatus = $("#toolscontext").data("toolsstatus");
		if(toolsstatus == "on")
		{
			$(".tools").show();
			$("#toolscontext").css('background', 'green');		
			$("#toolscontext").data("toolsstatus", "off");
		}
		else
		{
			$(".tools").hide();
			$("#toolscontext").css('background', 'white');		
			$("#toolscontext").data("toolsstatus", "on");
		}
	break;
		
	case "skipelement":
		starttiming.activetimeclock.startclock.recordmanagement();
	break;
		
	case "backelement":
		starttiming.activetimeclock.startclock.backrecordmanagement();
	break;
		
	}
		
};

/**
* Set the ids and names of swimmers live
* @method setNameID		
*
*/	
llLogic.prototype.setNameID = function(namein, idin) {
		
	this.nameholder[idin] = namein;
	
};

/**
* Set token user for REST calls
* @method setToken		
*
*/	
llLogic.prototype.setToken = function(setIDname, settokenin) {
	
	this.idname = setIDname;
	this.tokenid = settokenin;
	
	
};
