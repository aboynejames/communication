buster.spec.expose(); // Make spec functions global

var spec = describe("Master timing stopwatch class", function () {
	before(function () {
	    
		this.testperid = new PerSwimmer();
	});

	it("check object is defined", function () {

		buster.assert.defined(PerSwimmer); 
			
	});

	it("check object is setup", function () {

		buster.assert.isObject(this.testperid);
	});   
	
	it("check sets up data model per ID in function", function () {
	   
		buster.assert.isFunction(this.testperid.splitswimmerid);
	}); 
	
	it("check performs split record function", function () {
	   
		buster.assert.isFunction(this.testperid.split);
	}); 

});