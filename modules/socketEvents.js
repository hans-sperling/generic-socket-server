module.exports = (function socketEvents() {

    // ---------------------------------------------------------------------------------------------------- Dependencies

    var timeHelper = require('./timeHelper.js');

    // ----------------------------------------------------------------------------------------------------- Preferences

    var showTimestamp = true,
        showClientId  = true,
        separator     = ' => ';

    // -------------------------------------------------------------------------------------------------- Module methods

    function getPublicApi() {
        return {
            onConnection : onConnection
        };
    }

    // -------------------------------------------------------------------------------------------------- Public methods

    function onConnection(socket) {
        showMessage('onAnonymousClientConnect');

        socket.on('publish', function onCustom(data) {
            showMessage('onPublish', socket, data);
        });


        socket.emit('connected', { test : 'test' });
    }

    // -------------------------------------------------------------------------------------------------- Helper methods

    function showMessage(eventName, socket, data) {
        var message = '';

        if (showTimestamp) {
            message += timeHelper.getDateTimeString(' ') + separator;
        }

        switch(eventName) {
            case 'onAnonymousClientConnect' :
                message += 'An anonymous client has connected'; break;
            case 'onPublish' :
                if (showClientId) {
                    message += 'Client (' + socket.id + ') ';
                }
                else {
                    message += 'A client ';
                }

                message += 'has publish something';
                break;
            default :
                return;
        }

        console.log(message);
    }

    // --------------------------------------------------------------------------------------------------- Init / Return

    return getPublicApi();
})();
