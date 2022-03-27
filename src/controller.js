"use strict";

var model = require("./model.js");

module.exports.skiresorts = skiresorts;
module.exports.skiresort = skiresort;
module.exports.tracks = tracks;
module.exports.weather = weather;
module.exports.skipass = skipass;
module.exports.reservation = reservation;

function skiresorts(req, res) {
    model.load('skiresorts', function(entities) {
        res.status(200).json(entities);
    });
}

function skiresort(req, res) {
    model.load('mountains', function(entities) {
        if(req.params.id){
            for(var i = 0; i < entities.length; i++) {
				if(entities[i]['_id'] === req.params.id) {
					res.status(200).json(entities[i]);
					return;
				}
            }
        }
		res.status(404).json({});
    });
}

function tracks(req, res) {
    model.load('tracks', function(entities) {
        if(req.params.id){
            entities = entities.filter(function(obj) {
                if(obj["mountain_id"] !== undefined) {
                    return obj["mountain_id"].toString() === req.params.id;
                }
                return false;
            });
            if(req.query.sort) {
                if(req.query.sortDirection && req.query.sortDirection === 'desc') {
                    entities = entities.sort(function(a, b) { return (a[req.query.sort] >= b[req.query.sort]) ? -1 : ((b[req.query.sort] > a[req.query.sort]) ? 1 : 0); });
                } else {
                    entities = entities.sort(function(a, b) { return (a[req.query.sort] >= b[req.query.sort]) ? 1 : ((b[req.query.sort] > a[req.query.sort]) ? -1 : 0); });
                }
            }
			res.status(200).json(entities);
        } else {
			res.status(404).json({});
		}
    });
}

function weather(req, res) {
    model.load('weather', function(entities) {
        if(req.params.id){
            entities = entities.filter(function(obj) {
                if(obj["mountain_id"] !== undefined) {
                    return obj["mountain_id"].toString() === req.params.id;
                }
                return false;
            });
			res.status(200).json(entities);
        } else {
			res.status(404).json({});
		}
    });
}

function skipass(req, res) {
    model.load('skipass', function(entities) {
        if(req.params.id){
            entities = entities.filter(function(obj) {
                if(obj["mountain_id"] !== undefined) {
                    return obj["mountain_id"].toString() === req.params.id;
                }
                return false;
            });
			res.status(200).json(entities);
        } else {
			res.status(404).json({});
		}
    });
}

function reservation(req, res) {
    model.load("reservation", function(entities) {
        var lastId = 1
        if(entities.length > 0){
            lastId = parseInt(entities[entities.length - 1]._id);
        }
        req.body._id = lastId + 1;
        entities.push(req.body);
        model.save("reservation", entities);
        res.status(200).json(req.body);
    });
}