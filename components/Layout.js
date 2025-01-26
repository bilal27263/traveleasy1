import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Layout({ children }) {
  const { data: session } = useSession();

  return (
    <div>
      <header>
        {!session ? (
          <div className="auth-buttons">
            <Link href="/auth/signin">
              <button id="loginButton">Login</button>
            </Link>
            <Link href="/auth/signup">
              <button id="signUpButton">Sign Up</button>
            </Link>
          </div>
        ) : (
          <div className="auth-buttons">
            <button onClick={() => signOut()}>Logout</button>
          </div>
        )}
      </header>
      <main>{children}</main>
      <style jsx>{`
        .auth-buttons {
          position: fixed;
          top: 10px;
          right: 10px;
        }
        button {
          cursor: pointer;
          margin: 0 5px;
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          transition-duration: 0.4s;
          border-radius: 5px;
        }
        button:hover {
          background-color: white;
          color: black;
          border: 2px solid #007bff;
        }
      `}</style>
    </div>
  );
}