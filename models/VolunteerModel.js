import mongoose from 'mongoose'

const VolunteerSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        role: {
            type: String,
            enum: ['volunteer'],
            default: 'volunteer'
        }
    }
, { timestamps: true})

export default mongoose.model('Volunteer', VolunteerSchema)