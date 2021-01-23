const { Schema, model } = require("mongoose");

const TweetSchema = new Schema(
  {
    data: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
    },
    title: {
      type: String,
      requried: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Tweet", TweetSchema);
