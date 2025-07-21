
import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    passwrod: {
        type: String,
        required: true,
    
    },
    role: {
        type: String,
        enum: ['employee', "admin"],
        default: "employee"
    },
}, {timestamps: true})

userSchema.pre("save", async function (next) {
    if (!this.isModified) return next();
    try{
        const salt = await bcrypt.genSalt(10)
        this.passwrod = await bcrypt.hash(this.passwrod, salt)
        next();
        

    } catch(err) {
        next(err)
    }
})
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.passwrod)
}
const User = mongoose.model("User", userSchema)
export default User;