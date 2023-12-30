// historicalEvent.js
const { Schema, model } = require("mongoose");
const defaultImage = "/images/event-default.jpg";

const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  content: {
    type: String,
    required: false,
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
       default: Date.now, 
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
const Comment = model("Comment", commentSchema); 
const Rating = model("Rating", ratingSchema);

module.exports = { HistoricalEvent, Comment, Rating };
