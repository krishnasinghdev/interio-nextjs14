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

export function getErrorMessage(error: unknown): string {
  let message: string
  if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message)
  } else if (typeof error === "string") {
    message = error
  } else {
    message = "Something went wrong"
  }
  return message
}

export function formatDateInDMY(inputDate: string): string {
  const date = new Date(inputDate)
  if (isNaN(date.getTime())) return ""

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }
  return date.toLocaleDateString(undefined, options)
}

export function formatDMY(date: string, weekday?: boolean) {
  const options: {
    year: string
    month: string
    day: string
    weekday?: string
  } = { year: "numeric", month: "long", day: "numeric" }
  if (weekday) {
    options.weekday = "short"
  }
  // @ts-ignore -d s
  return new Date(date).toLocaleDateString(undefined, options)
}
