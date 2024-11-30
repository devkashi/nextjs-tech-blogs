"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import the router hook
import { setNavigator } from "../utils/navigate";
import Header from "../components/header";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";

export default function AdminLayout({ children }) {
  const router = useRouter(); // Initialize the router hook
  // Check for token in localStorage on component load
  setNavigator(router);

  useEffect(() => {
    const token = localStorage.getItem("user_token"); // Replace "authToken" with your token key
    if (!token) {
      router.push("/admin/auth"); // Redirect to dashboard
    }
  }, [router]);
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        {children}
      </div>
      <Footer />
    </>
  );
}
