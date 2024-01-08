import mongoose from "mongoose"

mongoose.set("strictQuery", true)

const shotSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      lowercase: true,
    },
    images: [
      {
        title: String,
        url: String,
      },
    ],
    owner: {
      type: String,
      requied: true,
      ref: "Vendor",
    },
    like: [mongoose.Schema.Types.ObjectId],
    comments: [
      {
        v_id: String,
        comment: String,
      },
    ],
    view: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Shot = mongoose.models.Shot || mongoose.model("Shot", shotSchema)

export default Shot
