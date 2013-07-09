/**
*  jQuery listen for clicks and interaction	
* 
*/	
$(document).ready(function(){
	
	$("#setsettings").hide();
	$("#canvasDiv").hide();
		// create pouchdb object
		livepouch = new pouchdbSettings();	
	
	// communication counter id
	var newcommid =  new Date();
	var cci = Date.parse(newcommid);
				
	// datepicker
	$( "#datepicker" ).datepicker({
		changeMonth: true,
		changeYear: true
	});
	
	
	// add element to communication
	$("#communication").click(function(e) {
//console.log('time to distroy the cookie please');
		e.preventDefault(e);
console.log('add another train programme element');		
		
					var $sotgt = $(e.target);
//console.log('what tgt look like?');
console.log($sotgt);		
        if ($sotgt.is("#newelement")) {
console.log('more training');
					$(".communicationelement").html('<div class="commlistitem" id="communicationelement' + cci +'" data-commid="' + cci +'"><div id="comel' + cci + '" ><div id="elementcounter">' + cci + '</div><div class="communicationpool"><div id="setauthored' + cci + '"></div></div></div><div class="communicationedit"><div class="sketchpadel"><a href="" id="sketchpad' + cci + '">sketchpad</a></div><div class="saveel"><a href="" id="save"  data-saveid="' + cci + '">save</a></div><div class="removeel"><a href="" id="remove' + cci + '">remove</a></div></div></div>');
					
					// from the set authoring tool abstract
					$("#setauthored" + cci ).html($("#setsettings").html());
					
					$('<div class ="communicationelement" id="communicationelement' + cci + '" ></div>').appendTo("#communication");					

				}
				else if ($sotgt.is("#save"))
				{
					// need to capture remove id number
					var smi = $("#save").attr('data-saveid');
					$("#save" + smi).remove();
					$('<div class="editel"><a href="" id="edit' + smi + '">edit</a></div>').appendTo("#communicationelement" + smi );
					
				}
				else if ($sotgt.is("#remove1"))
				{
					// need to capture remove id number
					var rmi = 1;
					$("#communicationelement" + rmi ).remove();
					
				}
				else if ($sotgt.is("#savecommunication"))
				{
					// collect the date
					var datein = $( "#datepicker" ).datepicker( "getDate" );
					
					// need to capture remove id number
					var smi = $("#").attr('data-saveid');
					
					$("#communicationelement" + smi).remove();
//console.log('date in' + datein)
					// get all the set element data
				swimtype = $("#swimtype").val();
				swimstroke = $("#swimstroke").val();
				swimtechnique = $("#swimtechnique").val();
				swimdistance = $("#swimdistance").val();
				swimrepetition = $("#swimrepetition").val();
console.log('reps=' + swimrepetition);			

						// collect into object and save via pouchdb.
									// form swim data
			swimcommstatus = {};
				swimcommstatus['commdate'] = datein;
				swimcommstatus['commtype'] = swimtype;
				swimcommstatus['commstroke'] = swimstroke;
				swimcommstatus['commtechnique'] = swimtechnique;
				swimcommstatus['commdistance'] = swimdistance;
				swimcommstatus['commrepetition'] = swimrepetition;

			// save to localpouchdb need to prepare buld array json structure
				newjsoncomm = {};								
				newjsoncomm["commid"] = '';
				newjsoncomm["commdate"] = {};
				newjsoncomm["swimmerid"] = 12345678;
				newjsoncomm["communication"] = swimcommstatus;	

				livepouch.singleSave(newjsoncomm);
			
					
					
					// need to capture remove id number
					var dateid = '<div class="swimcommdate"><a href="" id="fpdate" >' + datein + '</a></div>';
					$(dateid).appendTo(".pastfuturecomm");

					$("#canvasDiv").hide();
				}
				else if ($sotgt.is("#fpdate"))
				{
					// playback a communication programme
					//load data back from pouchdb
						function localCommcall(commdate, callback) {  
							livepouch.mapQueryCommdate(commdate, callback);
						}  
      
						localCommcall('133', function(rtmap) {  

						presentcommunication = '';
	
						rtmap["rows"].forEach(function(rowcomm){


								// get the communication data and display programme
								presentcommunication += 1;
								$(".liveswimset").text(rowcomm.key.commtype);
								
						});
					});
					
				}				
				else if ($sotgt.is("#sketchpad1"))
				{
					// show the canvas sketchpad UI
					var smi = 1;
					//$("#sketchpad" + smi).html($("#canvasDiv").html());
						$("#canvasDiv").show();
				}
					
				
			});

// check and see if there is any existing communication dates
		function localCommcall(commdate, callback) {  
							livepouch.mapQueryCommdate(commdate, callback);
						}  
      
						localCommcall('133', function(rtmap) {  

						presentcommunication = '';
	
						rtmap["rows"].forEach(function(rowcomm){


								// get the communication data and display programme
								presentcommunication += 1;
								$(".pastfuturecomm").html('<div id="swimcommdate"> <a href="" id="fpdate" >' + rowcomm.key.commdate + '</a></div>');
								
						});
					});
	
		
	
});