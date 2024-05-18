"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taxSchema = new mongoose_1.Schema({
    name: String,
    address: String,
    contactNumber: {
        type: String,
    },
    email: String,
    propertyAddress: String,
    propertyType: {
        type: String,
        enum: ["commercial", "recidental"],
    },
    propertyOwnershipStatus: {
        type: String,
        enum: ["owner", "tenant"],
    },
    propertyAssesmentValue: Number,
    taxYear: String,
    taxableIncome: Number,
    paymentMethod: {
        type: String,
        enum: ["online", "cash"],
    },
    paymentDate: String,
    amount: Number,
}, {
    timestamps: true
});
const tax = (0, mongoose_1.model)('tax', taxSchema);
exports.default = tax;
//# sourceMappingURL=tax.js.map