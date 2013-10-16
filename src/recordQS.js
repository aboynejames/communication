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
//console.log(recordin + 'from recordQS class');
//console.log(detailin);
 

	
	if( detailin.attr("id") == "fpdate")
		{
			// playback a communication programme
					// empty the existing live communication
			$(".liveswimset").empty();
			$(".recordfeedback").text('');
			elementliverecid = 0;
	
			var commdatein = detailin.data("dcommid");
			this.recordHTMLset(commdatein);
		}
		else if(detailin.attr("id") == "recordme")
		{

			$(".liveswimset").empty();
			var todaymasterr = $("#livetime").text();
			$( "#datepicker" ).datepicker( "setDate", todaymasterr);
			recorddatelive = $( "#datepicker" ).datepicker( "getDate" );
			$( "#ui-datepicker-div" ).datepicker( "hide" );
			redatemaster = Date.parse(recorddatelive) + 7200000;
			this.recordHTMLset(redatemaster);
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
//console.log(rowcomm.key + 'the key date');
//console.log(commdatein + 'clicke date');							
					if(rowcomm.key == commdatein)
					{
						// get the index keys of the object
						var setgroupcomm = Object.keys(rowcomm.value[1]);
						
						setgroupcomm.forEach(function(seteldata) {
//console.log('start of interation of setgruop elements');
//console.log(seteldata);									
						// get the communication data and display programme
						presentcommunication += 1;
					
							$(".liveswimset").append('<div class="liveswimelement" id="livedate' + seteldata + '" data-recordid="' + seteldata + '"><div id="swimrepetition" class="recordlive" >' + rowcomm.value[1][seteldata].commrepetition + '</div> ' + '<div id="swimtype">' + rowcomm.value[1][seteldata].commtype + '</div> <div id="swimstroke">' + rowcomm.value[1][seteldata].commstroke + '</div> <div id="swimdistance">' + rowcomm.value[1][seteldata].commdistance + '</div> <div id="swimtechnique">' + rowcomm.value[1][seteldata].commtechnique + '</div></div>' );
						});
								
					}

				});
				
					// markup first repetition as first element to record
					$('<div class="recordcount" >1</div>').insertBefore(".liveswimelement:first #swimrepetition");
				
			});
			// empty the commuication on screen.
			$(".communicationelement").empty();

};				