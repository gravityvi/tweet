const { Schema, model } = require("mongoose");

const AuditSchema = new Schema(
  {
    actor: {
      type: String,
      required: true,
    },
    action: {
      type: String,
    },
    resource: {
      type: String,
    },
    resourceId: {
      type: String,
    },
    operation: {
      type: String,
    },
    status: {
      type: String,
      enum: ["success", "failure"],
    },
    type: {
      type: String,
      enum: ["ACCESS", "AUDIT", "ACTION"],
    },
  },
  { timestamps: true }
);

AuditSchema.virtual("log").get(function () {
  let message;
  if (this.action === "requests") {
    message = `User ${this.actor} requested an operation of ${this.operation} on the resource ${this.resource} having ID ${resourceId}`;
  } else if (["approved", "rejected"].includes(this.action)) {
    message = `User ${this.actor} ${this.action} ${this.resource} having ID ${this.resourceId}`;
  } else {
    message = `User ${this.actor} ${this.action}d a resource of type ${this.resource} having ID ${this.resourceId}`;
  }
  return message;
});

module.exports = model("audit", AuditSchema);
