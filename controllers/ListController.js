'use strict';

var List = require('../models/List').List;
var Card = require('../models/Card').Card;

exports.create = function(req, res) {
  req.body.createdBy = req.user.email;
  req.body.updatedBy = req.user.email;
  req.body.createdDate = new Date();
  req.body.updatedDate = new Date();
  List.create(req.body, function(err, result) {
    if (!err) {
      return res.json(result);
    } else {
      return res.send(err); // 500 error
    }
  });
};

exports.get = function(req, res) {
  List.get({
    _id: req.params.id
  }, function(err, result) {
    if (!err) {
      return res.json(result);
    } else {
      return res.send(err); // 500 error
    }
  });
};

exports.getAll = function(req, res) {


  List.find({boardId: req.params.boardId, updatedBy: req.user.email}).sort().find(function(err, result) {
    if (!err) {
      return res.json(result);
    } else {
      return res.send(err); // 500 error
    }
  });

};

exports.update = function(req, res) {
  List.findOneAndUpdate({ _id: req.params.id }, req.body, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.json(doc);
  });
}

exports.delete = function(req, res) {
  List.find().remove({
    _id: req.params.id
  }).remove(function(err, result) {
    if (!err) {
      return res.json(result);
    } else {
      console.log(err);
      return res.send(err); // 500 error
    }
  });
}
