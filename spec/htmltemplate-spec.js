buster.spec.expose(); // Make spec functions global

var spec = describe("Prepare HTML template code", function () {
	before(function () {
	    
		this.testHTML = new ttHTML();
	});

	it("check object is defined", function () {

		buster.assert.defined(ttHTML); 
			
	});

	it("check object is setup", function () {

		buster.assert.isObject(this.testHTML);
	});   
	
	it("check form add idenity name  function", function () {
	   
		buster.assert.isFunction(this.testHTML.fromswimmers);
	}); 
	
	it("check produce check box html function", function () {
	   
		buster.assert.isFunction(this.testHTML.checkboxswimmers);
	}); 
	
	it("check header data HTML function", function () {
	   
		buster.assert.isFunction(this.testHTML.viewdataHeader);
	}); 
	
	it("check realtime splits presentation function", function () {
	   
		buster.assert.isFunction(this.testHTML.realtimesplitsdiff);
	});	
	
	it("check display server clock function", function () {
	   
		buster.assert.isFunction(this.testHTML.displaySeverClockdata);
	});	
	
	it("check clear clock function", function () {
	   
		buster.assert.isFunction(this.testHTML.clearIDdisplay);
	});	
	
	it("check stop time function", function () {
	   
		buster.assert.isFunction(this.testHTML.realtimestop);
	});	
	
	it("check display real time analysis  function", function () {
	   
		buster.assert.isFunction(this.testHTML.visualiseme);
	});		
	
	it("check display splits realtime function", function () {
	   
		buster.assert.isFunction(this.testHTML.reatimesplitdisplay);
	});
		
	it("check display time format function", function () {
	   
		buster.assert.isFunction(this.testHTML.formatTime);
	});
		
	it("check display of chart function", function () {
	   
		buster.assert.isFunction(this.testHTML.visualisechart);
	});
		
	it("check display summary statistics function", function () {
	   
		buster.assert.isFunction(this.testHTML.summaryme);
	});
		
	it("check display select name identity function", function () {
	   
		buster.assert.isFunction(this.testHTML.checkboxswimmers);
	});
		
	it("check display of existing training sets function", function () {
	   
		buster.assert.isFunction(this.testHTML.livecommunicationset);
	});
		
	it("check display save training set function", function () {
	   
		buster.assert.isFunction(this.testHTML.commelementbuild);
	});

});