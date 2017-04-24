'use strict';

const Board =  require('./Board');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var TeamSchema = new Schema({
  name: String,
  description : String,
  owner : { type: String },
  members : [{ type: String }],
  createdBy : { type: String },
  updatedBy : { type: String },
  createdDate :  Date,
  updatedDate : Date,
  boards : [{ type: Schema.Types.ObjectId, ref: 'Board' }]

});


TeamSchema.statics = {

     
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
        var team = new this(data);
        team.save(callback);
    }
}

var Team = mongoose.model('Team', TeamSchema);

/** export schema */
module.exports = {
    Team: Team
};