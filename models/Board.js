'use strict';

const List = require('./List');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var BoardSchema = new Schema({
  name: { type: String },
  description : { type: String },
  createdBy : { type: String },
  updatedBy : { type: String },
  createdDate :  Date,
  updatedDate : Date,
  lists : [{ type: Schema.Types.ObjectId, ref: 'List' }],
  orderedOn : { type: String }

});


BoardSchema.statics = {

     
    get: function(query, callback) {
        this.findOne(query, callback);
    },
    getAll: function(query, callback) {
        this.find(query, callback);
    },
    updateById: function(id, updateData, callback) {
        this.update(id, {$set: updateData}, callback);
    },
    remove: function(removeData, callback) {
         this.remove(removeData, callback);
    },
    create: function(data, callback) {
        var board = new this(data);
        board.save(callback);
    }
}

var board = mongoose.model('board', BoardSchema);

/** export schema */
module.exports = {
    Board: board
};