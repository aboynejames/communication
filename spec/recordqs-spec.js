buster.spec.expose(); // Make spec functions global

var spec = describe("Record data from timing sensor", function () {
	before(function () {
	    
		this.testsensordata = new recordQS();
	});

	it("check object is defined", function () {

		buster.assert.defined(recordQS); 
			
	});

	it("check object is setup", function () {

		buster.assert.isObject(this.testsensordata);
	});   
	
	it("check logic routing function", function () {
	   
		buster.assert.isFunction(this.testsensordata.recordLogic);
	}); 
	
	it("check production of HTML context function", function () {
	   
		buster.assert.isFunction(this.testsensordata.recordHTMLset);
	}); 
	
	it("check save to cloud function", function () {
	   
		buster.assert.isFunction(this.testsensordata.swimdataCloud);
	}); 
	
});