import mongoose from 'mongoose'

const OrganizerSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        contactemail: String,
        password: String,
        typeoforg: {
            type: String,
            enum: ['NGO', 'charity', 'Foundation', 'Other'],
            default: 'Other'
        },
        role: {
            type: String,
            enum: ['organizer'],
            default: 'organizer'
        },
        website: String,
        about: String
    }
, { timestamps: true})

export default mongoose.model('Organizer', OrganizerSchema)