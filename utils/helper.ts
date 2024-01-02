import jwt, { JwtPayload } from "jsonwebtoken";





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

export function getErrorMessage(error: unknown): string {
  let message: string
console.log(error)
  if (error instanceof Error) {
    console.log('type 1', error.message)
    message = error.message
  } else if (error && typeof error === "object" && "message" in error) {
    console.log('type 2')
    message = String(error.message)
  } else if (typeof error === "string") {
    console.log('type 3')
    message = error
  } else {
    console.log('type 4')
    message = "Something went wrong"
  }
  return message
}