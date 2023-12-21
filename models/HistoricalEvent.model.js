// historicalEvent.js
const { Schema, model } = require("mongoose");
const defaultImage = "/images/event-default.jpg";

const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ratingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  value: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

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
    comments: [commentSchema],
    ratings: [ratingSchema],
  },
  {
    timestamps: true,
  }
);

const HistoricalEvent = model("HistoricalEvent", historicalEventSchema);

module.exports = HistoricalEvent;
