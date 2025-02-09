export default async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;

    // Add logic to save the user to your database
    // For example:
    // await saveUserToDatabase({ username, password });

    res.status(200).json({ message: "User registered successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};