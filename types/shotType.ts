export type OwnerType = {
  name: string
  follower: string[]
  following: string[]
  likedshot?: string[]
  email: string
  _id: string
}

export type shotData = {
  title: string
  category: string
  description: string
  tags: string[]
  images: { title: string; url: string; _id: string }[]
  _id: string
  owner: OwnerType
}

export type shotDataArr = shotData[]

export type messageProp = {
  sender: string
  content: string
  readBy: string[]
  createdAt: string
}

export type vendorType = {
  _id: string
  name: string
  follower: string[]
  following: string[]
  likedShot: string[]
}

export type reduxVendor = {
  vendor: string
  v_id: string
  token: string
}
