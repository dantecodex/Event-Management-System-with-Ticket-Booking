import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is a required field"],
        minlength: [3, "Name must be atleast three letters long"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is a required field"],
        validate: {
            validator: function (email) {
                return validator.isEmail(email)
            },
            message: "Please enter valid email address"
        }
    },
    password: {
        type: String,
        required: [true, "Password is a required field"],
        minlength: [6, "Password length should not be less than 6"],
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, "Confirm Password is a required field"],
        validate: {
            validator: function (confirmPassword) {
                return confirmPassword === this.password
            },
            message: "Password and Confirm passwrod do not match"
        }
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }

}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 12)
    this.confirmPassword = undefined
})

userSchema.methods.comparePassword = async (userPassword, enteredPassword) => {
    return await bcrypt.compare(enteredPassword, userPassword)
}

const User = mongoose.model('Users', userSchema)

export default User