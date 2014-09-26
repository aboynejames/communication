buster.spec.expose(); // Make spec functions global

var spec = describe("Master timing stopwatch class", function () {
	before(function () {
	    
		this.testmasterclock = new MasterWatch();
	});

	it("check object is defined", function () {

		buster.assert.defined(MasterWatch); 
			
	});

	it("check object is setup", function () {

		buster.assert.isObject(this.testmasterclock);
	});   
	
	it("check format master clock display function", function () {
	   
		buster.assert.isFunction(this.testmasterclock.format);
	}); 

		
	it("check reset clock to 0 00 00 function", function () {
	   
		buster.assert.isFunction(this.testmasterclock.reset);
	}); 
		
	it("check start of stopwatch function", function () {
	   
		buster.assert.isFunction(this.testmasterclock.startStop);
	}); 
	
	it("check move forward training set one item function", function () {
	   
		buster.assert.isFunction(this.testmasterclock.recordmanagement);
	}); 

		
	it("check one setp back for training set item function", function () {
	   
		buster.assert.isFunction(this.testmasterclock.backrecordmanagement);
	}); 

});