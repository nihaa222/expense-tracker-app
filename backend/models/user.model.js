
import mongoose from "mongoose"
import bcrypt from "bcryptjs"

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
    password: {
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
    console.log("Password before hashing:", this.password)

    if (!this.isModified("password")) return next();
    try{
        const salt = await bcrypt.genSalt(10)
        console.log("Password before hashing:", this.password)

        this.password = await bcrypt.hash(this.password, salt)
        next();
        

    } catch(err) {
        next(err)
    }
})
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
const User = mongoose.model("User", userSchema)
export default User;