import { Model, model, Schema } from "mongoose";
import { IAddress, IUser, userInstanceMethod, userStaticMethod } from "../interfaces/user.interface";
import validator from "validator";
import bcrypt from "bcryptjs";
import { log } from "console";

const userAddressSchema = new Schema<IAddress>(
  {
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    zip: {
      type: Number,
    },
  },
  {
    _id: false,
  }
);

const userSchema = new Schema<IUser, userStaticMethod, userInstanceMethod>({
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
    //   validate: {
    //       validator: function (v) {
    //           return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
    //       },
    //       message: function (props) {
    //           return`Email ${props.value} is not valid`
    //       }
      // }
      validate: [validator.isEmail, "Invalid Email {VALUE}"]
    
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
    address: userAddressSchema
}, {
    versionKey: false,
    timestamps:true
});

userSchema.method("hashPassword", async function (plainPassword) {
    const password = await bcrypt.hash(plainPassword, 10);

    
    
    return password;
   
    
});

userSchema.static("hashPassword", async function (plainPassword) {
    const password = await bcrypt.hash(plainPassword, 10);

    return password
})

userSchema.pre("save", async function () {

    console.log("inside pre save hook");
    this.password = await bcrypt.hash(this.password, 10);
    
    console.log(this);
    
})

userSchema.post("save", function () {
    console.log("insidepost save hook");
    
})


export const User = model<IUser, userStaticMethod>("User", userSchema);