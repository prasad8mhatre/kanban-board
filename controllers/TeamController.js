'use strict';

var Team = require('../models/Team').Team;

exports.create = function(req, res) {
  req.body.createdBy = req.user.email;
  req.body.updatedBy = req.user.email;
  req.body.createdDate = new Date();
  req.body.updatedDate = new Date();
  Team.create(req.body, function(err, result) {
    if (!err) {
      return res.json(result);
    } else {
      return res.send(err); // 500 error
    }
  });
};

exports.get = function(req, res) {
  Team.get({
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

  Team.find({updatedBy: req.user.email}).sort({
    updatedDate: -1
  }).find(function(err, result) {
    if (!err) {
      return res.json(result);
    } else {
      return res.send(err); // 500 error
    }
  });

};

exports.update = function(req, res) {

  Team.findOneAndUpdate({ _id: req.params.id }, req.body, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.json(doc);
  });

}

exports.delete = function(req, res) {

  Team.find().remove({
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
