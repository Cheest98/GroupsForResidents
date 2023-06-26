import mongoose from "mongoose";
import {globalGroup, userDescription, userPhone}  from "../data/const.js"


const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            require: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            require: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            min: 5,
            max: 50,
        },
        description: {
            type: String,
            require: true,
            min: 5,
            max: 500,
            default: userDescription
        },
        phone: {
            type: String,
            require: false,
            min: 5,
            max: 10,
            default: userPhone
        },
        picturePath: {
            type: String,
            default: "p1.jpeg",
        },
        group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: globalGroup }
    }
)

const User = mongoose.model("User", UserSchema)
export default User;