"use server"

import { cookies } from "next/headers"
import getIdByToken, { getErrorMessage } from "@/utils/helper"

import SHOT from "../model/shot.model"
import VENDOR from "../model/vendor.model"
import { connectToDB } from "../mongoose"

//-------------GET ALL VENDOR-------------//
export const getAllVendors = async () => {
  try {
    connectToDB()
    const vendor = await VENDOR.find({})
    return { vendor }
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

//-------------NEW VENDOR-------------//
export const addVendor = async (body: any) => {
  try {
    connectToDB()
    body["username"] = body.email.split("@")[0]
    const vendor = new VENDOR(body)
    await vendor.save()
    const token = await vendor.generateAuthToken()
    cookies().set("token", token)

    return { name: vendor?.name, _id: vendor._id.toString(), token }
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
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
    cookies().set("token", token)
    return { name: vendor?.name, _id: vendor?._id.toString(), profilePic: vendor.profilePic, token }
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

//-------------LOGOUT VENDOR-------------//
export const vendorLogout = async () => {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("token")
    const _id = await getIdByToken(token)

    if (!_id) {
      return { message: "Token Expired", code: 500 }
    }
    const vendor = await VENDOR.findOne({ _id })
    if (!vendor) {
      throw new Error("Invalid Attempt, vendor not Found!")
    }
    cookies().delete("token")
    vendor.tokens = vendor.tokens.filter((tok) => {
      return tok.token !== token?.value
    })

    await vendor.save()
    return { message: "Logged Out!" }
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

//-------------REVALIDATE VENDOR-------------//
export const revalidateVendor = async () => {
  try {
    connectToDB()

    const cookieStore = cookies()
    const prevToken = cookieStore.get("token")
    if (!prevToken) {
      return { message: "Token Not Found", code: 500 }
    }

    const _id = await getIdByToken(prevToken)
    if (!_id) {
      return { message: "Token Expired", code: 500 }
    }

    const vendor = await VENDOR.findOne({ _id }).select("name profilePic tokens")
    if (!vendor) {
      return { message: "Vendor Not Found", code: 500 }
    }
    vendor.tokens = vendor.tokens.filter((tok) => {
      return tok.token !== prevToken?.value
    })

    const token = await vendor.generateAuthToken()
    await vendor.save()
    cookies().set("token", token)
    return { name: vendor?.name, _id: vendor._id.toString(), profilePic: vendor.profilePic, token, code: 200 }
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

//-------------GET COMPLETE VENDOR-------------//
export const getVendorProfile = async () => {
  try {
    connectToDB()
    const cookieStore = cookies()
    const token = cookieStore.get("token")
    if (!token) throw new Error("Token Not Found")
    const _id = await getIdByToken(token)
    if (!_id) throw new Error("Token Expired")
    const vendor = await VENDOR.findOne({ _id }).select("-password -tokens")
    if (!vendor) {
      throw Error("NO vendor data FOUND")
    }
    return { vendor }
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

//-------------GET VENDOR TABS-------------//
export const getTabs = async (tab: string) => {
  try {
    connectToDB()
    const cookieStore = cookies()
    const token = cookieStore.get("token")
    if (!token) return
    const _id = await getIdByToken(token)
    if (!_id) return
    let selectWord = "shotCollections"
    let tabArr: string | any[] = []
    if (tab === "liked-shot") {
      selectWord = "likedShot"
    }
    if (tab === "work") {
      selectWord = "ownShot"
    }

    const vdr = await VENDOR.findOne({ _id }).select(selectWord)
    if (!vdr) {
      throw Error("NO vendor data FOUND")
    }

    if (selectWord === "shotCollections") {
      // const collection = await COLLECTION.findById(vendor.shotCollections[0]);
      // tabArr = collection.shots;
    } else if (selectWord === "likedShot") {
      tabArr = vdr.likedShot
    } else {
      tabArr = vdr.ownShot
    }
    if (tabArr.length == 0) {
      return { shots: [] }
    } else {
      const shots = await SHOT.find({ _id: { $in: tabArr } })
      if (!shots) {
        throw Error("Unable to get shots!")
      }
      return { shots }
    }
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

//-------------UPDATE VENDOR-------------//

export const updateVendor = async (body: any) => {
  try {
    connectToDB()
    const cookieStore = cookies()
    const token = cookieStore.get("token")
    if (!token) return
    const _id = await getIdByToken(token)
    if (!_id) return
    const vendor: any = await VENDOR.findOne({ _id })
    if (!vendor) {
      throw Error("NO vendor data FOUND")
    }
    const updates = Object.keys(body)
    updates.forEach((update) => {
      vendor[update] = body[update]
    })
    await vendor.save()
    return { vendor }
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}
