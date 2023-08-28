import jwt, { JwtPayload } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

const getIdByToken = async (token: any) => {
  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined")
    }
    const decoded = jwt.verify(token.value, JWT_SECRET) as string | JwtPayload
    if (typeof decoded === "string") {
      throw new Error("Invalid token")
    }
    return decoded._id
  } catch (error) {
    throw new Error(`No token : ${error}`)
  }
}

export default getIdByToken
