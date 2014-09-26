buster.spec.expose(); // Make spec functions global

var spec = describe("Setup and operation of pouchdb local database store", function () {
	before(function () {
	    
		this.testpouch = new pouchdbSettings();
	});

	it("check pouchdb object is defined", function () {

		buster.assert.defined(pouchdbSettings); 
			
	});

	it("check object is setup", function () {

		buster.assert.isObject(this.testpouch);
	});    
	     
	it("check create pouch function ", function () {

			   
		buster.assert.isFunction(this.testpouch.createPouchdb);
		//buster.assert.isArray();
		//buster.assert.equals(, '1000.00');
	}); 

	it("check bulksave function", function () {
	   
		buster.assert.isFunction(this.testpouch.bulkSave);
	}); 
	
	it("check singlesave pouch function ", function () {

			   
		buster.assert.isFunction(this.testpouch.singleSave);
		//buster.assert.isArray();
		//buster.assert.equals(, '1000.00');
	}); 

	it("check updatesingle function", function () {
	   
		buster.assert.isFunction(this.testpouch.updateSingle);
	}); 
	
	it("check view all docs pouch function ", function () {

			   
		buster.assert.isFunction(this.testpouch.allDocs);
		//buster.assert.isArray();
		//buster.assert.equals(, '1000.00');
	}); 

	it("check get document function", function () {
	   
		buster.assert.isFunction(this.testpouch.getDoc);
	}); 
	
	it("check delete single document pouch function ", function () {

			   
		buster.assert.isFunction(this.testpouch.deleteDoc);

	}); 
	
	it("check custom query swimmers data pouch function ", function () {

		buster.assert.isFunction(this.testpouch.mapQueryswimmers );
	}); 

	it("check custom query swimmers name function", function () {
	   
		buster.assert.isFunction(this.testpouch.mapQueryname);
	}); 
	
	it("check custom query date competitions pouch function ", function () {

		buster.assert.isFunction(this.testpouch.mapQueryCommdate);
	}); 

	it("check custom query split time data function", function () {
	   
		buster.assert.isFunction(this.testpouch.mapQuerySplits);
	}); 
	
	it("check utility changelog data pouch function ", function () {

		buster.assert.isFunction(this.testpouch.changeLog);
	}); 

	it("check utility changelog with filter function", function () {
	   
		buster.assert.isFunction(this.testpouch.filterchangeLog);
	}); 
	
	it("check delete entire  pouchdb function ", function () {

		buster.assert.isFunction(this.testpouch.deletePouch);
	}); 

	it("check replication pouch function", function () {
	   
		buster.assert.isFunction(this.testpouch.replicate);
	}); 
	
	
	it("check custom query for individual data request  pouch function ", function () {

		buster.assert.isFunction(this.testpouch.returndatacallback);
	}); 
	
});
