/**
* Train TImer
*
* Start node.js  Train Timer
*
*
* @package    Train Timer make future / build programme part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    0.1.0
*/


/**
* Builder a future programme of training
* @class makeProgramme
*/
var makeProgramme = function() {
	this.status = 'default';
};

/**
* Take in clicks/input intentions
* @method makeLogic		
*
*/	
makeProgramme.prototype.makeLogic = function(madeactionin, targetin) {
//console.log(madeactionin + 'from make class');
 
	
        if (madeactionin == "newelement")
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
				$(".swimsettings").show();					
					
				}
				else if (targetin.attr("id") == "edit")
				{
//console.log($sotgt[0].dataset.editid);					
					// need to capture edit data id
					 //var emi = $("#edit").attr('data-editid');
					var emi = targetin.data("editid");
										// set new current id
					currentliveelementid.push(parseInt(emi) );
					// make this text view into form view
					$("#communicationelement" + emi).show();
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
					// speical case if length of array 1 then only -1
					if(uniqueelementids.length > 1)
					{
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
					else
					{
						previousid =  targetin.data("editid"); //$sotgt[0].dataset.editid;
//console.log($sotgt[0].dataset.editid + 'in else mode');						
					$("#communicationelement" +  targetin.data("editid")).show();
					$("#editdate" +  targetin.data("editid") ).hide();
					}

					
				}
				else if (madeactionin == "save")
				{
					// need to capture remove id number
					 var smi = $("#save").attr('data-saveid');
					$("#save" + smi).remove();
					$('<div class="editel"><a href="" id="edit' + smi + '">edit</a></div>').appendTo("#communicationelement" + smi );
					
				}
				else if (targetin.attr("id") == "remove")
				{
//console.log($sotgt[0].dataset.removeid);						
					// need to capture remove id number
					var rmi = targetin.data("removeid");    // $sotgt[0].dataset.removeid;
					// need to remove from tracking arrays
					newinnumber = parseInt(rmi);
					var indexunique = uniqueelementids.indexOf(newinnumber);
					var indexcurrent = currentliveelementid.indexOf(newinnumber);
					uniqueelementids.splice(indexunique, 1);
					currentliveelementid.splice(indexcurrent, 1); 
			
					$("#communicationelement" + rmi ).remove();
					$("#editdate" + rmi ).remove();
//console.log(uniqueelementids);
//console.log(currentliveelementid);	
				}
				else if (madeactionin == "savecommunication")
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
			
				else if (madeactionin == "sketchpad")
				{
					// show the canvas sketchpad UI
					var smi = 1;
					//$("#sketchpad" + smi).html($("#canvasDiv").html());
						$("#canvasDiv").show();
				}
	
};
	 