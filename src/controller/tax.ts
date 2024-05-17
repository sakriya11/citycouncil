import { Request, Response } from "express";
import Tax from "../model/tax";

const taxController = {
  createUserTax: async (req: Request, res: Response): Promise<Response> => {
    try {
      const taxInfo = req.body;

      const createTax = await Tax.create({
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
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Cannot create tax",
      });
    }
  },
};

export default taxController;
