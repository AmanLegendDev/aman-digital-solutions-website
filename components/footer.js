"use client";
import Link from "next/link";

export default function Footer(){
  return (
    <footer className="bg-black border-t border-neutral-800 text-neutral-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-yellow-300 font-bold">Aman Digital Solutions</h3>
          <p className="mt-2 text-sm">Premium QR menus — Shimla, Himachal</p>
        </div>
        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <ul className="mt-3 space-y-2">
            <li><Link href="/features">Features</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/demo">Demo</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Contact</h4>
          <p className="mt-2 text-sm">Shimla, Himachal Pradesh</p>
          <p className="mt-1 text-sm">amanansaricodes@gmail.com</p>
        </div>
      </div>
      <div className="text-center text-neutral-500 py-4">© {new Date().getFullYear()} Aman Digital Solutions</div>
    </footer>
  );
}
