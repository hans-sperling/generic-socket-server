module.exports = (function messageHelper() {

    // ---------------------------------------------------------------------------------------------------- Dependencies

    var timeHelper = require('./timeHelper.js');

    // ----------------------------------------------------------------------------------------------------- Preferences

    var showTimestamp = false,
        showClientId  = false,
        separator     = ' => ',
        messages      = {
            onConnection : function onConnect(socket, userData) {
                var message = '';
        
                if (showClientId) {
                    message += 'Client (' + socket.id + ') ';
                }
                else {
                    message += 'A client ';
                }

                message += 'has connected';
                
                return message;
            },
            onDisconnect : function onDisconnect(socket, userData) {
                var message = '';
            
                if (showClientId) {
                    message += 'Client (' + socket.id + ') ';
                }
                else {
                    message += 'A client ';
                }

                message += 'has disconnected';
                
                return message;
            },
            onPublish : function onPublish(socket, userData) {
                var message = '';
            
                if (showClientId) {
                    message += 'Client (' + socket.id + ') ';
                }
                else {
                    message += 'A client ';
                }

                message += 'has published event \'' + userData.event + '\'';
                
                return message;
            }
        };

    // -------------------------------------------------------------------------------------------------- Module methods

    function getPublicApi() {
        return {
            show : show
        };
    }

    // -------------------------------------------------------------------------------------------------- Public methods

    function show(event, socket, userData) {
        var message = '';

        if (messages.hasOwnProperty(event)) {
            if (showTimestamp) {
                message += timeHelper.getDateTimeString(' ') + separator;
            }

            message += messages[event](socket, userData);

            console.log(message);
        }

    }

    // ------------------------------------------------------------------------------------------------- Private methods

    // ...
    
    // -------------------------------------------------------------------------------------------------- Helper methods

    // ...

    // --------------------------------------------------------------------------------------------------- Init / Return

    return getPublicApi();
})();
