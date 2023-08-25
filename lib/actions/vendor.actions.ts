"use server"

import { cookies } from "next/headers"
import getIdByToken from "@/utils/helper"
import loginAuth from "@/utils/middleware"

import { ErrorType } from "@/types/core"

import SHOT from "../model/shotModel"
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
    cookies().set("token", token)
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
    if (!vendor) {
      throw new Error("Invalid Attempt, vendor not Found!")
    }
    cookies().delete("token")
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
      return shots
    }
  } catch (error) {
    const err = error as ErrorType
    throw new Error(`Failed to fetch user: ${err.message}`)
  }
}
