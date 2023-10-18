export const generateId = (): number => {
    // Get last 6 digits
    const timestamp = Date.now() % 1000000

    // Generate a number between 0~9999
    const random = Math.round(Math.random() * 10000)

    return (timestamp * 10000) + random
}