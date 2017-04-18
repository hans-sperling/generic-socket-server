module.exports = (function networkConfigHelper() {

    // ---------------------------------------------------------------------------------------------------- Dependencies

    var os         = require('os'),
        charHelper = require('./charHelper.js');

    // ----------------------------------------------------------------------------------------------------- Preferences

    var networkInterfaces = os.networkInterfaces(),
        hasExtensiveInterfaceView = false,
        specificInterface         = null;

    // -------------------------------------------------------------------------------------------------- Module methods

    function getPublicApi() {
        return {
            showInterfaces : showInterfaces
        };
    }

    // -------------------------------------------------------------------------------------------------- Public methods

    function showInterfaces(networkConfig) {
        var foundInterfaces        = [],
            maxInterfaceNameLength = 0,
            i, str;



        /** @link http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js */
        Object.keys(networkInterfaces).forEach(function (interfaceName) {
            networkInterfaces[interfaceName].forEach(function (networkInterface) {

                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses if requested
                if (!hasExtensiveInterfaceView && (networkInterface.family !== 'IPv4' || networkInterface.internal !== false)) {
                    return;
                }

                if (specificInterface) {
                    if (specificInterface === interfaceName) {
                        foundInterfaces.push({name : interfaceName, address : networkInterface.address, port : networkConfig.http.port,  portString : networkConfig.http.port  + ' (http)'  });
                        foundInterfaces.push({name : interfaceName, address : networkInterface.address, port : networkConfig.https.port, portString : networkConfig.https.port + ' (https)' });
                        maxInterfaceNameLength = Math.max(maxInterfaceNameLength, interfaceName.length);
                    }
                }
                else {
                    foundInterfaces.push({name : interfaceName, address : networkInterface.address, port : networkConfig.http.port,  portString : networkConfig.http.port  + ' (http)  '});
                    foundInterfaces.push({name : interfaceName, address : networkInterface.address, port : networkConfig.https.port, portString : networkConfig.https.port + ' (https) '});
                    maxInterfaceNameLength = Math.max(maxInterfaceNameLength, interfaceName.length);
                }
            });
        });

        // Output all found interfaces with variable space for a pretty view
        for (i in foundInterfaces) {
            if (foundInterfaces.hasOwnProperty(i)) {
                console.log(foundInterfaces[i].name, charHelper.getFillChar(' ', maxInterfaceNameLength - foundInterfaces[i].name.length), '=> ', foundInterfaces[i].address + ':' + foundInterfaces[i].portString);
            }
        }
    }

    // ------------------------------------------------------------------------------------------------- Private methods

    // ...

    // -------------------------------------------------------------------------------------------------- Helper methods

    // ...

    // --------------------------------------------------------------------------------------------------- Init / Return

    return getPublicApi();
})();
