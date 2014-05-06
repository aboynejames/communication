/**
* Train TImer
*
* recrod QS  Train Timer
*
*
* @package    Train Timer make future / build programme part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    0.1.0
*/


/**
* Record QS data
* @class recordQS
*/
var recordQS = function() {
	this.status = 'default';
};

/**
* Take in clicks/input intentions
* @method recordLogic		
*
*/	
recordQS.prototype.recordLogic = function(recordin, detailin) {
	if(detailin ==  "pfdate")
	{
		var attentiontypein = detailin;
		$(".liveswimset").empty();
		$(".recordfeedback").text('');
		elementliverecid = 0;
	
		var commdatein = $( "#datepicker" ).datepicker( "getDate" );
		var redatemaster = Date.parse(commdatein) + 7200000;		
		this.recordHTMLset(redatemaster);
	}
	else if ($(detailin).attr("id") ==  "liveswimelementstart")
	{
		$(".recordcount").remove();
		$('<div class="recordcount" >1</div>').appendTo("#livedate" + $(detailin).data("recordid"));
		// which elemement number is live?
		var settotalelementrec = $(".liveswimelement");
		var settotalelementreclength = $(".liveswimelement").length;
		//find which element is live
		for (var i=0; i<settotalelementreclength; i++)
		{		
			if( $(settotalelementrec[i]).data("recordid") == $(detailin).data("recordid"))
			{
				elementliverecid = i;				
			}
			
		}
		
	}
	else
	{
		if(detailin.attr("id") == "recordme")
		{
			$(".liveswimset").empty();
			var todaymasterrset = $( "#datepicker" ).datepicker( "getDate" );	
			var todaymasterr = new Date(todaymasterrset);

			redatemaster = Date.parse(todaymasterr) + 7200000;
			this.recordHTMLset(redatemaster);
		}
	
		else if(detailin.attr("id") == "fpdate")
		{
			$(".liveswimset").empty();
			$(".recordfeedback").text('');
			elementliverecid = 0;
			var attentiontypein = detailin.attr("id"); 
			var commdatein = $(detailin).data("dcommid");		
			var redatemaster = commdatein;		
			this.recordHTMLset(redatemaster);
		}
		else
		{
			
		}
	}

};
		
/**
* Prepares html code for live set to be recorded
* @method recordHTMLset		
*
*/	
recordQS.prototype.recordHTMLset = function(commdatein) {
	
		function localCommcall(commdatein, callback) {  
		livepouch.mapQueryCommdate(commdatein, callback);
		} 
			
				localCommcall(commdatein, function(rtmap) {  

				presentcommunication = '';

				rtmap.rows.forEach(function(rowcomm){
						
					if(rowcomm.key == commdatein)
					{
						// get the index keys of the object
						var setgroupcomm = Object.keys(rowcomm.value[1]);
						
						setgroupcomm.forEach(function(seteldata) {
					
						// get the communication data and display programme
						presentcommunication += 1;
						if( typeof rowcomm.value[1][seteldata].commrepetition === "undefined")
						{
						}
						else
						{					
								$(".liveswimset").append('<div class="liveswimelement" id="livedate' + seteldata + '" data-recordid="' + seteldata + '"><div class="liveselect" id="" data-recordid="' + seteldata + '"><a href="" id="liveswimelementstart" data-recordid="' + seteldata + '" >##</a></div><div id="swimrepetition" class="recordlive" >' + rowcomm.value[1][seteldata].commrepetition + '</div> ' + '<div id="swimtype">' + rowcomm.value[1][seteldata].commtype + '</div> <div id="swimstroke">' + rowcomm.value[1][seteldata].commstroke + '</div> <div id="swimdistance">' + rowcomm.value[1][seteldata].commdistance + '</div> <div id="swimtechnique">' + rowcomm.value[1][seteldata].commtechnique + '</div></div>' );
							}
								
						});
								
					}

				});
				
					// markup first repetition as first element to record
					$('<div class="recordcount" >1</div>').insertBefore(".liveswimelement:first #swimrepetition");
				
			});
			// empty the commuication on screen.
			$(".communicationelement").empty();

};	

/**
* save data back to cloud
* @method swimdataCloud		
*
*/	
recordQS.prototype.swimdataCloud = function(cloudsave) {

		var cloudready = JSON.stringify(cloudsave);
	
		var formdataurl = cloudurl+ '/swimdatasave/' + liveLogic.idname + '/token/' + liveLogic.tokenid;

            // Make the PUT request.
		$.ajax({
			type: "POST",
			url: formdataurl,
			contentType: "application/json",
			dataType: "text",
			data: cloudready,
						
						success: function( saveback ){
						
							// pass on markup and add data to live data model
							var serverdatain = JSON.parse(saveback);
	
							// does this individual have data?  If not provide links enter data or sportsBOX
							if(serverdatain.save ==  "passed")
							{
								$("#syncbackup").html('finished');	
	
								
							}
							else
							{
								
							}
						},
						error: function( error ){
					// Log any error.
//console.log( "ERROR:", error );
						},
						complete: function(){

						}
			});
			
};