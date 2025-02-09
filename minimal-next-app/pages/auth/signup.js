import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to sign up the user (e.g., call an API to create a user)
    // For example:
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      // Automatically sign the user in after registration
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (result.ok) {
        router.push("/dashboard");
      } else {
        // Handle error
        console.log(result.error);
      }
    } else {
      // Handle error
      console.log("Failed to sign up");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}