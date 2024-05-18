"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    fullName: String,
    email: {
        type: String,
        required: [true, "Email address is required"],
        unique: true,
    },
    password: String,
    confirmPassword: String,
    emailVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true });
const user = (0, mongoose_1.model)("User", userSchema);
exports.default = user;
//# sourceMappingURL=users.js.map