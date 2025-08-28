import mongoose from "mongoose";

const ProjectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  tools: {
    type: String,
    required: true,
  },
  demo: {
    type: String,
    required: false,
  },
  git: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
});

export default mongoose.model("Project", ProjectSchema);
