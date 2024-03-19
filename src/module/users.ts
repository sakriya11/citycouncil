import { Schema,Document,model } from "mongoose";

const userSchema = new Schema(
    {
        fullName:String,
        email:{
            type:String,
            required:[true,"Email address is required"],
            unique:true
        },
        password:String,
        confirmPassword:String,
        gender:{
            type:String,
            enum:["male","female"]
        },
        token:[String]

    },
    {timestamps:true}
)

export interface IUser extends Document{
    fullname:string;
    email:string;
    password:string;
    confirmPassword:string;
}

const user = model<IUser>('User',userSchema);

export default user;