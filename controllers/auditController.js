const Audit = require("../models/Audit");

exports.getLogs = async (req, res, next) => {
  const logs = await Audit.find().sort({ createdAt: -1 });
  const logMessages = logs.map((log) => {
    let message = `[${log.createdAt}] [${log.type}]] `;
    if (log.action === "requests") {
      message += `User ${log.actor} requested an operation of ${
        log.operation
      } on the resource ${log.resource} having ID ${log.resourceId || null}`;
    } else if (["approved", "rejected"].includes(log.action)) {
      message += `User ${log.actor} ${log.action} ${log.resource} having ID ${
        log.resourceId || null
      }`;
    } else {
      message += `User ${log.actor} ${log.action}d a resource of type ${
        log.resource
      } having ID ${log.resourceId || null}`;
    }
    return message;
  });
  res.status(200).json({ logMessages });
};
