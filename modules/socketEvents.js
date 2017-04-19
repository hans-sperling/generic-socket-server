module.exports = (function socketEvents() {

    // ---------------------------------------------------------------------------------------------------- Dependencies

    var messageHelper = require('./messageHelper.js');

    // ----------------------------------------------------------------------------------------------------- Preferences

    // ...

    // -------------------------------------------------------------------------------------------------- Module methods

    function getPublicApi() {
        return {
            onConnection : onConnection
        };
    }

    // -------------------------------------------------------------------------------------------------- Public methods

    function onConnection(socket) {
        messageHelper.show('onConnection', socket, {});

        socket.on('disconnect', function onDisconnect(userData) {
            messageHelper.show('onDisconnect', socket, userData );
        });

        socket.on('publish', function onPublish(userData) {
            messageHelper.show('onPublish', socket, userData);

            socket.broadcast.emit('publish', userData);
        });

        socket.emit('connected', {});
    }

    // ------------------------------------------------------------------------------------------------- Private methods

    // ...

    // -------------------------------------------------------------------------------------------------- Helper methods

    // ...

    // --------------------------------------------------------------------------------------------------- Init / Return

    return getPublicApi();
})();
