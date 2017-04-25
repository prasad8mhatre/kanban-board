'use strict';

var List = require('../models/List').List;

exports.create = function(req, res) {
  req.body.createdBy = req.user.email;
  req.body.updatedBy = req.user.email;
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
  List.getAll({}, function(err, result) {
    if (!err) {
      return res.json(result);
    } else {
      return res.send(err); // 500 error
    }
  });
};

exports.update = function(req, res) {
  List.updateById(req.params.id, req.body, function(err, result) {
    if (!err) {
      return res.json(result);
    } else {
      return res.send(err); // 500 error
    }
  });
}

exports.delete = function(req, res) {
  List.removeById({
    _id: req.params.id
  }, function(err, result) {
    if (!err) {
      return res.json(result);
    } else {
      console.log(err);
      return res.send(err); // 500 error
    }
  });
}
