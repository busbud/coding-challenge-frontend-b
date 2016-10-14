var microtime = require('microtime');
	
var startTimes = {};
var benchMemos = {};

var bench = {
	start: function(name, memo) {
		startTimes[name] = microtime.now();
		benchMemos[name] = memo || "";
	},
	end: function(name) {
		
		var start = startTimes[name] || startTimes[name.split(":")[0]];
		if(!start) {
			console.log("[bench] "+name + "hasn't been started yet.");
			return false;
		};
		
		var end  = microtime.now();
		var time = ((end - start) / 1000);
		console.log("[bench] "+name+ " " +time+ "ms "+ benchMemos[name]);
		delete startTimes[name];
		delete benchMemos[name];
	}
};	

exports = module.exports = bench;