"use server"

import loginAuth from "@/utils/middleware"

import { ErrorType } from "@/types/core"

import { IVendor } from "../model/types/vendor-type"
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
    connectToDB()
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
export const vendorLogout = async (token: string) => {
  try {
    const vendor: IVendor = await loginAuth(token)

    vendor.tokens = vendor.tokens.filter((tok) => {
      return tok.token !== token
    })

    await vendor.save()

    return { message: "Logged Out!" }
  } catch (error) {
    const err = error as ErrorType
    throw new Error(`Failed to fetch user: ${err.message}`)
  }
}
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
