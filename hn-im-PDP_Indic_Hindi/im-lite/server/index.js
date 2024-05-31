// const apm = require('elastic-apm-node').start({
//     // Override service name from package.json
//     // Allowed characters: a-z, A-Z, 0-9, -, _, and space
//     serviceName: 'mobileApmLog',
  
//     // Use if APM Server requires a token
//     secretToken: 'P5FqLU1dMgu1',
  
//     // Set custom APM Server URL (default: http://localhost:8200)
//     serverUrl: 'https://kibana-apm.intermesh.net:8300/',
//   });

require('@babel/register')({
    presets: ['@babel/react', '@babel/preset-env']
});
require("@babel/core").transform("code", {
    plugins: ["dynamic-import-webpack"],
});

var port = (typeof (process.env.PORT_M) !== 'undefined' ? process.env.PORT_M : 8083); //8082 - for dev, 8083 - loginfor stg
var fs = require('fs');

var Express = require('express')
var app = Express();
var router = require('./Router/routes');

var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var requestIp = require('request-ip');

var compression = require('compression');
app.use(compression());

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use(requestIp.mw()); //define request ip middileware
app.use(cors());
app.use(cookieParser());


if (process.env.NODE_ENV_M !== 'prod') {
    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var versionData = JSON.parse(fs.readFileSync(__dirname + '/version.json', 'utf8'));
    var chunkWritePath = require('../webpack');
    var config = require('../webpack.config')(Number(versionData.main_min), Number(versionData.jsChunks), Number(versionData.cssChunks), chunkWritePath);
    var compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath,
        historyApiFallback: true
    }));
}

app.set('etag', false); // turn off

if (typeof (process.env.NODE_ENV_M) == 'undefined')
    var domainName = process.env.NODE_ENV_M ? '' : 'localhost';
else
    var domainName = process.env.NODE_ENV_M ? '' : 'pwa-m.indiamart.com';


app.listen(port, domainName, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info('==> Listening on port %s. Open up localhost:%s/ in your browsers.', port, port)
    }
});

router(app);

