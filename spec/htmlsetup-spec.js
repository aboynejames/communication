buster.spec.expose(); // Make spec functions global

var spec = describe("Setup and production html code class", function () {
	before(function () {
	    
		this.testhtml = new llHTML();
	
	});

	it("check pouchdb object is defined", function () {

		buster.assert.defined(llHTML); 
			
	});

	it("check object is setup", function () {

		buster.assert.isObject(this.testhtml);
	});    
	     
	it("check sections function ", function () {

		buster.assert.isFunction(this.testhtml.sectionslive);
		//buster.assert.isArray();
		//buster.assert.equals(, '1000.00');
	}); 

});