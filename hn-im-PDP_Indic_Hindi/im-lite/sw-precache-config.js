module.exports = {
	"staticFileGlobs": [
	  "build/static/css/**.css",
	  "build/**.html",
	  "build/static/media/**.*",
	  "build/static/js/**.js"
	],
	"stripPrefix": "build/",
	runtimeCaching: [{
  urlPattern: 'http://localhost/index.php?r=web_service/EnqList&req_type=json&glusr_id=12471055&start=1&end=20&folder=2&qType=&glid=12471055&app_version=',
  handler: 'cacheFirst'
  }], 
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: '/wamp64/www/pwa-react/im-lite/build/service-worker.js'
};