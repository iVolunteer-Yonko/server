import Event from '../../models/EventModel.js'

export const eventSubmit = async (req,res) => {
    req.body.organizerId = req.user.userID
    const event = await Event.create(req.body)
    res.json({event})
}