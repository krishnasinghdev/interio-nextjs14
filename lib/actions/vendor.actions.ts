"use server"

import { ErrorType } from "@/types/core"

// import { FilterQuery, SortOrder } from "mongoose";
// import { revalidatePath } from "next/cache";

import VENDOR from "../model/vendorModel"
import { connectToDB } from "../mongoose"

//-------------NEW VENDOR-------------//
export const addVendor = async (body: any) => {
  try {
    connectToDB()
    console.log(body)
    const vendor = new VENDOR(body)
    await vendor.save()
    const token = await vendor.generateAuthToken()
    return { name: vendor?.name, _id: vendor._id, token }
  } catch (error) {
    const err = error as ErrorType
    throw new Error(`Failed to fetch user: ${err.message}`)
  }
}

//-------------LOGIN VENDOR-------------//
export const vendorLogin = async (body: any) => {
  try {
    const vendor = await VENDOR.findByCredentials(body.email, body.password)
    if (!vendor) {
      throw new Error("Invalid Attempt, vendor not Found!")
    }
    const token = await vendor.generateAuthToken()
    return { name: vendor?.name, _id: vendor?._id, token }
  } catch (error) {
    const err = error as ErrorType
    throw new Error(`Failed to fetch user: ${err.message}`)
  }
}

//-------------LOGOUT VENDOR-------------//
// export const logout = async (req, res) => {
//   try {
//     req.user.tokens = req.user.tokens.filter((token) => {
//       return token.token !== req.token;
//     });
//     await req.user.save();

//     response.r200(res, {}, 'Logged Out!');
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };
