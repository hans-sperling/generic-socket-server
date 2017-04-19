$( document ).ready(function() {

    var socket,
        isPublisher = false,
        isSsl = (window.location.href.split("/")[0] == 'https:');

    if (isSsl) {
        socket = io('https://127.0.0.1:8081'); // First time call this url in your browser to install this unknown certificate
    }
    else  {
        socket = io('http://127.0.0.1:8080');
    }

    // --------------------------------------------------------------------------------------------------- socket events

    socket.on('connected', bindEvents);

    // -------------------------------------------------------------------------------------------------------- Bindings

    function bindEvents(data) {
        if (isPublisher) {
            socket.emit('publish', { event : 'publisher', data : null });

            $(window).on('scroll.event', function onScroll() {
                socket.emit('publish', { event : 'scroll', data : getScrollPosition() });
            });
        }
        else {
            socket.on('publish', function onPublish(userData) {
                switch (userData.event) {
                    case 'scroll' :
                        setScrollPosition(userData.data);
                        break;
                    default :
                        return;
                }
            });
        }
    }


    function unbindEvents() {
        if (isPublisher) {
            $(window).off('.event');
        }
        else {
            socket.removeAllListeners('publish');
        }
    }

    // -----------------------------------------------------------------------------------------------------------------

    function getScrollPosition() {
        var doc  = document.documentElement,
            left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
            top  = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop  || 0);

        return {
            x : left,
            y : top
        };
    }

    function setScrollPosition(position) {
        $(window).scrollTop(position.y);
        $(window).scrollLeft(position.x);
    }

    function getClickPosition(e) {
        var doc  = document.documentElement,
            left = e.pageX,
            top  = e.pageY;

        return {
            x : left,
            y : top
        };
    }

});
