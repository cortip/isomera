export const generateRandomNumber = (numDigits = 6) => {
  const min = Math.pow(10, numDigits - 1)
  const max = Math.pow(10, numDigits) - 1

  return Math.floor(Math.random() * (max - min + 1)) + min
}
