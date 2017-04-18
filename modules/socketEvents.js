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
        showMessage('onConnect', { socket : socket } );

        socket.on('disconnect', function onCustom(userData) {
            showMessage('onDisconnect', { socket : socket, userData : userData } );
        });

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
            case 'onConnect' :
                if (showClientId) {
                    message += 'Client (' + data.socket.id + ') ';
                }
                else {
                    message += 'A client ';
                }

                message += 'has connected';
                break;

            case 'onDisconnect' :
                if (showClientId) {
                    message += 'Client (' + data.socket.id + ') ';
                }
                else {
                    message += 'A client ';
                }

                message += 'has disconnected';
                break;

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
