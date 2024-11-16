import Event from '../../models/EventModel.js';
// import cloudinary from 'cloudinary';
// import { formatImage } from '../../middleware/multerMiddleware.js'

export const eventSubmit = async (req, res) => {
  // try {
    // const { files } = req; 
    // const details = {...req.body}

    // if (files.eventImage) {
    //   const file = formatImage(files.eventImage);
    //   const eventImageResponse = await cloudinary.v2.uploader.upload(file);
    //   details.eventimage = eventImageResponse.secure_url;
    //   details.eventPublicId = eventImageResponse.public_id;
    // }

    // if (files.badgeImage) {
    //   const file1 = formatImage(files.badgeImage);
    //   const badgeImageResponse = await cloudinary.v2.uploader.upload(file1);
    //   details.badgeimage = badgeImageResponse.secure_url;
    //   details.badgePublicId = badgeImageResponse.public_id;
    // }
    const event = await Event.create(req.body)
    res.status(201).json({event})

};
