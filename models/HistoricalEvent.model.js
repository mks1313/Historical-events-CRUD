const { Schema, model } = require("mongoose");
const defaultImage = ('/images/event-dafault.jpg');

const historicalEventSchema = new Schema(
  {
  title: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  links: {
    type: [String],
  },
  image: {
    type: String,
    default: defaultImage,
  },
  notableCharacters: {
    type: [String],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}
);

const HistoricalEvent = model("HistoricalEvent", historicalEventSchema);

module.exports = HistoricalEvent;
