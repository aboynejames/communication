buster.spec.expose(); // Make spec functions global

var spec = describe("Controller of identity, time and display code", function () {
	before(function () {
	    
		this.testcontroller =  new SwimtimeController();
	});

	it("check object is defined", function () {

		buster.assert.defined(SwimtimeController); 
			
	});

	it("check object is setup", function () {

		buster.assert.isObject(this.testcontroller);
	});   
	
	it("check identity and logic routing function", function () {
	   
		buster.assert.isFunction(this.testcontroller.identifyswimmer);
	}); 
	
});