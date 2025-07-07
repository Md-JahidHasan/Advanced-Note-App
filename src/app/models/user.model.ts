import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 10,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: [18, "Must be at least 18, got value {VALUE}"],
    max: 60,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
      unique: true,
      validate: {
          validator: function (v) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
          },
          message: function (props) {
              return`Email ${props.value} is not valid`
          }
    }
    
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: {
        values: ["user", "admin"],
        message: "Role is not valid. Got {VALUE} role"
    },
    default: "user",
  },
});


export const User = model("User", userSchema);