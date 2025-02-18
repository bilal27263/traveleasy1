import Together from "together-ai"

// Initialize the Together client
// The API key should be stored in an environment variable
const together = new Together(process.env.TOGETHER_API_KEY)

export default together

