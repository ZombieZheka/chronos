// server/models/Calendar.js

const { Schema, model } = require("mongoose");

const CalendarSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  owner: {
    type: String
  },
});

CalendarSchema.methods.toJSON = function () {
  const { __v, password, ...calendar } = this.toObject();
  return calendar;
};

module.exports = model("Calendar", CalendarSchema);
