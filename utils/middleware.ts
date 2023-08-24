import jwt, { JwtPayload } from "jsonwebtoken"

import VENDOR from "@/lib/model/vendorModel"
import { connectToDB } from "@/lib/mongoose"

const JWT_SECRET = process.env.JWT_SECRET

const loginAuth = async (token: string) => {
  try {
    connectToDB()
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined")
    }

    const decoded = jwt.verify(token, JWT_SECRET) as string | JwtPayload
    if (typeof decoded === "string") {
      throw new Error("Invalid token")
    }

    const vendor = await VENDOR.findOne({
      _id: decoded._id,
      "tokens.token": token,
    })

    if (!vendor) {
      throw new Error("Token Expired!")
    }
    return vendor
  } catch (error) {
    throw new Error(`Please Authenticate : ${error}`)
  }
}

export default loginAuth
