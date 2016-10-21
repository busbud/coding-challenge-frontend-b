'use strict'

let microtime = require('microtime'),
    startTimes = {},
    benchMemos = {};

let bench = {
  start: function(name, memo) {
    startTimes[name] = microtime.now();
    benchMemos[name] = memo || "";
  },
  end: function(name) {
    
    let start = startTimes[name] || startTimes[name.split(":")[0]];
    if(!start) {
      console.log("[bench] "+name + "hasn't been started yet.");
      return false;
    };
    
    let end  = microtime.now();
    let time = ((end - start) / 1000);
    console.log("[bench] "+name+ " " +time+ "ms "+ benchMemos[name]);
    delete startTimes[name];
    delete benchMemos[name];
  }
}

exports = module.exports = bench;