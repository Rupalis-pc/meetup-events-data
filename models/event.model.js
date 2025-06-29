const mongoose = require("mongoose");

//Define Schema
const eventSchema = new mongoose.Schema({
  name: String,
  hostedBy: String,
  details: String,
  dressCode: String,
  isAgeRestriction: Boolean,
  eventTags: [String],
  type: String,
  startDate: String,
  startTime: String,
  endDate: String,
  endTime: String,
  address: String,
  price: Number,
  speakers: [Object],
  imgUrl: String,
});

//Define model
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
