import Organizer from "../../models/OrganizerModel.js"

export const getCurrentUser = async (req,res) => {
    const user = await Organizer.findOne({ _id : req.user.userID })
    .select('name email role');
    res.status(200).json({ user })
}