import Header from "../components/header";
import Footer from "../components/Footer";

export default function AdminLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
