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
	//this.llHTMLcode = new llLogic();
};

/**
* Take in clicks/input intentions
* @method frameworklogic		
*
*/	
llLogic.prototype.frameworklogic = function(intentionin) {
//console.log(intentionin);
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
//console.log(datesetstatus + 'status');	
		if(datesetstatus == "on")
		{
			$(".dateset").show();
			$("#datecontext").data("datestatus", "off");
		}
		else
		{
			$(".dateset").hide();
			$("#datecontext").data("datestatus", "on");
		}
	break;
		
	case "socialcontext": 
	// need to check for status of button
	var socialstatus = $("#socialcontext").data("socialstatus");
//console.log(socialstatus + 'status');	
		if(socialstatus == "on")
		{
			$(".social").show();
			$("#socialcontext").data("socialstatus", "off");
		}
		else
		{
			$(".social").hide();
			$("#socialcontext").data("socialstatus", "on");
		}
	break;
		
	case "toolscontext": 
	// need to check for status of button
	var toolsstatus = $("#toolscontext").data("toolsstatus");
//console.log(toolsstatus + 'status');	
		if(toolsstatus == "on")
		{
			$(".tools").show();
			$("#toolscontext").data("toolsstatus", "off");
		}
		else
		{
			$(".tools").hide();
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

