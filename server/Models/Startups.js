const mongoose = require("mongoose");
const StartupSchema = new mongoose.Schema({
  Founder_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Name: {
    type: String,
    unique: false,
  },
  isVerified: { type: Boolean, default: true },
  Description: String,
  Website: { type: String },
  Email: { type: String, },
  Instagram: { type: String },
   LinkedIn: { type: String },
  LogoUrl: { type: String },
  Category: String,
  Vision: String,
  Problemstatement: String,
  // Solution: String,
  Ask: { type: Number, default: 0 },
  Current: { type: Number, default: 0 },
  Backers: { type: Number, default: 0 },
});
const Startup = mongoose.model("startup", StartupSchema);
Startup.createIndexes();
module.exports = Startup;
