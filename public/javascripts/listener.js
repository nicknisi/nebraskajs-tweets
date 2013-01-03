/*globals io*/
$(function () {
    "use strict";
    var socket = io.connect('/');

    socket.on('new_tweet', function (data) {
        console.log('data');
        console.log(data);
        $('.tweet-list').append(showTweet(data));
    });

    function showTweet(data) {
        var $avatar = $('<img/>', {
            src: data.img,
            class: 'avatar'
        });
        var $username = $('<a href="' + data.user + '" class="username">' + data.user + '</span>');
        var $text = $('<span class="text">' + data.tweet + '</span>');
        return $('<li/>', { class: 'tweet' }).append($avatar).append($username).append($text);

    }
});
