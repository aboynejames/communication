buster.spec.expose(); // Make spec functions global

var spec = describe("Test communication connectivity socketio etc", function () {
    before(function () {
	    
	this.testsocket =  io.connect('http://192.168.1.44:8881');
	//this.testqs = $.param.querystring();
	//this.testqsobject = $.deparam(this.testqs, true);
	    
    });

   it("check socketio object is defined", function () {

		buster.assert.defined(this.testsocket); 
        		
    });
        

   it("check object is setup", function () {

		buster.assert.isObject(this.testsocket);
    });    
 /*	     
   it("check ", function () {

	   
		//buster.assert.isArray();
		//buster.assert.equals(, '1000.00');
    }); 

   it("check ", function () {
	   
		//buster.assert.isFunction();
    }); 
*/
   
});

