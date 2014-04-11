/**
* Train TImer - communication mixer
*
* Train Timer settings, pouchDB
* @class pouchdbSettings
*
* @package    Train Timer part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/

/**
* pouchdb utility class
* @class pouchdbSettings
*/
var pouchdbSettings = function() {
  this.account = {};
	this.account.pouchdbname = 'traintimer';
	this.livepouch = this.createPouchdb();

};

/**
* create or make live pouchdb database
* @method createPouchdb		
*
*/	
pouchdbSettings.prototype.createPouchdb = function() {
	
	db = new PouchDB('traintimer');
	return db;

};

/**
* save more than one documents to pouchdb
* @method bulkSave		
*
*/
pouchdbSettings.prototype.bulkSave = function(datain) {
	
	this.livepouch.bulkDocs({docs: datain}, function(err, response) {
//console.log(response);
	});

};

/**
* save data to a single document
* @method singleSave		
*
*/	
pouchdbSettings.prototype.singleSave = function(datain) {
	
	this.livepouch.post(datain, function (err, response) {

	});

};

pouchdbSettings.prototype.updateSingle = function(datain) {
		

};

/**
* get list of all pouchdb documents
* @method allDocs		
*
*/	
pouchdbSettings.prototype.allDocs = function() {

		this.livepouch.allDocs({include_docs: true}, function(err, response) { 
	
console.log(response);	
	});
		

};

/**
* get data on one pouchdb document
* @method getDoc		
*
*/	
pouchdbSettings.prototype.getDoc = function(docid) {

		this.livepouch.get(docid, function(err, response) {
//console.log(response);

			});

};

/**
*  Update specific document if ID provided
* @method putDoc		
*
*/	
pouchdbSettings.prototype.putDoc = function(designdoc) {
	
	/*this.livepouch.put({
		_id: 'mydoc',
		_rev: '1-A6157A5EA545C99B00FF904EEF05FD9F',
		title: 'Lets Dance',
	}, function(err, response) { })*/

	this.livepouch.put(designdoc, function(err, response) {

//console.log(response);
		});
	
};

/**
* delete one pouchdb document
* @method deleteDoc		
*
*/	
pouchdbSettings.prototype.deleteDoc = function(docid) {
	
	this.livepouch.get(docid, function(err, doc) {
		db.remove(doc, function(err, response) { });
	});

};

/**
*  query all swimmer data in pouch
* @method mapQueryswimmers
*/
pouchdbSettings.prototype.mapQueryswimmers = function(callbackin) {
//console.log('lane number in' + lanein);		
				
	function map(swimquery) {
		if(swimquery.name) {
			emit(swimquery.lanetrain, [swimquery.swimmerid, swimquery.name]);
		}
	}

	db.query({map: map}, {reduce: false}, function(err, response) {
//console.log(response);		
	callbackin(response);
});

};


/**
* list of all swimmers by name
* @method mapQueryname
*/
pouchdbSettings.prototype.mapQueryname = function(lanein, callbackin) {
//console.log('lane number in' + lanein);		
			
	function map(lanequery) {
//console.log('lane number in map' + lanequery['lanein']);			
		if(lanequery.lanetrain) {
			emit(lanequery.lanetrain, [lanequery.swimmerid, lanequery.name]);
		}
	}

	db.query({map: map}, {reduce: false}, function(err, response) {
//console.log(response);		
		callbackin(response);
	});
};

/**
* communication programme by date
* @method mapQueryCommdate
*/
pouchdbSettings.prototype.mapQueryCommdate = function(commdatein, callbackin) {
//console.log('lane number in' + lanein);					
	function map(commquery) {

		if(commquery.commdate) {
		emit(commquery.commdate, [commquery.swimmerid, commquery.communication, commquery.commid]);
		}
	}

	db.query({map: map}, {reduce: false}, function(err, response) {
//console.log(response);		
		callbackin(response);
	});
};

/**
* get splits data
* @method mapQuerySplits
*/
pouchdbSettings.prototype.mapQuerySplits = function(lanein, callbackin) {
//console.log('lane number in' + lanein);						
	function map(splitsquery) {
//console.log('lane number in map' + lanequery['lanein']);			
		if(splitsquery.session) {
			emit(splitsquery.swimmerid, splitsquery.session);
		}
	}

	db.query({map: map}, {reduce: false}, function(err, response) {
//console.log(response);		
		callbackin(response);
	});

};


/**
* list changes on pouchdb log
* @method changeLog		
*
*/	
pouchdbSettings.prototype.changeLog = function() {

	this.livepouch.changes({complete: function(err, response) {
		
		
		}
		
	});
	
};

/**
* filter applied to pouchdb logs data
* @method filterchangeLog
*
*/	
pouchdbSettings.prototype.filterchangeLog = function(callbackin) {
	
		db.changes( {filter : 'swimmers/justname'}, function(err, response) {
//console.log(response);
			callbackin(response);
		
		});	


};

/**
* copy pouchdb locally or to couchdb?
* @method replicate		
*
*/	
pouchdbSettings.prototype.replicate = function() {

PouchDB.replicate(this.account.pouchdbname, 'traintimercloud', {
  onChange: onChange,
  complete: onComplete
});
	

};

/**
* Delete a whole database 
* @method deletePouch		
*
*/	
pouchdbSettings.prototype.deletePouch = function() {

	PouchDB.destroy(this.account.pouchdbname, function(err, info) { });


};

/**
* query pouch for data on  a per swimmer basis
* @method returndatacallback
*/
pouchdbSettings.prototype.returndatacallback = function(swimidin, datatypein) {
//console.log(datatypein + 'what id going to pouchclass');
historicalswimdata = {};
	// need to query pouch for the data
	// test splits data recall						
	function localDataSPcall(swimidin, callback) {  
						livepouch.mapQuerySplits(swimidin, callback);

					}  
      
					swimprepared = localDataSPcall(swimidin, function(spmap) {

						historicalswimdata = {};	
							
						// the current swim settings
							
						var liveelementrecord = $(".recordcount").parent().attr('id');		
						var	swimsetlive = {};
						//swimsetlive["swimdate"] = $("#swimdate").text();
						swimsetlive.swimstyle = $("#" + liveelementrecord + ".liveswimelement #swimstyle").text();
						swimsetlive.swimtype =	$("#" + liveelementrecord + ".liveswimelement #swimtype").text();
						swimsetlive.swimstroke = $("#" + liveelementrecord + ".liveswimelement #swimstroke").text();
						swimsetlive.swimtechnique =  $("#" + liveelementrecord + ".liveswimelement #swimtechnique").text();
						swimsetlive.swimdistance = $("#" + liveelementrecord + ".liveswimelement #swimdistance").text();
//console.log(spmap);							
					// itterate over results and pick out the one required	
						spmap.rows.forEach(function(rowswimrs){
//console.log(rowswimrs['key']);
							if(rowswimrs.key == swimidin )
							{
								// need to set time interval to retrieve
								var traintimenow = new Date();
								startswimdate = Date.parse(traintimenow); // current time/date
								
								// change length goe back in time depending on chart or summary context (plus need to sync with online couchdb for all data history)
								if(datatypein == "splitdatain")
								{
									endswimdateperiod = startswimdate - 86400000; // 86400000 cover from start date 24 hours 10800000;  //go back 3 hours
								}
								else if(datatypein == "persummaryid")
								{
									endswimdateperiod = startswimdate - 315360000000;  // go back 10 years from todays date
								}	
//console.log(endswimdateperiod + 'go back three hours' + startswimdate + 'current time' + 'saveactual time' + rowswimrs['value']['sessionid']);								
								if( rowswimrs.value.sessionid < startswimdate && rowswimrs.value.sessionid > endswimdateperiod)
								{
//console.log('time filter passed');								
									// need a set of filters for time period and swim setting e.g. stroke distance etc
									if( swimsetlive.swimstroke ==  rowswimrs.value.swiminfo.swimstroke  && swimsetlive.swimtechnique ==  rowswimrs.value.swiminfo.swimtechnique && swimsetlive.swimdistance ==  rowswimrs.value.swiminfo.swimdistance )
									{
									//pass the lane data to get html ready
										historicalswimdata[rowswimrs.value.sessionid] = rowswimrs.value;
									
									}
								}
							}	
						});
//console.log( historicalswimdata);		
/*						
console.log('test object');
		alivepouch = {"1":"1"};
		aswimidin = '3865253--554494698';
		ahistoricalswimdata = {};
		ahistoricalswimdata['sessionid'] = 1364553195000;
		ahistoricalswimdata['splittimes'] = [1074, 2399];	
		ahistoricalswimdata['swiminfo'] = {"swimdate":"2013-03-29T10:33:15.109Z", "swimdistance":"100", "swimsplit":"50", "swimstroke":"freestyle", "swimstyle":"training", "swimtechnique":"swim"};

console.log(alivepouch);
console.log(aswimidin);
console.log(ahistoricalswimdata);
newobjecttes = {};
newobjecttes['1364553195000'] = ahistoricalswimdata;
console.log(newobjecttes);
*/		
							// what is data for
							if(datatypein == "splitdatain")
							{
							//return historicalswimdata;
								visthedata = liveHTML.visualiseme(livepouch, swimidin, historicalswimdata);
								swimidin = '';
								historicalswimdata = '';

							}
							else if(datatypein == "persummaryid")
							{
							//return historicalswimdata;
								visthedata = liveHTML.summaryme(livepouch, swimidin, historicalswimdata);
								swimidin = '';
								historicalswimdata = '';

							}
							else
							{
								// chart data
								visthedata = liveHTML.visualisechart(livepouch, swimidin, historicalswimdata);
								swimidin = '';
								historicalswimdata = '';
							}
					});
};


