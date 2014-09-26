buster.spec.expose(); // Make spec functions global

var spec = describe("Make training programme tool UI", function () {
	before(function () {
	    
		this.testserverclock = new serverClock();
	});

	it("check object is defined", function () {

		buster.assert.defined(serverClock); 
			
	});

	it("check object is setup", function () {

		buster.assert.isObject(this.testserverclock);
	});   
	
	it("check holder variable setup function", function () {
	   
		buster.assert.isFunction(this.testserverclock.setupHolders);
	}); 

	it("check start stopwatch  function", function () {
	   
		buster.assert.isFunction(this.testserverclock.startClock);
	}); 

	it("check display of time function", function () {
	   
		buster.assert.isFunction(this.testserverclock.displayClock);
	}); 
	
	it("check formatting of time function", function () {
	   
		buster.assert.isFunction(this.testserverclock.formatDisplay);
	}); 
	
	it("check identity controller function", function () {
	   
		buster.assert.isFunction(this.testserverclock.IDtimeController);
	}); 
	
	it("check produce split times data function", function () {
	   
		buster.assert.isFunction(this.testserverclock.setsplitDifference);
	}); 
	
	it("check presentation formatting time html function", function () {
	   
		buster.assert.isFunction(this.testserverclock.presentationPrepare);
	}); 
	
	it("check save data locally function", function () {
	   
		buster.assert.isFunction(this.testserverclock.saveLocal );
	}); 
	
	it("check function", function () {
	   
		buster.assert.isFunction(this.testserverclock.splitDataextract );
	}); 
	
	it("check extract individual split time function", function () {
	   
		buster.assert.isFunction(this.testserverclock.splitDataextract);
	}); 
	
	it("check updating of trianing programme function", function () {
	   
		buster.assert.isFunction(this.testserverclock.recordmanagement);
	}); 
	
	it("check roll back of training programme function", function () {
	   
		buster.assert.isFunction(this.testserverclock.backrecordmanagement);
	}); 
		
});