import mongoose from "mongoose";

const SkillSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  Items: {
    type: [String],
    required: true,
  },
});

export default mongoose.model("Skill", SkillSchema);
