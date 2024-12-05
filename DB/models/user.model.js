import { Schema , model } from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        lowercase: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    gender:{
        type: String,
        enum:["male" , "female"],
        default: "male"
    },
    role:{
        type: String,
        enum:["user" , "admin"],
        default: "user"
    },
    age: {
        type: Number,
        min: 18,
        max: 100
    }
},{
    timestamps: true
});

const User = model("User" , userSchema);

export default User;