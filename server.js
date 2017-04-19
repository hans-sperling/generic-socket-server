// -------------------------------------------------------------------------------------------------------- Dependencies

var fs                  = require('fs'),
    http                = require('http'),
    https               = require('https'),
    io                  = require('socket.io'),
    ioSSL               = require('socket.io'),
    timeHelper          = require('./modules/timeHelper.js'),
    socketEvents        = require('./modules/socketEvents.js'),
    charHelper          = require('./modules/charHelper.js'),
    networkConfigHelper = require('./modules/networkConfigHelper.js');

// --------------------------------------------------------------------------------------------------------- Preferences

var showTimestamp = true,
    networkConfig = {
        http : {
            port : 8080
        },
        https : {
            port : 8081,
            key  : fs.readFileSync('.ssh/server.key'), // https://devcenter.heroku.com/articles/ssl-certificate-self
            cert : fs.readFileSync('.ssh/server.crt')
        }
    };

// ------------------------------------------------------------------------------------------------------ Module methods

function init() {
    showOnStartingServer();
    startSocketServer(function onCallback() {
        showOnStartedServer();
    });
}


function showOnStartingServer() {
    console.log('Try to start server ...');
}


function showOnStartedServer() {
    var headerString = '';

    headerString += 'Server has been started';

    if (showTimestamp) {
        headerString += ' at ' + timeHelper.getDateTimeString(' ');
    }

    console.log(headerString);
    console.log('Ports : ' + networkConfig.http.port + ' (http), ' + networkConfig.https.port + ' (https)\n');
    networkConfigHelper.showInterfaces(networkConfig);
    console.log(charHelper.getFillChar('-', headerString.length) + '\n');
}


function startSocketServer(callback) {
    var httpsServer = https.createServer(networkConfig.https).listen(networkConfig.https.port);

    // http
    io.listen(networkConfig.http.port).on('connection', socketEvents.onConnection);

    // https
    ioSSL.listen(httpsServer).on('connection', socketEvents.onConnection);

    callback();
}

// ------------------------------------------------------------------------------------------------------ Helper methods

// ...

// ------------------------------------------------------------------------------------------------------- Init / Return

(init());
