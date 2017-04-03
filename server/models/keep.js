let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId
let Schema = mongoose.Schema
import { models } from '../config/constants'

let schema = new Schema({
    title: { type: String, required: true },
    imageUrl: { type: String },
    articleLink: { type: String },
    tags: { type: String },
    public: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    timesVaulted: { type: Number, default: 0 },
    // Relations
    userId: { type: ObjectId, ref: models.user.name, required: true },
})

module.exports = mongoose.model(models.keep.name, schema);