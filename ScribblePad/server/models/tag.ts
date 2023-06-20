import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const TagSchema = new Schema({
    label: String,
    id: String
})

 export const Tag = mongoose.model('Tag', TagSchema)