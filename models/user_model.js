import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import crypto from "crypto"
import { type } from "os";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is a required field"],
        minlength: [3, "User name must be atleast three letters long"]
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
    },
    events: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Events'
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date

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

userSchema.methods.createResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000 // 10 minute
    return resetToken
}

const User = mongoose.model('Users', userSchema)

export default User