import { models } from '../config/constants'
let mongoose = require('mongoose')
mongoose.Promise = global.Promise;
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  created: { type: Number, default: Date.now() },
  // Relations
  // lists: [{ type: ObjectId, ref: models.list.name }],
  userId: { type: ObjectId, ref: models.user.name, required: true },
  collaborators: [{ type: ObjectId, ref: models.user.name }]
});

// schema.methods.getLists = function(next{
//   Lists.find({boardId: this._id})
// })


module.exports = mongoose.model(models.board.name, schema);