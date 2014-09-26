buster.spec.expose(); // Make spec functions global

var spec = describe("Top level application logic class", function () {
	before(function () {
	    
		this.testlogic = new llLogic();
	});

	it("check logic object is defined", function () {

		buster.assert.defined(llLogic); 
			
	});

	it("check object is setup", function () {

		buster.assert.isObject(this.testlogic);
	});   
	
	it("check function", function () {
	   
		buster.assert.isFunction(this.testlogic.frameworklogic);
	}); 

	it("check setname function", function () {
	   
		buster.assert.isFunction(this.testlogic.setNameID);
	}); 	
	
	it("check token setup function", function () {
	   
		buster.assert.isFunction(this.testlogic.setToken);
	}); 	
	
});