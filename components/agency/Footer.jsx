"use client";

import Image from "next/image";

import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* COMPANY */}

          <div>

            <div className="flex items-center gap-3">

              <Image
                src="/logo.png"
                alt="Aman Digital Solutions"
                width={60}
                height={60}
                className="object-contain"
              />

              <div>
                <h3 className="text-white font-bold text-lg">
                  Aman Digital Solutions
                </h3>

                <p className="text-xs text-neutral-500">
                  Websites & Digital Solutions
                </p>
              </div>

            </div>

            <p className="text-neutral-400 mt-5 leading-relaxed">
              Helping local businesses build a stronger online presence through
              modern websites, QR ordering systems and digital solutions.
            </p>

          </div>

          {/* QUICK LINKS */}

          <div>

            <h4 className="text-white font-semibold mb-5">
              Quick Links
            </h4>

            <div className="flex flex-col gap-3">

              <a
                href="#services"
                className="text-neutral-400 hover:text-yellow-400 transition"
              >
                Services
              </a>

              <a
                href="#portfolio"
                className="text-neutral-400 hover:text-yellow-400 transition"
              >
                Portfolio
              </a>

              <a
                href="#about"
                className="text-neutral-400 hover:text-yellow-400 transition"
              >
                About
              </a>

              <a
                href="#contact"
                className="text-neutral-400 hover:text-yellow-400 transition"
              >
                Contact
              </a>

            </div>

          </div>

          {/* SERVICES */}

          <div>

            <h4 className="text-white font-semibold mb-5">
              Services
            </h4>

            <div className="flex flex-col gap-3">

              <span className="text-neutral-400">
                Business Websites
              </span>

              <span className="text-neutral-400">
                QR Ordering Systems
              </span>

              <span className="text-neutral-400">
                Digital Visiting Cards
              </span>

              <span className="text-neutral-400">
                Admin Dashboards
              </span>

              <span className="text-neutral-400">
                Custom Solutions
              </span>

            </div>

          </div>

          {/* CONTACT */}

          <div>

            <h4 className="text-white font-semibold mb-5">
              Contact
            </h4>

            <div className="space-y-4">

              <div className="flex items-center gap-3 text-neutral-400">
                <Phone size={18} />
                <span>8219174058</span>
              </div>

              <div className="flex items-center gap-3 text-neutral-400">
                <Mail size={18} />
                <span>amanansaricodes@gmail.com</span>
              </div>

              <div className="flex items-center gap-3 text-neutral-400">
                <MapPin size={18} />
                <span>Dhalli, Shimla</span>
              </div>

            </div>

            {/* SOCIALS */}

            <div className="flex gap-3 mt-6">

              <a
                href="https://www.linkedin.com/in/amancodes60"
                target="_blank"
                className="w-11 h-11 rounded-xl bg-[#111111] border border-white/10 flex items-center justify-center hover:border-yellow-400 transition"
              >
                <FaLinkedinIn size={18} />
              </a>

              <a
                href="https://www.instagram.com/amandigital.solutions"
                target="_blank"
                className="w-11 h-11 rounded-xl bg-[#111111] border border-white/10 flex items-center justify-center hover:border-yellow-400 transition"
              >
               <FaInstagram size={18} />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61580738434584"
                target="_blank"
                className="w-11 h-11 rounded-xl bg-[#111111] border border-white/10 flex items-center justify-center hover:border-yellow-400 transition"
              >
                <FaFacebookF size={18} />
              </a>

            </div>

          </div>

        </div>

        {/* BOTTOM BAR */}

        <div className="mt-12 pt-8 border-t border-white/10">

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

            <div className="text-neutral-500 text-sm text-center md:text-left">
              © 2025 Aman Digital Solutions. All Rights Reserved.
            </div>

            <div className="text-neutral-500 text-sm text-center">
              UDYAM-HP-09-0033862
            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}