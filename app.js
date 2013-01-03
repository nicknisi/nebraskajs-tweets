/*jshint camelcase:false*/
"use strict";
var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    util = require('util'),
    Twitter = require('ntwitter'),
    twitterAuth = require('./twitter.json'),
    SocketIO = require('socket.io'),
    path = require('path');

var app = express(),
    server = http.createServer(app),
    io = SocketIO.listen(server),
    keyword = 'nebraskajs';

// configure socket.io
io.configure(function () {
    io.set('log level', 1);
});

// configure the express app
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'hbs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(require('less-middleware')({ src: __dirname + '/public' }));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

var twitter = new Twitter(twitterAuth);

function formatData(data) {
    return {
        tweet: data.text,
        img: data.user.profile_image_url.replace('_normal', ''),
        user: data.user.screen_name,
        uid: data.user.id
    };
}


function getTwitterStream() {
    twitter.stream('statuses/filter', {track: keyword}, function (stream) {
        stream.on('data', function (data) {
            console.log('new tweet');
            io.sockets.emit('new_tweet', formatData(data));
        });
        stream.on('error', function (err) {
            console.log('ERROR');
            console.log(err);
        });
    });
}

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/:user', function (req, res) {
    twitter.showUser(req.params.user, function (err, data) {
        if (err || data.length === -1) {
            res.send("Error finding user");
        } else {
            data = data[0];
            res.render("user", {
                userId: data.id,
                name: data.name,
                username: data.screen_name,
                tweets: data.statuses_count,
                location: data.location,
                img: data.profile_image_url
            });
        }
    });
});

getTwitterStream();

server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
