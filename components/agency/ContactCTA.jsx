"use client";

import { motion } from "framer-motion";
import {
MessageCircle,
Phone,
Mail,
ArrowRight,
} from "lucide-react";

export default function CTASection() {
return ( <section className="py-12 md:py-16 bg-[#0A0A0A]"> <div className="max-w-7xl mx-auto px-6">


    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#111111]"
    >

      {/* Glow */}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-yellow-500/10 blur-[180px]" />

      <div className="relative z-10 p-8 md:p-16">

        {/* Reviews Badge */}

        <div className="inline-flex px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 text-yellow-400 text-sm mb-6">
          Client Reviews Coming Soon
        </div>

        {/* Heading */}

        <h2 className="text-4xl md:text-6xl font-bold text-white max-w-4xl leading-tight">
          Ready To Take Your
          <span className="block text-yellow-400">
            Business Online?
          </span>
        </h2>

        <p className="text-neutral-400 text-lg max-w-2xl mt-6 leading-relaxed">
          Whether you need a professional website,
          QR ordering system or a custom digital solution,
          let's discuss your project and build something
          that helps your business grow.
        </p>

        {/* Action Cards */}

        <div className="grid md:grid-cols-3 gap-5 mt-12">

          {/* WhatsApp */}

          <a
            href="https://wa.me/918219174058"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-3xl border border-white/10 bg-black/30 p-7 hover:border-yellow-500/30 transition-all"
          >
            <MessageCircle
              size={32}
              className="text-yellow-400"
            />

            <h3 className="text-xl font-semibold text-white mt-5">
              WhatsApp Consultation
            </h3>

            <p className="text-neutral-400 mt-3">
              Discuss your project directly on WhatsApp.
            </p>

            <div className="flex items-center gap-2 mt-6 text-yellow-400">
              Chat Now
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </div>
          </a>

          {/* Call */}

          <a
            href="tel:+918219174058"
            className="group rounded-3xl border border-white/10 bg-black/30 p-7 hover:border-yellow-500/30 transition-all"
          >
            <Phone
              size={32}
              className="text-yellow-400"
            />

            <h3 className="text-xl font-semibold text-white mt-5">
              Call Now
            </h3>

            <p className="text-neutral-400 mt-3">
              Speak directly about your business requirements.
            </p>

            <div className="flex items-center gap-2 mt-6 text-yellow-400">
              Call Now
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </div>
          </a>

          {/* Email */}

          <a
            href="mailto:amanansaricodes@gmail.com"
            className="group rounded-3xl border border-white/10 bg-black/30 p-7 hover:border-yellow-500/30 transition-all"
          >
            <Mail
              size={32}
              className="text-yellow-400"
            />

            <h3 className="text-xl font-semibold text-white mt-5">
              Email Inquiry
            </h3>

            <p className="text-neutral-400 mt-3">
              Send your project details and get a response.
            </p>

            <div className="flex items-center gap-2 mt-6 text-yellow-400">
              Send Email
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </div>
          </a>

        </div>

      </div>

    </motion.div>

  </div>
</section>


);
}
