'use strict';

const Board = require('./Board');

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var CardSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  createdBy: {
    type: String
  },
  updatedBy: {
    type: String
  },
  createdDate: Date,
  updatedDate: Date,
  dueDate: Date,
  priority: Number,
  listId : String

});


CardSchema.statics = {


  get: function(query, callback) {
    this.findOne(query, callback);
  },
  getAll: function(query, callback) {
    this.find(query, callback);
  },
  updateById: function(id, updateData, callback) {
    updateData.updatedDate = new Date();
    this.update(id, {
      $set: updateData
    }, callback);
  },
  remove: function(removeData, callback) {
    this.remove(removeData, callback);
  },
  create: function(data, callback) {
    var card = new this(data);
    card.save(callback);
  }
}

var card = mongoose.model('card', CardSchema);

/** export schema */
module.exports = {
  Card: card
};
