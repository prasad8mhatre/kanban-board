'use strict';

var Card = require('../models/Card').Card;
var List = require('../models/List').List;

exports.create = function (req, res) {
    req.body.createdBy = req.user.email;
    req.body.updatedBy = req.user.email;
    req.body.createdDate = new Date();
    req.body.updatedDate = new Date();
    Card.create(req.body, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
            return res.send(err); // 500 error
        }
    });
};

exports.get = function (req, res) {
    Card.get({_id: req.params.id}, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
            return res.send(err); // 500 error
        }
    });
};

exports.getAllOrderby = function (req, res) {
    var orderType = req.body.orderType;
    var order = req.body.order;
    var sort = "{\"" + orderType + "\":" +  order + "}";

    Card.find({listId: req.body.listId}).sort(JSON.parse(sort)).find(function (err, result) {
        console.log(result);
        if (!err) {
            return res.json(result);
        } else {
            return res.send(err); // 500 error
        }
    });

};

exports.getAll = function (req, res) {
  Card.find({listId: req.params.listId, updatedBy: req.user.email}).sort({updatedDate: -1}).find(function (err, result) {
      if (!err) {
          return res.json(result);
      } else {
          return res.send(err); // 500 error
      }
  });

};

exports.update = function (req, res) {
  Card.findOneAndUpdate({ _id: req.params.id }, req.body, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.json(doc);
  });
}

exports.delete = function (req, res) {

    Card.find().remove({
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
