import { model, Schema, Document } from "mongoose";

const taxSchema = new Schema({
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
},{
    timestamps:true
});

export interface ITax extends Document{
    name:string;
    address:string;
    contactNumber:string;
    email:string;
    propertyAddress:string;
    propertyType:string,
    propertyOwnershipStatus:string;
    propertyAssesmentValue:number;
    taxYear:string;
    taxableIncome:number;
    paymentMethod:string;
    paymentDate:string;
    amount:number;
}

const tax = model<ITax>('tax',taxSchema)

export default tax;
