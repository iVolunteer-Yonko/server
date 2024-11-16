import mongoose from "mongoose";

const { Schema, model } = mongoose;

const badgeSchema = new Schema({
  badgeTitle: {
    type: String,
    required: true,
    trim: true,
  },
  badgeDescription: {
    type: String,
    required: true,
    trim: true,
  },
  badgeimage: {
    type: String
  },
  // badgePublicId: String
});


const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDateTime: {
      type: Date,
      required: true,
    },
    endDateTime: {
      type: Date,
      required: true,
    },
    eventimage: {
      type: String, 
    },
    categories: {
      type: String,
      trim: true,
    },
    tags: {
      type: String,
    },
    venue: {
      type: String,
      required: true,
    },
    organizerdetails: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    cost: {
      type: Number,
      default: 0, 
    },
    badges: [badgeSchema], 
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
    // eventPublicId: String,
  },
  {
    timestamps: true,
  }
);

const Event = model("event", eventSchema);

export default Event;
