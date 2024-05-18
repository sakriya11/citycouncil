"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tax_1 = __importDefault(require("../model/tax"));
const taxController = {
    createUserTax: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const taxInfo = req.body;
            const createTax = yield tax_1.default.create({
                name: taxInfo.name,
                address: taxInfo.address,
                contactNumber: taxInfo.contactNumber,
                email: taxInfo.email,
                propertyAddress: taxInfo.propertyAddress,
                propertyType: taxInfo.propertyType,
                propertyOwnershipStatus: taxInfo.propertyOwnershipStatus,
                propertyAssesmentValue: taxInfo.propertyAssesmentValue,
                taxYear: taxInfo.taxYear,
                taxableIncome: taxInfo.taxableIncome,
                paymentMethod: taxInfo.paymentMethod,
                paymentDate: taxInfo.paymentDate,
                amount: taxInfo.amount,
            });
            if (!createTax) {
                return res.status(409).send({
                    message: "Error creating city council tax",
                });
            }
            return res.status(200).send({
                message: "Council tax created succesfully",
                data: createTax,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Cannot create tax",
            });
        }
    }),
};
exports.default = taxController;
//# sourceMappingURL=tax.js.map