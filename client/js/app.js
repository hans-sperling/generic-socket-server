$( document ).ready(function() {

    var socket,
        isSsl = (window.location.href.split("/")[0] == 'https:');

    if (isSsl) {
        socket = io('https://127.0.0.1:8081'); // First time call this url in your browser to install this unknown certificate
    }
    else  {
        socket = io('http://127.0.0.1:8080');
    }

    // --------------------------------------------------------------------------------------------------- socket events

    socket.on('connected', function onConnected(data) {
        console.info('You are connected to the server.', data);

        socket.emit('publish', {});
    });

});
