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
        showMessage('onAnonymousClientConnect', { socket : socket } );

        socket.on('publish', function onCustom(userData) {
            showMessage('onPublish', { socket : socket, userData : userData } );
        });


        socket.emit('connected', {});
    }

    // -------------------------------------------------------------------------------------------------- Helper methods

    function showMessage(eventName, data) {
        var message = '';

        data          = data || {};
        data.userData = data.userData || {};

        if (showTimestamp) {
            message += timeHelper.getDateTimeString(' ') + separator;
        }

        switch(eventName) {
            case 'onAnonymousClientConnect' :
                message += 'An anonymous client has connected'; break;
            case 'onPublish' :
                if (showClientId) {
                    message += 'Client (' + data.socket.id + ') ';
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
