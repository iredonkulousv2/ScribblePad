import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SessionSchema = new Schema({
    cookieId: {type: String, required: true, unique:true},
    createdAt: { type: Date, expires: 300, default: Date.now }

})

export default mongoose.model('Session',SessionSchema)