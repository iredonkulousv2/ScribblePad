import mongoose from 'mongoose'
import {TagSchema} from './tag'

const Schema = mongoose.Schema

const NoteSchema = new Schema({
    title: {type: String, required: true},
    markdown: {type: String, required: true},
    userId: {type: String, required: true},
    tags: [TagSchema]

})

export default mongoose.model('Note', NoteSchema)