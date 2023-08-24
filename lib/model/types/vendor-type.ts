import { Model, Types } from "mongoose"

export interface IVendor extends Document {
  save(): unknown
  _id: Types.ObjectId
  type: string
  socketId: string | null
  name: string
  username: string
  email: string
  contact: number | null
  password: string
  state: string | null
  city: string | null
  pincode: number | null
  area: string | null
  biography: string | null
  workHistory: Array<{ title: string; duration: string }>
  lookingfor: Array<{ title: string; duration: string }>
  ownShot: Types.ObjectId[]
  likedShot: Types.ObjectId[]
  shotCollections: Types.ObjectId[]
  socialLinks: Array<{ platform: string; url: string }>
  skill: string[]
  follower: string[]
  following: string[]
  resetToken: string | null
  expireToken: Date | null
  otp: string | null
  otpExpireIn: Date | null
  tokens: Array<{ token: string }>
  generateAuthToken(): Promise<string>
}

export interface IVendorModel extends Model<IVendor> {
  findByCredentials(email: string, password: string): Promise<IVendor>
}
