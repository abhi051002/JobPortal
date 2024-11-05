import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    website: { type: String },
    location: { type: String },
    logo: { type: String }, // URL to logo file
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const companyModel =
  mongoose.models.company || mongoose.model("company", companySchema);

export default companyModel;
