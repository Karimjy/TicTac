'use strict'

app.service('ClockService', function(){
	var typeClock;
	this.clock = function(clock){ 
		typeClock = clock;
	};

	this.getClock = function(){
		return typeClock;
	}
});