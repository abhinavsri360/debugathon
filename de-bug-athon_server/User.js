const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      default: 1
    },
    time: {
      type: Date,
      default: Date.now()
    },
    loggedInAt: {
      type: Date,
      default: Date.now()
    },
    loggedIn: {
      type: Boolean,
      default: false
    }
  },
  { collection: "users" }
);
module.exports = mongoose.model("user", UserSchema);
