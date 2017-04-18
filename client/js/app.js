$( document ).ready(function() {
    // ----------------------------------------------------------------------------------------------- socket connection
    // http
    //var socket = io('http://127.0.0.1:8080');

    // https
     var socket = io('https://127.0.0.1:8081'); // First time call this url in your browser to install this unknown certificate

    // --------------------------------------------------------------------------------------------------- socket events

    socket.on('connected', function onConnected(data) {
        console.info('You are connected to the server.');

        socket.emit('publish', { id : 2, data : {} });
    });

});
