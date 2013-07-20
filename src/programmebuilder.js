/**
*  jQuery listen for clicks and interaction	
* 
*/	
$(document).ready(function(){
	
	$("#setsettings").hide();
	$("#canvasDiv").hide();
		// create pouchdb object
		livepouch = new pouchdbSettings();	
// delete local pouchdb database		
	//livepouch.deletePouch();
	liveHTML = new ttHTML();	
	var elementliverecid = 0;
	var uniqueelementids = [];
	var currentliveelementid = [];
	
	/*
	* manage interface between record data and communication set
	*
	*/
	$("#record").click(function(e) {
		e.preventDefault(e);

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
		

	});
	
				
	// datepicker
	$( "#datepicker" ).datepicker({
		changeMonth: true,
		changeYear: true
	});
	
	
	// add element to communication
	$("#communication").click(function(e) {
		e.preventDefault(e);
		var $sotgt = $(e.target);
//console.log(uniqueelementids);
//console.log(currentliveelementid);
        if ($sotgt.is("#newelement"))
				{			
					// communication counter id
					cci = new Date().getTime();
					
					// set new current id
					currentliveelementid.push(cci);
					
					//keep a list of unique ids
					uniqueelementids.push(cci);
//console.log(uniqueelementids);
//					currentliveelementid.push(cci);
//console.log(currentliveelementid);					
//console.log('holding ids live in right order?');					
					// make HTML code for edit and un edit mode
					var livecommelemcode =liveHTML.commelementbuild(cci);
					$(".communicationelement").append(livecommelemcode);
					
					// capture the element settings before hiding

					//only if on second the do
					if(uniqueelementids.length > 1)
					{
						// hide previous edit element and show it in text mode
						// work out current position and go back one
	//console.log(uniqueelementids.length + 'number of element in array');
						var secondlastid ='';
						if(uniqueelementids.length == 1)
						{
						 secondlastid = uniqueelementids[0];
						}
						else
						{
							secondlastid = uniqueelementids[(uniqueelementids.length - 2)];
						}
	//console.log(secondlastid);
	//console.log(uniqueelementids[secondlastid]);
						// need to collect values set  #setauthored1374308817000 div.swimsettings div.swimsettingslabel select#swimtype.rightselect
						var divcapturelast = "#setauthored" + secondlastid + " .swimsettings .swimsettingslabel select";
//console.log(divcapturelast);						
							// get all the set element data
						swimtype = $( divcapturelast + "#swimtype").val();
						swimstroke = $( divcapturelast + "#swimstroke").val();
						swimtechnique = $( divcapturelast + "#swimtechnique").val();
						swimdistance = $( divcapturelast + "#swimdistance").val();
						swimrepetition = $( divcapturelast + "#swimrepetition").val();
//console.log('reps=' + swimrepetition);	
							//now set the text version settings  #editdate1374309051000.editswimelement div#swimrepetition
						var textmodesettings = "#editdate" + secondlastid + ".editswimelement ";					
						$(textmodesettings + "#swimtype").text(swimtype);
						$(textmodesettings + "#swimstroke").text(swimstroke);
						$(textmodesettings + "#swimtechnique").text(swimtechnique);
						$(textmodesettings + "#swimdistance").text(swimdistance);
						$(textmodesettings + "#swimrepetition").text(swimrepetition);			
						
						$("#communicationelement" + secondlastid ).hide();
						
						$("#editdate" + secondlastid ).show();
					}
					
					// hide plain text view
					$("#editdate" + cci).hide();
					// from the set authoring tool abstract
					$("#setauthored" + cci ).html($("#setsettings").html());
					
					
				}
				else if ($sotgt.is("#edit"))
				{
//console.log($sotgt[0].dataset.editid);					
					// need to capture edit data id
					 //var emi = $("#edit").attr('data-editid');
					var emi = $sotgt[0].dataset.editid;
										// set new current id
					currentliveelementid.push(emi);
//console.log(emi);					
					// make this text view into form view
					$("#communicationelement" + emi ).show();
					$("#editdate" + emi ).hide();
						var textmodesettings = "#editdate" + emi + ".editswimelement ";					
						eswimtype = $(textmodesettings + "#swimtype").text();
						eswimstroke = $(textmodesettings + "#swimstroke").text();
						eswimtechnique = $(textmodesettings + "#swimtechnique").text();
						eswimdistance = $(textmodesettings + "#swimdistance").text();
						eswimrepetition = $(textmodesettings + "#swimrepetition").text();		
					
					// and set the form values
						$( divcapturelast + "#swimtype").val(eswimtype);
						$( divcapturelast + "#swimstroke").val(eswimstroke);
						$( divcapturelast + "#swimtechnique").val(eswimtechnique);
						$( divcapturelast + "#swimdistance").val(eswimdistance);
						$( divcapturelast + "#swimrepetition").val(eswimrepetition);
	
					// the previous id coud by any element, need to track
					//previousid = uniqueelementids.length-1;
					previousid = currentliveelementid.length - 2;
//console.log(currentliveelementid);					
//console.log(currentliveelementid.length);					
//console.log(previousid);					
//console.log(currentliveelementid[previousid] + 'current elementlive ie last in array');					
					$("#editdate" + currentliveelementid[previousid] ).show();
					$("#communicationelement" + currentliveelementid[previousid] ).hide();
					// turn element before to text view
						var divcapturelast = "#setauthored" + currentliveelementid[previousid]  + " .swimsettings .swimsettingslabel select";
//console.log(divcapturelast);						
							// get all the set element data
						swimtype = $( divcapturelast + "#swimtype").val();
						swimstroke = $( divcapturelast + "#swimstroke").val();
						swimtechnique = $( divcapturelast + "#swimtechnique").val();
						swimdistance = $( divcapturelast + "#swimdistance").val();
						swimrepetition = $( divcapturelast + "#swimrepetition").val();
//console.log('reps=' + swimrepetition);	
							//now set the text version settings  #editdate1374309051000.editswimelement div#swimrepetition
						var textmodesettings = "#editdate" + currentliveelementid[previousid]  + ".editswimelement ";					
						$(textmodesettings + "#swimtype").text(swimtype);
						$(textmodesettings + "#swimstroke").text(swimstroke);
						$(textmodesettings + "#swimtechnique").text(swimtechnique);
						$(textmodesettings + "#swimdistance").text(swimdistance);
						$(textmodesettings + "#swimrepetition").text(swimrepetition);	
					
				}
				else if ($sotgt.is("#save"))
				{
					// need to capture remove id number
					 var smi = $("#save").attr('data-saveid');
					$("#save" + smi).remove();
					$('<div class="editel"><a href="" id="edit' + smi + '">edit</a></div>').appendTo("#communicationelement" + smi );
					
				}
				else if ($sotgt.is("#remove"))
				{
//console.log($sotgt[0].dataset.removeid);						
					// need to capture remove id number
					var rmi = $sotgt[0].dataset.removeid;
					// need to remove from tracking arrays
					//uniqueelementids;
					//currentliveelementid;
					$("#communicationelement" + rmi ).remove();
					
				}
				else if ($sotgt.is("#savecommunication"))
				{
					// collect the date
					var datein = $( "#datepicker" ).datepicker( "getDate" );					
					// get a list of the unique ids and loop through to extract information
					var smi = $(".communicationelement");
//console.log(smi);
					var smic = $(".communicationelement").children();
//console.log(smic);
					var smiclength = $(".communicationelement").children().length;
//console.log(smiclength);	
					
				// check to see if a date exists if not, promp to add a date
				if(datein == null || smiclength == 0)
				{
					var feedbackcomm = '';
					if(datein == null)
					{
						feedbackcomm = 'Please add a date';;
					}
					if(smiclength == 0)
					{
						feedbackcomm += ' Please add a communication element';
					}
					$(".commfeedback").html(feedbackcomm);
				}
				else
				{
				$(".commfeedback").empty();
				$(".liveswimset").empty();
				/**
				* save one document
				* @method singleSave
				*/
				function savecommunicationset (datein, commgroupdata, smlength) {	
	//console.log(Date.parse(datein));
					var datestringday = Date.parse(datein);
					
						swimgroupcomm = {};
						newjsoncomm = {};
							
						//var chdiv = Object.keys(commgroupdata);
						commgroupdata.forEach(function(dataid) {
//console.log('in the loop' + dataid);	
			//console.log(smic[dataid].dataset);
						//#setauthored1373464381000 #swimsettings select#swimrepetition
						//sample = "#setauthored" + commelidin + " .swimsettings .swimsettingslabel select#swimtype";
				
						var divcapturein = "#setauthored" + dataid + " .swimsettings .swimsettingslabel select";		
							// get all the set element data
						swimtype = $( divcapturein + "#swimtype").val();
						swimstroke = $( divcapturein + "#swimstroke").val();
						swimtechnique = $( divcapturein + "#swimtechnique").val();
						swimdistance = $( divcapturein + "#swimdistance").val();
						swimrepetition = $( divcapturein + "#swimrepetition").val();
		//console.log('reps=' + swimrepetition);			

						// collect into object and save via pouchdb.
						// form swim data
						swimcommstatus = {};
						swimcommstatus['commdate'] = datein;
						swimcommstatus['commtype'] = swimtype;
						swimcommstatus['commstroke'] = swimstroke;
						swimcommstatus['commtechnique'] = swimtechnique;
						swimcommstatus['commdistance'] = swimdistance;
						swimcommstatus['commrepetition'] = swimrepetition;
//console.log(dataid + 'what');
						
						swimgroupcomm[dataid] = swimcommstatus;
					// save to localpouchdb need to prepare buld array json structure
														
						newjsoncomm["commid"] = datein;//commgroupdata[dataid].dataset.commid;
						newjsoncomm["commdate"] = Date.parse(datein);
						newjsoncomm["swimmerid"] = [11111111,222222,333333];
						newjsoncomm["communication"] = swimgroupcomm;	
//console.log(newjsoncomm);					

							
						});
//console.log('before save');				
//console.log(newjsoncomm);					
						livepouch.singleSave(newjsoncomm);

						$("#canvasDiv").hide();
							
						} // closes function	
									
						var dateid = '<div class="swimcommdate"><a href="" id="fpdate" data-dcommid="' + Date.parse(datein) + '" >' + datein + '</a></div>';
						$(dateid).appendTo(".pastfuturecomm");

						// pass the data over for saving
						savecommunicationset(datein, uniqueelementids, smiclength);
						// NEED TO CLEAR UNIQUE AND HISTORY ARRAYS
						uniqueelementids = [];
						currentliveelementid = [];
						
//console.log('before empty call');
						$(".communicationelement").empty();
				}
				}
				else if ($sotgt.is("#fpdate"))
				{
					// playback a communication programme
							// empty the existing live communication
					$(".liveswimset").empty();
					$(".recordfeedback").text('');

					//load data back from pouchdb
					// extract fpdate clicked
//console.log('the clicke fpdate');				
//console.log($sotgt);			
					var commdatein = $sotgt[0].dataset.dcommid;
					
						function localCommcall(commdatein, callback) {  
							livepouch.mapQueryCommdate(commdatein, callback);
						}  
      
						localCommcall(commdatein, function(rtmap) {  

						presentcommunication = '';
//console.log(rtmap);	
						rtmap["rows"].forEach(function(rowcomm){
//console.log('live training set');
//console.log(rowcomm);
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
							
									$(".liveswimset").append('<div class="liveswimelement" id="livedate' + seteldata + '"><div id="swimrepetition" class="recordlive" >' + rowcomm.value[1][seteldata].commrepetition + '</div> ' + '<div id="swimtype">' + rowcomm.value[1][seteldata].commtype + '</div> <div id="swimstroke">' + rowcomm.value[1][seteldata].commstroke + '</div> <div id="swimdistance">' + rowcomm.value[1][seteldata].commdistance + '</div> <div id="swimtechnique">' + rowcomm.value[1][seteldata].commtechnique + ' </div></div>' );
								});
										
							}

						});
						
							// markup first repetition as first element to record
							$('<div class="recordcount" >1</div>').insertBefore(".liveswimelement:first #swimrepetition");
						
					});
					// empty the commuication on screen.
					$(".communicationelement").empty();
					
				}				
				else if ($sotgt.is("#sketchpad"))
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

						var livecommcode =liveHTML.livecommunicationset(rtmap["rows"]);
							
						$(".pastfuturecomm").html(livecommcode);	
							
					});
	
		
	
});