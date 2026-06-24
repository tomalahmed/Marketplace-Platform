import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function SiteLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col pt-20">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
