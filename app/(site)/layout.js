"use client"
// app/layout.js
import "../globals.css";
import Navbar from "@/components/navbaar";
import Footer from "@/components/footer";
import { Inter, Poppins } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";

const inter = Inter({ subsets:["latin"], weight:["300","400","600","700","800"] });
const poppins = Poppins({ subsets:["latin"], weight:["400","600","700"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={`${inter.className} bg-[var(--bg)] text-[var(--white)]`}>
        <Navbar />
        <main className="pt-20 min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key="page"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4 }}
              className="min-h-[80vh]"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </body>
    </html>
  );
}
