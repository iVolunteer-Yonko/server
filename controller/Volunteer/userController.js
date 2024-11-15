import Volunteer from "../../models/VolunteerModel.js"

export const getCurrentUser = async (req,res) => {
    const user = await Volunteer.findOne({ _id : req.user.userID })
    .select('name email role');
    res.status(200).json({ user })
}