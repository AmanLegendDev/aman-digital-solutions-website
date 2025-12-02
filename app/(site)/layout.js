import "../globals.css";
import Navbar from "@/components/navbaar";
import Footer from "@/components/footer";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Aman Digital Solutions",
  description:
    "QR Menu System for Hotels & Restaurants | Modern Digital Menu for Cafes & Hotels in Himachal",
};

export default function SiteLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-black`}>
        <Navbar />
        <main className="pt-6 pb-20 min-h-screen fade-in">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
