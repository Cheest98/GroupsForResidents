import mongoose from "mongoose";

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
        picturePath: {
            type: String,
            default: "p1.jpeg",
        },
        group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default:"643db2e5ed80753e9ab0b321" }
    }
)

const User = mongoose.model("User", UserSchema)
export default User;