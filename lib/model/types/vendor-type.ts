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
  address: string | null
  biography: string | null
  workHistory: Array<{ title: string; company: string; location: string; from: string; to: string }>
  lookingFor: Array<{ title: string; location: string }>
  ownShot: Types.ObjectId[]
  likedShot: Types.ObjectId[]
  shotCollections: Types.ObjectId[]
  socialLinks: Array<{ platform: string; url: string }>
  skills: string[]
  follower: string[]
  following: string[]
  resetToken: string | null
  expireToken: Date | null
  otp: string | null
  otpExpireIn: Date | null
  tokens: Array<{ token: string }>
  profilePic: string | null
  generateAuthToken(): Promise<string>
}

export interface IVendorModel extends Model<IVendor> {
  findByCredentials(email: string, password: string): Promise<IVendor>
}
