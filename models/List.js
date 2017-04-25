'use strict';

const Card = require('./Card');


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var ListSchema = new Schema({
  name: { type: String },
  description : { type: String },
  createdBy : { type: String },
  updatedBy : { type: String },
  createdDate :  Date,
  updatedDate : Date,
  cards : [{ type: Schema.Types.ObjectId, ref: 'Card' }],
  position : Number

});


ListSchema.statics = {


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
        var list = new this(data);
        list.createdDate = new Date();
        list.updatedDate = new Date();
        list.save(callback);
    }
}

var list = mongoose.model('list', ListSchema);

/** export schema */
module.exports = {
    List: list
};
