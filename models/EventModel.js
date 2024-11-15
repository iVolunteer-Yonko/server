import mongoose from 'mongoose';

const { Schema, model } = mongoose;

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
    dateTime: {
      type: Date,
      required: true,
    },
    eventImage: {
      type: String
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Paid', 'Unpaid'],
      required: true,
    },
    organizerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organizer',
        required: true
    }
  },
  {
    timestamps: true,
  }
);

const Event = model('Event', eventSchema);

export default Event;