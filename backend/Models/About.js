import mongoose from "mongoose";

const AboutSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  linkedIn: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
});

export default mongoose.model("About", AboutSchema);
