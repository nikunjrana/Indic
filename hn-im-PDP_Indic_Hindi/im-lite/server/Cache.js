const NodeCache = require("node-cache");
const myCache = new NodeCache();
function setCache(key, value, ttl = 86400) {
    myCache.set(key, value, ttl);
}
function getCache(key) {
    const value = myCache.get(key);
    return value;
}
function clearAll() {
    myCache.flushAll();
}
function deleteKey(key) {
    myCache.del(key);
}
module.exports = {
    setCache: setCache,
    getCache: getCache,
    clearAll: clearAll,
    deleteKey: deleteKey
}