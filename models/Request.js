const { Schema, model } = require("mongoose");

const RequestSchema = Schema(
  {
    type: {},
    model: {
      type: String,
      enum: ["users", "tweets"],
      required: true,
    },
    owner: {
      type: String,
    },
    status: {
      type: String,
      enum: ["approved", "pending", "rejected", "error"],
      default: "pending",
      required: true,
    },
    approvedBy: {
      type: String,
    },
    modelId: {
      type: Schema.Types.ObjectId,
    },
    payload: {
      type: {},
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Request", RequestSchema);
