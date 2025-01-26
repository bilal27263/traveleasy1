// pages/dashboard.js
import { getSession } from "next-auth/react";
import DashboardComponent from "../dashboard/app/dashboard/page"; // Adjust the import path as needed

export default function Dashboard({ session }) {
  if (!session) {
    return <p>You need to be authenticated to view this page.</p>;
  }

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      <DashboardComponent /> {/* Render the main dashboard component */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}