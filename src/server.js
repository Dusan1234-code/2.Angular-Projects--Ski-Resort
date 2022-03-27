"use strict";

var express = require("express"),
	app = express(),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    controller = require("./controller.js");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static(__dirname + '/public'));

app.route("/api/skiresorts")
    .get(controller.skiresorts);
app.route("/api/skiresorts/:id")
    .get(controller.skiresort);
app.route("/api/skiresorts/:id/tracks")
	.get(controller.tracks);
app.route("/api/skiresorts/:id/weather")
	.get(controller.weather);
app.route("/api/skiresorts/:id/skipass")
	.get(controller.skipass)
	.post(controller.reservation);

app.listen(3000, function() {
    console.log("Server started");
});