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
	livellHTML = new llHTML();
	liveLogic = new llLogic();
	liveMake = new makeProgramme();
	liveRecord = new recordQS();
	liveHTML = new ttHTML();	
	elementliverecid = 0;
	uniqueelementids = [];
	currentliveelementid = [];
	//fire up the classes
	starttiming = new SwimtimeController();
	var today = new Date();
	var month = today.getUTCMonth() + 1;
	var day = today.getUTCDate();
	var year = today.getUTCFullYear();
	// display date live day month year
	$("#livetime").html(month + '/' + day + '/' + year);
	
	// connect to socket.io
  var socketpi = io.connect('http://192.168.1.44:8842');		
//console.log(socketpi);
		socketpi.emit('swimmerclient', { swimmerdevice: 'localhitchup' });
		
		// datepicker
	$( "#datepicker" ).datepicker({
		changeMonth: true,
		changeYear: true
	});
	
		$("a,#communication,#recordcommunication,#attention").click(function(e) {
		e.preventDefault(e);
//console.log(this);	
//console.log(e.target);
		var $sotgt = $(e.target);			
		liveLogic.frameworklogic(this);	

			var resultord = $('#sortable1').sortable('toArray');
			idclick = $(this).attr("id");
			idtitle = $(this).attr("title");	
//console.log('a link capture' + idclick + idtitle);		
			// pass on the id of the swimmer  2 pass on the type of click,  start, reset, split, stop	
			starttiming.identifyswimmer(idtitle, idclick);
			
			// make programme logic
			liveMake.makeLogic(idclick, $sotgt);

			// record DS data
			liveRecord.recordLogic(idclick, $sotgt);			
		});			

// check and see if there is any existing communication dates
		function localCommcall(commdate, callback) {  
							livepouch.mapQueryCommdate(commdate, callback);
						}  
      
		localCommcall('133', function(rtmap) {  

		var livecommcode =liveHTML.livecommunicationset(rtmap.rows);
			
		$(".pastfuturecomm").html(livecommcode);	
			
	});

/**
stopwatch jquery code from stopwatch3.js
*
*
*/
//console.log('start new timer object');	

	$(window).unload( function () { 
	
			passwordin = '';
			$("#loadlaneselect").hide();
			$("#loadswimmers").hide();
			$("#addnewswimmer").hide();
			$("#syncdata").hide();
			$("#clearpouchdb").hide();
			$("#sortable1").empty();
			$("#signinopener").show();
	
				// need to tell the server of the log out too
			$.get("/signout/" + $.cookie("traintimer"), function(resultout){
						});
			$.cookie("traintimer", null);
      //alert("You haved signed out of TrainTimer");

		});
	
	/*
	*  Hide in place html
	*/
	$("#loadlaneselect").hide();
	$("#loadswimmers").hide();
	$("#addnewswimmer").hide();
	$("#loadclearswimmers").hide();
	$(".swimsettings").hide();
	$("#syncdata").hide();
	$("#clearpouchdb").hide();
	$("#analysistype").hide();
	$(".peredit").hide();
	$(".historicalplace").hide();
	$("#signupspace").hide();		
	$("#welcomesummary").show();		


//console.log(socketpi.emit);

	// welcome summary  call pouch get no. active swimmers
					function welcomeDatacall(callback) {  
						livepouch.mapQueryswimmers(callback);
					}  
      
						welcomeDatacall(function(wmap) { 
//console.log('welcome callback');							
//console.log(wmap.rows.length);
								if(wmap.rows.length > 0)
								{
									welcomedata = wmap.rows.length + " active swimmers";
									$("#welcomesummary").html(welcomedata);
								}
								else
								{
									welcomedata = 'No swimmmers present.<br /><br />Please press <b>Swimmers</b> button';
									$("#welcomesummary").html(welcomedata);
									
								}
					});

	$("#siginformarea").hide();
		
    $("#signinopener").click(function(e) {
//console.log('time to distroy the cookie please');
        usernamein = '';
        passwordin = '';
        cookieidhash = '';
        passwordhash= '';
    // sigin modal
    loginhtml = '';
    loginhtml += '<div>Welcome, to Train Timer </div>';
    loginhtml += '<form method="post" action="#" id="siginform" >';
    loginhtml += '<div><label for="name">Username</label><input id="name" class="text ui-widget-content ui-corner-all" type="text" title="name" size="16" ></div>';
    loginhtml += '<div><label for="password">Password</label><input id="password" class="text ui-widget-content ui-corner-all" type="password" value="" name="password" size="16" ></div></form>';
    loginhtml += '<div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"> <div class="ui-dialog-buttonset"><button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" role="button" aria-disabled="false"><span class="ui-button-text">Sign me in</span></button></div></div><div id="responsemessage"></div>';

    $("#siginformarea").dialog({
            autoOpen: false,
            height: 340,
            width: 260, 
            title: 'Signin to Train Timer',
            buttons: {
                                        "Sign me in": function() {
                                            // need to make couchdb call to accept user details
                                        usernamein = $("#name").val();
                                        passwordin = $("#password").val();                                            

                                            hashCode = function(str){
                                                var hash = 0;
                                                if (str.length === 0) return hash;
                                                for (i = 0; i < str.length; i++) {
                                                        char = str.charCodeAt(i);
                                                        hash = ((hash<<5)-hash)+char;
                                                        hash = hash & hash; // Convert to 32bit integer
                                                }
                                                return hash;
                                        };
                                        passwordhash = hashCode(passwordin);
                                        cookieidhash = hashCode((usernamein + passwordin));                                    
                                            
                                        this.acceptdetails = '';
        
                                                                                                // Wrap up the PUT request execution.
        var makePUTRequest = function(){

            // Make the PUT request.
            $.ajax({
                type: "GET",
                url: "http://www.mepath.co.uk:8833/signinmepath/" + usernamein + '/' + cookieidhash + '/' + passwordin,
                contentType: "application/json",
                dataType: "text",
success: function( resultback ){

					this.acceptdetails = JSON.parse(resultback);
					
					if(this.acceptdetails.signin == 'passed') {		
												//passedsigntest("one");
												$.cookie("traintimer", cookieidhash,  { expires: 7 });
												$("#ifsignedin").show();	
												$("#ifsignedin").html('<a class="control-text" text="SignOut" title="signout" href="#"  id="signincloser" >Sign-out</a> ' + usernamein );
												$("#siginformarea").dialog( "close" );
												$("#signinopener").hide();
												$("#sortable1").empty();
												$("#signupstart").hide();
												$("#syncdata").show();
												$("#clearpouchdb").show();
										
																				
												}
												else {
//console.log('failed');
													$("#responsemessage").html('Signin Failed, try again');
												}

				},
				error: function( error ){
					// Log any error.
					console.log( "ERROR:", error );
				},
				complete: function(){

					// When this completes, execute teh
					// DELETE request.
					//makeDELETERequest();

				}
			});

		};



		// Execute the PUT request.
		makePUTRequest();

										},
										Cancel: function() {
										$( this ).dialog( "close" );
										}

			},
			close: function() {
			$("#name").val( "" );
			$("#password").val( "" );
			cookieidhash = '';
			passwordhash= '';
				
			}

		});
	$("#siginformarea").show();
	$("#siginformarea").dialog('open');

		// prevent the default action, e.g., following a link
		return false;

	});
	
		/*
	* Clear pouchDB
	*
	*/
	$("#clearpouchdb").click(function(e) {
		
		livepouch.deletePouch();
		
	});
	
	/*
	* Sync data back to couchdb online
	*
	*/
	$("#syncdata").click(function(e) {
		
		designdoc = 0;
		// need to set a design document (but only needed once)
		if(designdoc != 1 ) {
			
			designdocjson = {"_id": "_design/swimmers",  "filters" : {"justname" : "function(traintimer) {if(traintimer.name == '_design/swimmers' ) { emit (traintimer.changes, traintimer.changes)} }" }};
	livepouch.putDoc(designdocjson);
		}
		// get all current doc from pouchdb and pass them on to nodejs to couchdb and delete local data (ideally leave 1 month or user directed future todo )
//console.log('list to sync');	
		//
		localsplitstodelete = [];
		
		function localDatalog(callback) {  
			livepouch.filterchangeLog(callback);
			//livepouch.mapQueryname(selectedlanenow, callback);
			
		}  

		localDatalog( function(trainlog) {

				trainlog.results.forEach(function(rowsswimsplit){
		
					if (rowsswimsplit.doc.session && (rowsswimsplit.deleted != 1))
					{
						// form JSON to sync back to couch
						buildsyncsplits = {};
						buildsyncsplits.session = rowsswimsplit.doc.session;
						buildsyncsplits.swimmerid =rowsswimsplit.doc.swimmerid;
						syncdataforsave =  JSON.stringify(buildsyncsplits);
						$.post("http://www.mepath.co.uk:8833/sync/", syncdataforsave ,function(result){
					// put a message back to UI to tell of a successful sync
						livepouch.deleteDoc(rowsswimsplit.doc._id);	
			
						});
					}
				});
			
	
		/*
		// same for swimmer names expect do not del but mark last seq no. 
		trainlog['results'].forEach(function(rowsswimname){
					
					if (rowsswimname.doc['name'] )
					{
console.log('new names back to couch');						
console.log(rowsswimname);
						// form JSON to sync back to couch
						buildsyncswimmer = {};
						buildsyncswimmer['lanetrain'] = rowsswimname.doc['lanetrain'];
						buildsyncswimmer['name'] = rowsswimname.doc['name'];
						buildsyncswimmer['swimmerid'] = rowsswimname.doc['swimmerid'];
							syncdataforsave =  JSON.stringify(buildsyncswimmer);
				$.post("/sync/", syncdataforsave ,function(result){
					// put a message back to UI to tell of a successful sync
console.log('callback from sync to couchdb via node is complete');	
			
				});
					}
				});
		*/
		});
});

	$("#ifsignedin").click(function(e) {
//console.log('time to distroy the cookie please');
			e.preventDefault(e);
			var $sotgt = $(e.target);
//console.log('what tgt look like?');			
        if ($sotgt.is("#signincloser")) {
					
					//starttiming = '';
					//starttiming.activetimeclock = '';

					$("#ifsignedin").fadeOut("slow");
						//$("#ifsignedin").hide();	
					$("#loadlaneselect").hide();
					$("#syncdata").hide();
					$("#clearpouchdb").hide();
					$("#sortable1").empty();
					$("#signinopener").show();
					$("#signupstart").show();
	
					// need to tell the server of the log out too
						$.get("/signout/" + $.cookie("traintimer"), function(resultout){
							
						});
					$.cookie("traintimer", null);

				}
					
	});
		
/*
* add swimmer form produced after default layout therefore need to delegate to existing DOM element	
*/	
	$("#newmaster").click(function (e) {
				
					e.preventDefault(e);
					// has the user signed in?
					setsaveallowed = '';
					setsaveallowed = $.cookie("traintimer");
//console.log('has cookie been set?' + setsaveallowed);		
				
				var $tgt = $(e.target);
//console.log('what tgt look like?');
//console.log($tgt.attr("name"));				
        if ($tgt.is("#newmasteradd")) {
					
					// need to be both a name and a lane number validation
					newmastnameis = $("#newmasteradd input#newmastid ").val();
					newlane = $("#thelaneoptionsnew").val();
//console.log('what are we validatig on' + newmastnameis + 'lane' + newlane );					
					if(newmastnameis.length > 0 && (newlane.length > 0 && newlane != -1) )
					{
//console.log('form validation passed');
					//newmastidis = $("#newmasteradd input#newmidid ").val();
												hashCode = function(str){
												var hash = 0;
												if (str.length === 0) return hash;
												for (i = 0; i < str.length; i++) {
														char = str.charCodeAt(i);
														hash = ((hash<<5)-hash)+char;
														hash = hash & hash; // Convert to 32bit integer
												}
//console.log(hash + 'new hasnumber');
												return hash;
												};
												var newidnumberstart = new Date();
												newswimmerguid = Date.parse(newidnumberstart);
//console.log('date string' + newswimmerguid)	;									
						newmastidish = hashCode(newmastnameis);
						newmastidisrand = Math.floor((Math.random()*10000000)+1);
//console.log(newmastidisrand + 'randon number');												
						newmastidis = newmastidisrand + '-' + newmastidish;												
//console.log('new GUID' + newmastidis);				
					
// need to save new master to couch, name and masters id,  validate unique ID number
					firstsavenewmaster = {};
					firstsavenewmaster.name = newmastnameis;
					firstsavenewmaster.swimmerid = newmastidis;
					firstsavenewmaster.lanetrain	= newlane;
					jsonfirstsavenewmaster =  JSON.stringify(firstsavenewmaster);

						//  make save to poudbfirst
						livepouch.singleSave(firstsavenewmaster);
						
						//$.post("/save/" + setsaveallowed, jsonfirstsavenewmaster ,function(result){
							// put a message back to UI to tell of a successful save TODO
						//	});					
				
				$("#newmaster").hide();
// add html code for new swimmer added
					newswimcode = '';		
					newswimcode = liveHTML.fromswimmers(newmastnameis, newmastidis);			
							
				$("#sortable1").append(newswimcode);
				$("#saveconfirmswimmer").text('new master added');
				$("#saveconfirmswimmer").show();
				$("#saveconfirmswimmer").fadeOut("slow");
				$("#addswimmer").attr("title", "on");
				$(".peredit").hide();
				$(".peranalysis").hide();		
				
				$("#controloptions").hide();
				$(".peredit").hide();
				$(".historicalchart").hide();
				$(".historicalsummary").hide();
				$(".historicalbio").hide();
				$("#viewdata").attr("title", "on");
				$("#startsort").attr("title", "on");
				$("#loadlane").attr("title", "on");
				$("#loadlane").attr("class", "control-text");

				}
				else
				{
					// need to prompt to add name or select lane number
					adderrormessage = 'Please ';
					if(newmastnameis.length === 0 )
					{ 
						adderrormessage += 'add a name ';
					}
					if(newlane == -1 )
					{
							adderrormessage += 'select a lane ';
					}
					$("#newswimerror").html(adderrormessage);
				}
			}
			
	});
		
/*
*  load swimmer by lane number
*/
$("select#thelaneoptions").change(function () {
	//livepouch.deletePouch();
				$("#viewdatalive").empty();
				$("#visualisedata").empty();
				$("#splittimeshistorical").empty();
				$("#loadlane").attr("title", "on");
				selectedlanenow = $("select#thelaneoptions").val();
	
			//$("#changeplace").text(selectedlanenow);
	
//console.log('yes lane' + selectedlanenow );
				//first check local
					function localDatacall(selectedlanenow, callback) {  
						livepouch.mapQueryname(selectedlanenow, callback);
					}  
      
			localDatacall(selectedlanenow, function(rtmap) {  

						presentswimmer = '';
	
					rtmap.rows.forEach(function(rowswimrs){

							if(rowswimrs.key == selectedlanenow )
							{
								//pass the lane data to get html ready
								presentswimmer += liveHTML.fromswimmers(rowswimrs.value[1], rowswimrs.value[0]);
							
								}
						});

				$("#sortable1").html(presentswimmer);	
				$(".peredit").hide();
				$(".peranalysis").hide();
				$(".historicalplace").hide();
				$(".historicalchart").hide();
				$(".historicalsummary").hide();
				$(".historicalbio").hide();						
				$("#analysistype").hide();
				$("#viewdata").attr("title", "on");
				$("#loadlane").attr('class', 'control-text');
						
				// test splits data recall						
				function localDataSPcall(dataspin, callback) {  
						livepouch.mapQuerySplits(dataspin, callback);

					}  
      
					localDataSPcall('1', function(spmap) {  
//console.log('how splits data look after save');
//console.log(spmap);						
					});						
						
			});  
							
				// make post request to get swimmer for this lane and dispaly
				//$("#sortable1").load("/buildswimmers/lane/" + selectedlanenow + '/' + setsaveallowed);
				//$("#loadlaneselect").hide();
				//$("#loadswimmers").hide();
				//$("#loadclearswimmers").hide();
				$("#controloptions").hide();

			})
			.change();	

/*
	$("select#thelaneoptions").change(function () {
	//livepouch.deletePouch();
	
		valuesel = $("select#thelaneoptions").val();
console.log(valuesel);		
		
		$("#changeplace").text(valuesel);
		$("#sortable1").text(valuesel);
		})
.change();
*/		
/*
* first time start
*/
	$("#welcomesummary").on("click", function (e) {
  //  $("a").click(function(e){
		e.preventDefault(e);
		var $swtgt = $(e.target);
		if ($swtgt.is("a")) {
			idclick = $swtgt.attr("id");
			idname =$swtgt.attr("title");
//console.log('first time start' + idclick + idname);			 
// pass on the id of the swimmer  2 pass on the type of click,  start, reset, split, stop	
			starttiming.identifyswimmer(idname, idclick);
		}
	});

			
/*
*
* List swimmer alphabetically
*/
	$("#theswimmeroptions").change(function () {

				$("#viewdatalive").empty();
				$("#visualisedata").empty();
				$("#splittimeshistorical").empty();
		
				$("#loadlane").attr("title", "on");
				selectedswimmernow = $("#theswimmeroptions").val();
//console.log('letter in ' + selectedswimmernow );
				//first check local
					function localDatacall(selectedswimmernow, callback) {  
						livepouch.mapQueryname(selectedswimmernow, callback);
					}  
      
					localDatacall(selectedswimmernow, function(rtmap) {  

						presentswimmer = '';
						presentswimmer = '<form id="alphaswimmeradd" class="menu-text" action="#" method="post">';
//console.log(rtmap);								
					rtmap.rows.forEach(function(rowswimrs){
						getfirstletter = rowswimrs.value[1].charAt(0);
						makelettersmall = getfirstletter.toLowerCase();
						
							if(makelettersmall == selectedswimmernow )
							{
								// prepare list box  select and append HTML
								presentswimmer += liveHTML.checkboxswimmers(rowswimrs.value[1], rowswimrs.value[0]);
								//pass the lane data to get html ready
								//presentswimmer += liveHTML.fromswimmers(rowswimrs['value'][1], rowswimrs['value'][0]);
							
								}
								
					});
				presentswimmer += '</form>';
					//presentswimmer += '<a href="" id="aaselectswimmer" >add alpha</a>';
//console.log('list checkboxes');
//console.log(presentswimmer);					
				$("#addalpha").html(presentswimmer);					
				
					presentclose = '<br /><br /><a href="" id="closealphalist" class="control-text" >Close</a>';
					$("#addalphatwo").html(presentclose);

    });  
							
				// make post request to get swimmer for this lane and dispaly
				//$("#sortable1").load("/buildswimmers/lane/" + selectedlanenow + '/' + setsaveallowed);
				$("#loadlaneselect").hide();
				$("#loadswimmers").hide();
				$("#loadclearswimmers").hide();
				$("#addnewswimmer").hide();
				$("#loadlane").attr('class', 'control-text');



			}).change();	

/*
*
* Add swimmer to active live list
*/
	$("#addalpha").change(function (e) {
			var $tgt = $(e.target);
		// which name checked?
		swimnamealpha = $tgt.attr("value");
		swimidalpha = $tgt.attr("id");
		// prepare list box  select and append HTML
		presentswimmeralpha = liveHTML.fromswimmers(swimnamealpha, swimidalpha);

		$("#sortable1").append(presentswimmeralpha);
	
		$(".peredit").hide();
		$(".peranalysis").hide();
		$(".historicalchart").hide();
		$(".historicalsummary").hide();
		$(".historicalbio").hide();
		$("#viewdata").attr("title", "on");
		$("#startsort").attr("title", "on");
		
	}).change();	
			
/*
* Close alphalist
*/
	$("#addalphatwo").click(function (e) {
		e.preventDefault(e);
		$("#addalpha").empty();
		$("#addalphatwo").empty();
		
	});

/*
* Clear all swimmer from sort div
*/
	$("#clearallswimmers").click(function (e) {
		e.preventDefault(e);
//console.log('clearswimmer click call');		

			$("#sortable1").empty();
			$("#loadlaneselect").hide();
			$("#loadswimmers").hide();
			$("#addnewswimmer").hide();
			$("#loadclearswimmers").hide();
			$("#loadlane").attr("title", "on");
			$("#loadlane").attr('class', 'control-text');

	});	
	
/*
* delgation of add alpha swimmer
*/
	$("#aselectswimmer").click(function (e) {
		e.preventDefault(e);
//console.log('alpha add start');			
			var $tgt = $(e.target);
//console.log('what tgt look like?');
//console.log($tgt.attr("name"));				
			if ($tgt.is("#aselectswimmer")) {
				aselectswimmerlist = $(".demo input#aselectswimmer ").val();			
//console.log('alpha add swimmers');
//console.log(aselectswimmerlist);
				}
	});					

// drag and drop
		$("ul.droptrue").sortable({
			connectWith: 'ul',
			opacity: 0.6,
			update : updatePostOrder
		});

		
//		$("#sortable1, #sortable2").disableSelection();
		$("#sortable1, #sortable2").css('minHeight',$("#sortable1").height()+"px");
	
			function updatePostOrder() { 
			var arrorder = [];
				$("#sortable1 .ui-state-default").each(function(){
				arrorder.push($(this).attr('id'));
				});
				$('#postOrder').val(arrorder.join(','));
			}
			
	// need to identify which swimmers css markup has been clicked
	$("#contactin").click(function(e){
			e.preventDefault(e);

			idclick = $(this).attr("id");
			idtitle = $(this).attr("title");	
//console.log('a link capture' + idclick + idtitle);		
			// pass on the id of the swimmer  2 pass on the type of click,  start, reset, split, stop	
			starttiming.identifyswimmer(idtitle, idclick);
		
	});	
	
	
	
	$("#sortable1").on("click", function (e) {
  //  $("a").click(function(e){
		e.preventDefault(e);
		var $swtgt = $(e.target);
		if ($swtgt.is("a")) {
			idclick = $swtgt.attr("id");
			idname =$swtgt.attr("title");	
// pass on the id of the swimmer  2 pass on the type of click,  start, reset, split, stop	
			starttiming.identifyswimmer(idname, idclick);
		}
	});
	
/*
* Touchpad listening socket
*/
 // when you get a serialdata event, do this:
socketpi.on('serialEvent', function (data) {
console.log('serial event');
console.log(data);
serialin = JSON.parse(data);
console.log(serialin);

        inser = Object.keys(serialin);
        inser.forEach(function(thein) {
        textaction = thein;
        timein = serialin[thein];
console.log(thein);
console.log(serialin[thein]);
        });


// whatever the 'value' property of the received data is:
        if(data.value == 1)
        {
//console.log(starttiming.activetimeclock.startclock.itp);
//console.log('touchpad ingredients');
//console.log(starttiming.activetimeclock.startclock.totalsplitarray);

                //buttonidserial = '8959315--1256701539';  // test data
                // call the split function
                starttiming.activetimeclock.splitswimmerid(starttiming.activetimeclock.startclock.totalsplitarray[starttiming.activetimeclock.startclock.itp]);
                starttiming.activetimeclock.split(starttiming.activetimeclock.startclock.totalsplitarray[starttiming.activetimeclock.startclock.itp]);
                starttiming.activetimeclock.startclock.itp++;

        }
        else if(textaction == 'lap')
        {
                starttiming.activetimeclock.splitswimmerid(starttiming.activetimeclock.startclock.totalsplitarray[starttiming.activetimeclock.startclock.itp]);
                starttiming.activetimeclock.split(starttiming.activetimeclock.startclock.totalsplitarray[starttiming.activetimeclock.startclock.itp]);
                starttiming.activetimeclock.startclock.itp++;
        }

        else if(textaction == "Start")
        {
                starttiming.activetimeclock.startclock.startStop();

        }
        else if (textaction == 'Reset')
        {
                starttiming.activetimeclock.startclock.reset();
        }

//console.log('after split class called');

});


// listen to server for DUP call over local network data.
socketpi.on('DUPinfo', function (dataDUP) {
console.log(dataDUP);
// whatever the 'value' property of the received data is:
	if(dataDUP == 'stop')
	{		
console.log('stop emit from dup');		
		// call the split function
console.log('start emit from dup');		
		starttiming.activetimeclock.splitswimmerid(starttiming.activetimeclock.startclock.totalsplitarray[starttiming.activetimeclock.startclock.itp]);
		starttiming.activetimeclock.split(starttiming.activetimeclock.startclock.totalsplitarray[starttiming.activetimeclock.startclock.itp]);
		starttiming.activetimeclock.startclock.itp++; 
		
	}
	else if(dataDUP == 'start')
	{
		// start button pressed
		starttiming.activetimeclock.startclock.startStop();

	}

	else if(dataDUP == 'reset')
	{
		// reset button pressed
		starttiming.activetimeclock.startclock.reset();

	}
//console.log('after split class called');
	
});	

	
	socketpi.emit('swimmerclientstart', { swimmerdevice: 'localhitchupstart' });

	


socketpi.on('startnews', function (startnews) {
//console.log('what is local status?');
//console.log(startnews);
	// whatis status of local connection
		if( startnews == 'localpi')
		{		
console.log('local server is live');
			$("#localpi").text('CONNECTED');
		setInterval(function() {socketpi.emit('swimmerclient', { swimmerdevice: 'localhitchup' })}, 10000);
		}
		else
		{
		// off local pi network
console.log('local server is offline');
		$("#localpi").text('DIS--CONNECTED');
			
		}
	
	});


	socketpi.on('repeatnews', function (startnews) {
console.log('what is local repeat status?');
console.log(startnews);
	// whatis status of local connection
		if( startnews == 'localpilive')
		{		
console.log('local server is repeat');		
		
		}
		else
		{
		// off local pi network
console.log('local server is offline');				
		}
		
	});	


currentsetset = 'int-' + $("#swiminterval").val() + 'sec ' + $("#swimstyle").val() + ' ' + $("#swimstroke").val() + ' ' + $("#swimtechnique").val() + ' ' + $("#swimdistance").val() + ' ' + $("#swimsplit").val();
$("#liveswimset").text('live: ' + currentsetset);

//console.log('start whole app');		
//console.log(starttiming);						

});