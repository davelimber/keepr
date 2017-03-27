import { models } from '../config/constants'

let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	created: { type: Number, default: Date.now() },
	// Relations
	listId: { type: ObjectId, ref: models.list.name, required: true },
	boardId: { type: ObjectId, ref: models.board.name, required: true },
	// comments: [{ type: ObjectId, ref: models.comment }],
	userId: { type: ObjectId, ref: models.user.name, required: true }
});

// schema.post('save', function(){
// 	Lists.findById(this.listId)
// 		.then(list => {

// 		})
// })

module.exports = mongoose.model(models.task.name, schema);