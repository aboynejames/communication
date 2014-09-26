buster.spec.expose(); // Make spec functions global

var spec = describe("Make training programme tool UI", function () {
	before(function () {
	    
		this.testprogramme = new makeProgramme();
	});

	it("check programme object is defined", function () {

		buster.assert.defined(makeProgramme); 
			
	});

	it("check object is setup", function () {

		buster.assert.isObject(this.testprogramme);
	});   
	
	it("check logic rules function", function () {
	   
		buster.assert.isFunction(this.testprogramme.makeLogic);
	}); 

	
});