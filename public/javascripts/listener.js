/*globals io*/
$(function () {
    "use strict";
    var socket = io.connect('/');

    socket.on('new_tweet', function (data) {
        console.log('data');
        console.log(data);
    });
});
