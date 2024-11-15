import mongoose from 'mongoose'

const OrganizerSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        role: {
            type: String,
            enum: ['organizer'],
            default: 'organizer'
        }
    }
, { timestamps: true})

export default mongoose.model('Organizer', OrganizerSchema)