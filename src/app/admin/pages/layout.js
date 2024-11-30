import Header from "../components/header";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";

export default function AdminLayout({ children }) {
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
