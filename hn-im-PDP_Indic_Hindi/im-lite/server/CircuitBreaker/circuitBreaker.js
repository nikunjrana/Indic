const Cache = require('../Cache');
var CircuitBroken = {};
function isCircuitBroken(domain) {
    let thresholdCounter = require('./thresholdCounter')(domain);
    let currentCounter = Cache.getCache(domain);
    if(domain) var obj = domain.split('//')[1].split('.')[0];
    if (currentCounter && currentCounter >= thresholdCounter) {
        if(obj) CircuitBroken[obj] = "true";
        return true;
    }
    else {
        if(obj) CircuitBroken[obj] = "false";
        return false;
    }
}
function CircuitStatus(obj){
    // console.log(JSON.stringify(CircuitBroken));
    return CircuitBroken[obj];
}
function update5XXCount(domain) {
    if(domain){
        let thresholdCounter = require('./thresholdCounter')(domain);
        let currentCounter = Cache.getCache(domain);
        if (currentCounter && currentCounter < thresholdCounter) {
            // console.log("==================Counter=============="+currentCounter+domain);
            Cache.setCache(domain, (currentCounter + 1), 60);
        }
        else {
            Cache.setCache(domain, 1, 60);
        }
    }
}
module.exports = { isCircuitBroken: isCircuitBroken, update5XXCount: update5XXCount ,CircuitStatus: CircuitStatus};

