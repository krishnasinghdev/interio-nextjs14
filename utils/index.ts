export const r400 = (message = "Invalid request") => {
  throw new Error(`Failed : ${message}`)
}
