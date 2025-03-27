import mongoose from "mongoose";

const { model, models, Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "hotel", "admin"]
    },
    tokens: {
      token: {
        type: String,
        default: ""
      }
    }
  },
  { timestamps: true }
);

// ✅ Prevent model overwriting by checking `models.user` first
const User = models.user || model("user", userSchema);

export default User;
